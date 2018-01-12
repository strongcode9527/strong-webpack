require('babel-register')

var path = require('path'),
    fs = require('fs'),
    config = require('../webpack/index.js'),
    esprima = require('esprima')


fs.readFile(config.entry, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(esprima.tokenize(data));
});

console.log(config)