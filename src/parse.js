var fs = require('fs'),
    esprima = require('esprima'),
    inspect = require('util').inspect,
    R = require('ramda'),
    path = require('path')

function parse(absolute, tree) {
  var content = fs.readFileSync(absolute, 'utf8'),
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