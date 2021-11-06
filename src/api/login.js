import { get, post } from './index.js'

// 说明 : 调用此接口 ,传入手机号码, 可发送验证码
export const getCaptcha = (phone) => get('/captcha/sent', phone)

// 说明 : 调用此接口 ,可检测手机号码是否已注册
// 必选参数 :
// phone : 手机号码
export const getExistenceCheck = (phone) => get('/cellphone/existence/check', phone)

// 说明 : 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确
export const postcaptchaVerify = (object) => post('/captcha/verify', object)

// 1. 手机登录
// 必选参数 :
// phone: 手机号码
// password: 密码
// 可选参数 :
// countrycode: 国家码，用于国外手机号登录，例如美国传入：1
// md5_password: md5加密后的密码,传入后 password 参数将失效
// captcha: 验证码,使用 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 password 参数将失效

// 接口地址 : /login/cellphone

// 调用例子 : /login/cellphone?phone=xxx&password=yyy /login/cellphone?phone=xxx&md5_password=yyy /login/cellphone?phone=xxx&captcha=1234
export const postLoginInfo = (object) => post('/login/cellphone', object)

/* 
2. 邮箱登录
必选参数 :

email: 163 网易邮箱

password: 密码
*/
export const postLoginMail = (object) => post('/login', object)

/* 刷新登录
说明 : 调用此接口 , 可刷新登录状态

调用例子 : /login/refresh */
export const getLoginRefresh = () => get('/login/refresh')

/* 
登录状态
说明 : 调用此接口,可获取登录状态

接口地址 : /login/status
*/
export const getLoginStatus = () => get('/login/status')
