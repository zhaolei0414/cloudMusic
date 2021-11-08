import { get } from './index.js'

/* 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容

必选参数 : id: 专辑 id */

export const getAlbum = (id) => get('/album', { id: id })