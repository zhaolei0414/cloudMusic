export const changeValue = (value) => {
  if (typeof value === 'string') {
    value = +value
  }
  if (value >= 10000) {
    value = Math.floor(value / 10000) + '万'
  }
  return value
}