<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="left">
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

export default {
  props: ["playlist"],
  components: {
    [Button.name]: Button,
  },
  methods: {
    play(i) {
      this.$store.commit("setPlayCurrentIndex", i);
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
      .index {
        width: 30px;
        text-align: center;
      }
      .context {
        display: flex;
        flex-direction: column;
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