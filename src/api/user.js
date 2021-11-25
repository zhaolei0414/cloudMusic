import { get } from './index.js'

// 说明 : 登录后调用此接口 , 可以获取用户信息
export const getUserSubcount = () => get('/user/subcount')

// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
export const getUserPlaylist = (options) => get('/user/playlist', options)