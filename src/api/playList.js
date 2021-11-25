/**   
 * api接口统一管理
 */

import { get, post } from './index.js'

// 获取歌单详情
// 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
// 必选参数 : id : 歌单 id
// 可选参数 : s : 歌单最近的 s 个收藏者,默认为8
// 调用例子 : /playlist/detail?id=24381616
export const apiPlayListDetail = (p) => get('/playlist/detail', p)
export const apiPlayListDetailAll = (p) => get('song/detail', p)

// 获取歌词
// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
// 必选参数 : id: 音乐 id
export const apigetPlayLyric = (id) => get('/lyric', id)

/* 
  新版评论接口
说明 : 调用此接口 , 传入资源类型和资源id,以及排序方式,可获取对应资源的评论

必选参数 :
id : 资源 id, 如歌曲 id,mv id

type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型

0: 歌曲

1: mv

2: 歌单

3: 专辑

4: 电台

5: 视频

6: 动态
可选参数 :
pageNo:分页参数,第N页,默认为1

pageSize:分页参数,每页多少条数据,默认20

sortType: 排序方式,99:按推荐排序,2:按热度排序,3:按时间排序

cursor: 当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
*/
export const getCommentNew = (obj) => get('/comment/new', obj)

/* 
说明 : 调用此接口 , 传入 type, 资源 id, 和评论 id cid 和 是否点赞参数 t 即可给对 应评论点赞 ( 需要登录 )
*/
export const postCommentLike = (obj) => post('/comment/like', obj)

// 说明 : 调用此接口,可发送评论或者删除评论
export const postComment = (obj) => post('/comment', obj)
/**
 * 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
 * 必选参数 : id: 歌曲 id
 *可选参数 : like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
 */
export const getLiked = (options) => get('/like', options)

/**
 * 说明 : 调用此接口 , 传入类型和歌单 id 可收藏歌单或者取消收藏歌单
必选参数 :
t : 类型,1:收藏,2:取消收藏 id : 歌单 id
 */
export const postSubscribe = (options) => post('/playlist/subscribe', options)