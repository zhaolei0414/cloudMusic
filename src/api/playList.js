/**   
 * api接口统一管理
 */

import { get } from './index.js'

// 获取歌单详情
// 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
// 必选参数 : id : 歌单 id
// 可选参数 : s : 歌单最近的 s 个收藏者,默认为8
// 调用例子 : /playlist/detail?id=24381616
export const apiPlayListDetail = (p) => get('/playlist/detail', p)
// 获取歌词
// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
// 必选参数 : id: 音乐 id
export const apigetPlayLyric = (id) => get('/lyric', id)