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
/**说明 : 调用此接口 , 可获取排行榜中的歌手榜 */
export const getArtist = () => get('/toplist/artist')
/**  
*说明 : 调用此接口 , 可获取精品歌单
*可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
*limit: 取出歌单数量 , 默认为 20
*before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
*/
export const getTopPlaylist = (options) => get('/top/playlist/highquality', options)
/**
 * 说明 : 调用此接口 , 可获取推荐新音乐
 *可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)
 @params limit:number
 * */
export const getPersonalizedNewsong = (limit = 6) => get('/personalized/newsong', { limit: limit })