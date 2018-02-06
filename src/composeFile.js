/**
 * 处理每一个trunk的source
 * @param {string} str
 */
function createFunction(str, id) {
  const reg = /require\(.+\)/
  return str.replace(reg, `__webpack_require__(id)`)
}

export default function composeFile(trees, map) {

  console.log(trees)
  console.log(createFunction(trees[0].source, trees[0].id))
  

}