export const changeValue = (value: any) => {
  if (typeof value === 'string') {
    value = +value
  }
  if (value >= 100000000) {
    value = Math.floor(value / 100000000) + '亿'
    return value
  }
  if (value >= 10000) {
    value = Math.floor(value / 10000) + '万'
    return value
  }
  return value
}