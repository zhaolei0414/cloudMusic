// import axios from 'axios'
// const instance = axios.create();
export default {
  getMonthDay(dateTime: string | number | Date) {
    const date = new Date(dateTime)
    let mm = date.getMonth() + 1
    let dd = date.getDate()
    let res = mm + '月' + dd + '日'
    return res
  },
  debounce(fn: { apply: (arg0: { getMonthDay(dateTime: any): string; debounce(fn: any, wait: any): () => void }, arg1: IArguments) => void }, wait: number | undefined) {
    let timer: number | null | undefined = null
    return () => {
      if (timer) {
        clearTimeout(timer)
        timer = null;
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait);
    }
  },
  /**
   * 
   * @param {string} downUrl 
   * @param {string} fileName 
   */
  // downLoad(downUrl, fileName) {
  //   // instance({
  //   //   method: 'get',
  //   //   url: downUrl,
  //   //   responseType: 'blob',
  //   //   headers: { 'content-type': 'audio/mpeg' }
  //   //   // headers: { 'content-length': '4066786', 'content-type': 'audio/mpeg' }
  //   // }).then((res) => {
  //   //   console.log(res);
  //   //   // eslint-disable-next-line no-unused-vars
  //   //   let blobType = 'application/force-download' // 设置blob请求头
  //   //   // eslint-disable-next-line no-unused-vars
  //   //   let blob = new Blob([res.data], { type: res.data.type }) // 创建blob 设置blob文件类型 data 设置为后端返回的文件(例如mp3,jpeg) type:这里设置后端返回的类型 为 mp3
  //   //   let downa = document.createElement('a') // 创建A标签
  //   //   // eslint-disable-next-line no-unused-vars
  //   //   let href = window.URL.createObjectURL(blob) // 创建下载的链接
  //   //   downa.href = href // 下载地址
  //   //   downa.download = fileName // 下载文件名
  //   //   document.body.appendChild(downa)
  //   //   downa.click() // 模拟点击A标签
  //   //   document.body.removeChild(downa) // 下载完成移除元素
  //   //   window.URL.revokeObjectURL(href) // 释放blob对象
  //   // }).catch(function (error) {
  //   //   console.log(error)
  //   // })
  // }
}