import fs from 'fs'

import parse from './parse'
import template from './template'
import composeFile from './composeFile'
import config from '../webpack/index.js'

const depTree = [],
      map = {}

parse(config.entry, depTree, map, 0)
  .then(res => composeFile(depTree, map))
  .then(string => {
    //
  })
  .catch(res => {
    console.log(res)
  })




