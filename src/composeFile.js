/**
 * 处理每一个trunk的source
 * @param {string} str
 */
function handleRequire(str, id) {
  const reg = /require\(.+\)/

  return str.replace(reg, `__webpack_require__(${id})`)
}

export default function composeFile(trees, map) {

  let functions = []

  trees.forEach(item => {
    let source = item.source,
        flag = false

    item.requires.forEach(require => {
      source = handleRequire(source, map[require])
      flag = true
    })

    functions.push(`function(module, exports${flag ? ', __webpack_require__' : ''}){${source}}`)

  })

  return '['+functions.join(',') + ']'
}