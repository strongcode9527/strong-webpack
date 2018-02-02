import fs from 'fs'
import util from 'util'

/**
 * 此函数用于将node中内置的回调函数处理异步转换变为promise处理异步。
 * @param {function} func 
 */
export function nodeFuncPromise (func) {
  if(typeof func !== 'function') {
    throw new Error('nodeFuncPromise params must be function')
  }
  return util.promisify(func)
}

