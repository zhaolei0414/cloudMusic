import { get, post } from './index.js'

// 说明 : 调用此接口 ,传入手机号码, 可发送验证码
export const getCaptcha = (phone) => get('/captcha/sent', phone)