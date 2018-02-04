import fs from 'fs'
import parse from './parse'
import config from '../webpack/index.js'
import template from './template'

const depTree = []

parse(config.entry, depTree, 0)
.then(res => {
  // console.log('finish', depTree)
})
.catch(res => {
  console.log(res)
})


fs.writeFile(config.output, template('strong'))

