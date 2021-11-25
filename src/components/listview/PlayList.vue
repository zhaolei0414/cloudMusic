<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="left" @click="playAll">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang" />
        </svg>
        <span>播放全部(共{{ playlist.tracks.length }}首)</span>
      </div>
      <div class="right">
        <van-button
          v-show="subscribed"
          @click="doCollection"
          type="success"
          round
        >已收藏({{ changeValue(playlist.subscribedCount) }})</van-button>
        <van-button
          v-show="!subscribed"
          @click="doCollection"
          type="warning"
          round
        >收藏({{ changeValue(playlist.subscribedCount) }})</van-button>
      </div>
    </div>
    <div class="list">
      <ul>
        <li @click="play(i)" v-for="(item, i) in playlist.tracks" :key="item.id">
          <div class="left">
            <div class="index">{{ i + 1 }}</div>
            <div class="context">
              <span class="title van-ellipsis">{{ item.name }}</span>
              <span class="author van-multi-ellipsis--l2">{{ item.al.name }}</span>
            </div>
          </div>
          <div class="right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang" />
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-24gl-playlistMusic" />
            </svg>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Button, Toast } from "vant";
// import { inject } from "vue";
import { postSubscribe } from '@/api/playList.js'
import { changeValue } from '@/utils/changeValue.js'
export default {
  props: ["playlist"],
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      // t类型 t : 类型,1:收藏,2:取消收藏 
      t: 1,
      // 是否收藏
      subscribed: false
    }
  },
  watch: {
    // 是否已收藏
    playlist(newValue, oldValue) {
      this.subscribed = newValue.subscribed
    }
  },
  methods: {
    play(i) {
      // console.log(i, this.$store.state.playCurrentIndex);
      // 将歌单交给vuex
      this.$store.commit("setPlaylist", this.playlist.tracks);
      // 如果点击了当前播放的歌曲 不要暂停
      if (i != this.$store.state.playCurrentIndex) {
        this.$store.commit("setPaused", true);
      }
      this.$store.commit("setPlayCurrentIndex", i);
    },
    playAll() {
      // 跳到第一首歌
      this.play(0);
      // 获取audio标签
      const playControlor = document.getElementById("playControl_doPlay");

      // 调用play方法
      this.$nextTick(() => {
        playControlor.play();
      });
      // 通知vuex修改播放/暂停图标
      this.$store.commit("setPaused", false);
    },
    doCollection() {
      if (this.$store.state.isLogin) {
        // 已登录
        // 发起收藏歌单请求
        const id = this.$route.query.id
        if (this.subscribed) {
          // 已收藏,点击取消收藏
          postSubscribe({ t: 2, id: id, timestamp: new Date().getTime() }).then(res => {
            if (res.data.code === 200) {
              Toast.success('已取消收藏')
              this.subscribed = false
            }
          })
        } else {
          // 未收藏  点击收藏歌单
          postSubscribe({ t: 1, id: id, timestamp: new Date().getTime() }).then(res => {
            if (res.data.code === 200) {
              Toast.success('收藏成功')
              this.subscribed = true
            }
          })
        }
      } else {
        // 提示需要先登录
        Toast.fail('请先登录')
      }
    },
    changeValue(count) {
      // console.log(count);
      return changeValue(count)
    }
  }
};
</script>

<style lang="less" scoped>
.playlist-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #fff;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  margin-top: 15px;
  .left {
    display: flex;
    align-items: center;
    span {
      height: 50px;
      line-height: 50px;
    }
    .icon {
      margin: 0 10px;
    }
  }
}
.list {
  li {
    height: 50px;
    width: 100vw;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      width: 60vw;
      .index {
        width: 30px;
        text-align: center;
      }
      .context {
        width: 50vw;
        display: flex;
        flex-direction: column;
        .title {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .author {
          height: 32px;
          font-size: 12px;
          color: gray;
          overflow: hidden;
        }
      }
    }
    .right {
      margin-right: 15px;
      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>