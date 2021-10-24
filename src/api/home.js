/**   
 * api接口统一管理
 */

import { get } from './index.js'

// 首页轮播图
export const apiBanner = (p) => get('/banner', p)

// 说明 : 调用此接口 , 可获取APP首页圆形图标入口列表
export const apiDragonBall = () => get('/homepage/dragon/ball')
// 说明 : 调用此接口 , 可获取推荐歌单
// 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
export const apiPersonalized = (p) => get('/personalized', p)
