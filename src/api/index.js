import axios from 'axios'

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  // axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.baseURL = 'http://39.104.13.146:3000/';
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://39.104.13.146:3000/';
}

// 请求超时时间
axios.defaults.timeout = 10000;
// 请求拦截
axios.interceptors.request.use(config => {
  // 在发送请求前要做的事儿
  // const cookie = localStorage.getItem('cookie')
  // console.log(config);
  return config
}, err => {
  // 在请求错误时要做的事儿
  return Promise.reject(err)
})


// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
  const cookieStr = localStorage.getItem('cookie')
  const obj1 = {}
  if (cookieStr) {
    obj1.cookie = cookieStr
  }
  const obj = Object.assign(obj1, params)
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: obj
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err)
      })
  });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    const cookieStr = localStorage.getItem('cookie')
    const obj1 = {}
    if (cookieStr) {
      obj1.cookie = cookieStr
    }
    const obj = Object.assign(obj1, params)
    axios.post(url, obj)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  });
}