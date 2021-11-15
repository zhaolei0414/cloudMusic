export default {
  getMonthDay(dateTime) {
    const date = new Date(dateTime)
    let mm = date.getMonth() + 1
    let dd = date.getDate()
    let res = mm + '月' + dd + '日'
    return res
  },
  debounce(fn, wait) {
    let timer = null
    return () => {
      if (timer) {
        clearTimeout(timer)
        timer = null;
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait);
    }
  }
}