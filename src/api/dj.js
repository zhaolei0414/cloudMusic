import { get } from './index.js'

/**
 * 说明 : 调用此接口,可获取电台 banner
 */
export const getBanner = () => get('/dj/banner')

/**
 * 说明 : 调用此接口,可获取电台个性推荐列表
 */
export const getPersonalizeRecommend = () => get('/dj/personalize/recommend')

/**
 * 说明 : 登录后调用此接口 , 传入`rid`, 可查看对应电台的电台节目以及对应的 id, 需要
注意的是这个接口返回的 mp3Url 已经无效 , 都为 null, 但是通过调用 `/song/url` 这
个接口 , 传入节目 id 仍然能获取到节目音频 , 如 `/song/url?id=478446370` 获取代
码时间的一个节目的音频

**必选参数 :** `rid`: 电台 的 id

**可选参数 :**

`limit` : 返回数量 , 默认为 30

`offset` : 偏移数量，用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0

`asc` : 排序方式,默认为 `false` (新 => 老 ) 设置 `true` 可改为 老 => 新
 */
export const getDJProgram = (options) => get(`/dj/program`, options)

/**
 * ### 电台 - 节目详情

说明 : 调用此接口传入电台节目 id,可获得电台节目详情

**必选参数 :** `id`: 电台节目 的 id

 */
export const getDJDetail = (id) => get(`/dj/program/detail`, { id: id })