
import fs from 'fs'
import R from 'ramda'
import path from 'path'
import {inspect} from 'util'
import {nodeFuncPromise} from '../utils'

//不支持es6引入
var esprima = require('esprima')

async function parse(absolute, tree) {
  var content = await nodeFuncPromise(fs.readFile)(absolute, 'utf8'),
      parseArray = esprima.parse(content).body

  // console.log(inspect(parseArray, { showHidden: true, depth: null }))

  for(var i = 0; i < parseArray.length; i++) {
    var item = parseArray[i],
        module = {
          requires: []
        }

    if(item.type === 'VariableDeclaration' && R.path(['declarations','0', 'init', 'type'],item) === 'CallExpression' && R.path(['declarations', '0', 'init', 'callee', 'name'], item) === 'require' && R.path(['declarations', '0', 'init', 'arguments', '0', 'value'])) {
      module.requires.push( path.resolve(absolute, R.path(['declarations', '0', 'init', 'arguments', '0', 'value'], item)))

      tree.push(module)
    }
  }
  console.log('in', inspect(tree,{showHidden: true, depth: null}))
}

module.exports = parse