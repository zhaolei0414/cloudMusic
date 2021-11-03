<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="left" @click="playAll">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>播放全部(共{{ playlist.tracks.length }}首)</span>
      </div>
      <div class="right">
        <van-button type="danger" class="vbtn"
          >收藏({{ playlist.shareCount }})</van-button
        >
      </div>
    </div>
    <div class="list">
      <ul>
        <li
          @click="play(i)"
          v-for="(item, i) in playlist.tracks"
          :key="item.id"
        >
          <div class="left">
            <div class="index">{{ i + 1 }}</div>
            <div class="context">
              <span class="title">{{ item.name }}</span>
              <span class="author">{{ item.al.name }}</span>
            </div>
          </div>
          <div class="right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-24gl-playlistMusic"></use>
            </svg>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
// import { inject } from "vue";

export default {
  props: ["playlist"],
  components: {
    [Button.name]: Button,
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
  },
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
          font-size: 12px;
          color: gray;
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
.vbtn {
  height: 40px;
  width: 100px;
  border-radius: 20px;
  background-color: orange;
  border: hidden;
}
</style>