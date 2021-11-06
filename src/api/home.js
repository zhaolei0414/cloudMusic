/**   
 * api接口统一管理
 */

import { get } from './index.js'

// 说明: 调用此接口, 可获取APP首页信息
// 可选参数 : refresh: 是否刷新数据,默认为false
// cursor: 上一条数据返回的cursor
export const getAllHomeData = (p) => get('/homepage/block/page', p)
// 首页轮播图
export const apiBanner = (p) => get('/banner', p)

// 说明 : 调用此接口 , 可获取APP首页圆形图标入口列表
export const apiDragonBall = () => get('/homepage/dragon/ball')
// 说明 : 调用此接口 , 可获取推荐歌单
// 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
export const apiPersonalized = (p) => get('/personalized', p)

// 说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist
export const getTopList = () => get('/toplist')
// 说明 : 调用此接口 , 可获取排行榜中的歌手榜
export const getArtist = () => get('/toplist/artist')