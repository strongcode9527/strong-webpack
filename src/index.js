import parse from './parse'
import config from '../webpack/index.js'

const depTree = []

parse(config.entry, depTree)

console.log(depTree)