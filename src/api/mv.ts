import { get } from './index'

// 说明 : 调用此接口 , 可获取推荐 mv
export const getPersonalizedMV = () => get('/personalized/mv')

// 说明 : 调用此接口 , 可获取推荐电台
export const getProgramRecommend = () => get('/program/recommend')

// 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口

export const getMVDetail = (id: number | string) => get('/mv/detail', { mvid: id })

/* 
说明 : 调用此接口 , 可获取全部 mv

可选参数 :
area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部

order: 排序,可选值为上升最快,最热,最新,不填则为上升最快

limit: 取出数量 , 默认为 30

offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
*/

export const getMVAll = (options: object) => get('/mv/all', options)

/**
 * 说明 : 调用此接口 , 可获取最新 mv
 */
export const getMVFirst = (options: object) => get('/mv/first', options)

/**
 * 说明 : 调用此接口 , 可获取网易出品 mv
 */
export const getMVExclusive = (options: object) => get('/mv/exclusive/rcmd', options)

/* 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址 */
export const getMVUrl = (id: number) => get('/mv/url', { id })

/**
 * 说明 : 调用此接口 , 传入 mvid 可获取相似 mv说明 : 调用此接口 , 传入 mvid 可获取相似 mv
 */
export const getSimiMV = (id: number) => get('/simi/mv', { mvid: id })
/**
 * 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 点赞转发评论数数据
 */
export const getMVDetailInfo = (id: number) => get('/mv/detail/info', { mvid: id })
