export const getLocalTime = function (dateTime: any) {
  if (typeof dateTime !== 'number') {
    console.error('需要传入一个number');
  }
  const date = new Date(dateTime)
  let yyyy = date.getFullYear() + ''
  let mm = date.getMonth() + 1
  let dd = date.getDate()
  let res = yyyy + '-' + mm + '-' + dd
  return res
}