import { get } from './index'

/* 
说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述

必选参数 : id: 歌手 id
*/

export const getArtistDesc = (id: string | number) => get('/artist/desc', { id: id })


/* 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情

必选参数 : id: 歌手 id */
export const getArtistDetail = (id: string | number) => get('/artist/detail', { id: id })

/* 说明 : 调用此接口,可获取歌手热门50首歌曲 */
export const getArtistTopSong = (id: string | number) => get('/artist/top/song', { id: id })

/*
  说明 : 调用此接口,可获取歌手全部歌曲 必选参数 :
  id : 歌手 id
可选参数 :
  order : hot ,time 按照热门或者时间排序
  limit: 取出歌单数量 , 默认为 50
  offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
*/
/**
 * @param {Object} options [id:歌手id(必选),order:[hot,time],limit:50,offset:50]
 *  */

export const getArtistSongs = (options: object) => get('/artist/songs', options)