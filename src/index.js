import fs from 'fs'

import parse from './parse'
import template from './template'
import composeFile from './composeFile'
import config from '../webpack/index.js'
import {nodeFuncPromise} from '../utils'



const depTree = [],
      map = {},
      stat = nodeFuncPromise(fs.stat)

parse(config.entry, depTree, map, 0)
  .then(res => composeFile(depTree, map))
  .then(string => {
    fs.writeFile(config.output, template(string), 'utf8' ,function(error, data) {
      if(error) {
        console.log(error) 
      }
    }) 
  })
  .catch(res => {
    console.log(res)
  })




