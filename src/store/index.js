import { createStore } from 'vuex'
import { apigetPlayLyric } from '@/api/playList.js'
import { getLoginStatus, getLogout } from "@/api/login.js";
export default createStore({
  state: {
    // 歌单
    playlist: [
      {
        name: '失眠飞行',
        id: 1365898499,
        al: {
          id: 79191452,
          name: "失眠飞行",
          pic: 109951164083996260,
          picUrl: "http://p4.music.126.net/Bq6Io8lpY1l2HsQ28QKFlw==/109951164083996255.jpg"
        }
      }
    ],
    // 当前播放的索引
    playCurrentIndex: 0,
    // 歌词
    lyric: '',
    // 当前播放时间(毫秒)
    currentTime: 0,
    // 当前播放的时间(百分比)
    currentTimePrecent: 0,
    // 总播放时长
    duration: 0,
    // 是否播放
    paused: true,
    // 用户信息表
    userInfo: {
      phone: ''
    },
    // 是否是登录状态？
    isLogin: false,

  },
  getters: {
    // 歌词 数组形式
    lyricList(state) {
      // console.log(state.lyric);
      const arr = state.lyric.split(/\n/igs).map((item, i) => {
        let min = item.slice(1, 3)
        let sec = item.slice(4, 6)
        let mill = item.slice(7, 10)
        return {
          min,
          sec,
          mill,
          lyric: item.split(']')[1],
          content: item,
          time: parseInt(mill) + parseInt(sec) * 1000 + parseInt(min) * 60 * 1000
        }
      })
      arr.forEach((item, i) => {
        if (i < arr.length - 1) {
          item.pre = arr[i + 1].time
        } else {
          item.pre = item.time
        }
      })
      return arr
    }
  },
  mutations: {
    /* 
      控制播放器相关
    */
    setPlaylist(state, value) {
      state.playlist = value
    },
    setPlayCurrentIndex(state, value) {
      if (value < 0) return
      const length = state.playlist.length
      if (value > length) return
      state.playCurrentIndex = value
    },
    setLyric(state, value) {
      state.lyric = value
    },
    setCurrentTime(state, value) {
      state.currentTime = parseInt(value * 1000)
    },
    setcurrentTimePrecent(state, value) {
      state.currentTimePrecent = value
    },
    setDuration(state, value) {
      state.duration = value
    },
    setPaused(state, value) {
      state.paused = value
    },
    /* 
    控制用户信息相关
    */
    setUserPhone(state, value) {
      state.userInfo.phone = value
    },
    setUserInfo(state, value) {
      // value 是一个对象
      // 如果传一个空对象，清空数据
      if (Object.keys(value).length === 0) {
        // 清空
        for (let i in state.userInfo) {
          if (i !== 'phone') {
            delete state.userInfo[i]
          }
        }
      } else {
        Object.assign(state.userInfo, value)
      }

    },

    setLogin(state, value) {
      if (typeof value !== 'boolean') {
        return new Error('请传入布尔值')
      }
      state.isLogin = value
    }
  },
  actions: {
    async reqLyric(content, payload) {
      let result = await apigetPlayLyric({ id: payload })
      // console.log(result);
      content.commit('setLyric', result.lrc.lyric)
      // console.log(result.lrc.lyric);
    },
    // 检查是否登录，如果是登录状态，获取用户信息，保存
    async checkLogin(content, payload) {
      try {
        let result = await getLoginStatus()
        console.log(result.data);
        if (result.data.code === 200 && result.data.profile !== null) {
          // 登录状态
          content.commit('setLogin', true)
          // 将用户信息保存
          content.commit('setUserInfo', result.data.profile)
        }
      } catch (error) {
        console.log(error, '需要登录code 301');
      }
    },
    async logout(content, payload) {
      const res = await getLogout()
      if (res.code === 200) {
        // 退出登录,清除用户信息
        content.commit('setLogin', false)
        content.commit('setUserInfo', {})
        localStorage.removeItem('userInfo')
        localStorage.removeItem('cookie')
        localStorage.removeItem('token')
        // 刷新页面
        location.reload()
      }
    }
  },
  modules: {
  }
})
