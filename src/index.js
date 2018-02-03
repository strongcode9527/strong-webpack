import parse from './parse'
import config from '../webpack/index.js'

const depTree = []

parse(config.entry, depTree, 0)
.then(res => {
  console.log('finish', depTree)
})
.catch(res => {
  console.log(res)
})
