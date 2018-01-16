require('babel-register')

var path = require('path'),
    fs = require('fs'),
    config = require('../webpack/index.js'),
    esprima = require('esprima'),
    inspect = require('util').inspect

fs.readFile(config.entry, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(inspect(esprima.parse(data).body[0], { showHidden: true, depth: null }));
});

// : 定义变量
// type: VariableDeclarator
// => init
// type: CallExpression: 函数调用
//