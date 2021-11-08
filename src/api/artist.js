import { get } from './index.js'

/* 
说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述

必选参数 : id: 歌手 id
*/
export const getArtistDesc = (id) => get('/artist/desc', { id: id })


/* 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情

必选参数 : id: 歌手 id */
export const getArtistDetail = (id) => get('/artist/detail', { id: id })
