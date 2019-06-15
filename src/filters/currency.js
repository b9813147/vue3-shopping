export default function (num) {
  const n = Number(num)
  return `$${n.toFixed(2).replace(/./g, (c, i, a) => {
    return (i > 0 && c !== '.' && (a.length - i) % 3 === 0)
      ? ',' + c
      : c
  })}`
}
// } {
//
// })
// console.log(n.toFixed(2).replace(/./g, (c, i, a) => {
//   console.log(c, i, a)
// }))