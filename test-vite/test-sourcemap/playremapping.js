// const rawMap: EncodedSourceMap = {
//   file: 'transpiled.min.js',
//   // 0th column of 1st line of output file translates into the 1st source
//   // file, line 2, column 1, using 1st name.
//   mappings: 'AACCA',
//   names: ['add'],
//   sources: ['transpiled.js'],
//   sourcesContent: ['1+1'],
//   version: 3,
// };

// 用node.js执行测试
// @ts-ignore
import MagicString from 'magic-string'
import remapping from '@ampproject/remapping'

const code = `var name = zhangsan`
let s = new MagicString(code)
s.update(11, 17, 'wsq')

const maps = []

maps.push(s.generateMap({ hires: true, source: 'hello.js' }))

console.log(111, maps)
console.log(
  222,
  remapping(maps, () => null),
)
