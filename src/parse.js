
import fs from 'fs'
import R from 'ramda'
import path from 'path'
import {inspect} from 'util'
import {nodeFuncPromise} from '../utils'

//不支持es6引入
var esprima = require('esprima')

var modules = {

}

async function parse(absolute, tree, id) {
  const content = await nodeFuncPromise(fs.readFile)(absolute, 'utf8'),
        parseArray = esprima.parse(content).body,
        module = {
          id,
          name: absolute,
          requires: [],
          source: content,
        }
  tree.push(module)
  // console.log(inspect(parseArray, { showHidden: true, depth: null }))
  
  for(var i = 0; i < parseArray.length; ++i) { 
    var item = parseArray[i]
    
    if(item.type === 'VariableDeclaration' && R.path(['declarations','0', 'init', 'type'],item) === 'CallExpression' && R.path(['declarations', '0', 'init', 'callee', 'name'], item) === 'require' && R.path(['declarations', '0', 'init', 'arguments', '0', 'value'])) {
      const trunkPath = path.resolve(absolute, '../',R.path(['declarations', '0', 'init', 'arguments', '0', 'value'], item))
      if(modules[trunkPath]) {
        return 
      }
      modules[trunkPath] = true
      module.requires.push(trunkPath)
      await parse(trunkPath, tree, ++id)
    }
  }
  // 同时异步读取文件

  return 
}

module.exports = parse