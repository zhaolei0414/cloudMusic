export default {
  getMonthDay(dateTime) {
    const date = new Date(dateTime)
    let mm = date.getMonth() + 1
    let dd = date.getDate()
    let res = mm + '月' + dd + '日'
    return res
  }

}