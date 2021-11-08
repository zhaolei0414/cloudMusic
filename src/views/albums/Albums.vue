<template>
  <div class="root">
    <!-- 专辑页面 -->
    <Loading v-show="isLoading" vertical class="loading" />
    <div v-show="!isLoading" class="listView">
      <div class="listViewTop">
        <!-- 背景图片 -->
        <img :src="data.album.blurPicUrl" alt="" />
        <nav class="listViewTopNav">
          <div class="left">
            <div @click="$router.go(-1)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuojiantou"></use>
              </svg>
            </div>
            <div class="title">专辑</div>
          </div>
          <div class="right">
            <svg
              class="icon"
              aria-hidden="true"
              @click="$router.push('/search')"
            >
              <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-danlieliebiao"></use>
            </svg>
          </div>
        </nav>
        <div class="context">
          <div class="contextLeft">
            <img :src="data.album.picUrl" alt="" />
          </div>
          <div class="contextRight">
            <h3>{{ data.album.name }}</h3>
            <div class="author">
              <span>歌手: {{ data.album.artist.name }}</span>
            </div>
            <div class="description">
              <span>发行时间: {{ getLocalTime(+data.album.publishTime) }}</span>
            </div>
          </div>
        </div>
        <div class="iconList">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xinxi"></use>
            </svg>
            <span>{{ data.album.info.commentCount }}</span>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang1"></use>
            </svg>
            <span>{{ data.album.info.shareCount }}</span>
          </div>

          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>{{ data.album.info.resourceType }}</span>
          </div>
        </div>
      </div>
      <div class="playlist">
        <div class="playlist-top">
          <div class="left" @click="playAll">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            <span>播放全部(共{{ data.songs.length }}首)</span>
          </div>
          <div class="right">
            <van-button type="danger" class="vbtn"
              >喜欢({{ data.album.info.likedCount }})</van-button
            >
          </div>
        </div>
        <div class="list">
          <ul>
            <li @click="play(i)" v-for="(item, i) in data.songs" :key="item.id">
              <div class="left">
                <div class="index">{{ i + 1 }}</div>
                <div class="context">
                  <span class="title">{{ item.name }}</span>
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
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getAlbum } from "@/api/album.js";
import { getLocalTime } from "@/utils/getLocalTime.js";
import { NavBar, Button as VanButton, Loading } from "vant";
import { ref, reactive, nextTick } from "vue";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const id = route.query.id;
const isLoading = ref(true);
const data = reactive({
  album: {
    name: "",
    blurPicUrl: "",
    picUrl: "",
    publishTime: "",
    artist: {
      name: ""
    },
    info: {
      commentCount: "",
      shareCount: "",
      resourceType: ""
    }
  },
  songs: []
});
getAlbum(id).then(res => {
  (data.album = res.album), (data.songs = res.songs);
  nextTick(() => {
    isLoading.value = false;
  });
});
const play = i => {
  store.commit("setPlaylist", data.songs);
  if (i != store.state.playCurrentIndex) {
    store.commit("setPaused", true);
  }
  store.commit("setPlayCurrentIndex", i);
};
const playAll = () => {
  play(0);
  const playControlor = document.getElementById("playControl_doPlay");

  nextTick(() => {
    playControlor.play();
  });
  store.commit("setPaused", false);
};
</script>



<style scoped lang='less'>
.listViewTop {
  width: 100vw;
  padding: 0 0.4rem;
  margin-top: 15px;
  > img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: auto;
    filter: blur(40px);
  }
  .listViewTopNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.8rem;
    font-size: 16px;
    color: #fff;
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      fill: #fff;
    }
    .left,
    .right {
      display: flex;
      .icon:first-child {
        margin-right: 20px;
      }
    }
  }
}
.context {
  margin-top: 50px;
  display: flex;
  .contextLeft {
    position: relative;
    img {
      width: 150px;
      height: 150px;
      border-radius: 15px;
    }
    span {
      position: absolute;
      top: 0;
      right: 10px;
    }
  }
  .contextRight {
    margin-left: 15px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    .author {
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .description {
      display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示*/
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 2; /*限制在一个块元素显示的文本的行数*/
      -webkit-box-orient: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/
      // color: var(--van-gray-8);
      font-size: 12px;
      margin-top: 15px;
    }
  }
}
.iconList {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #eee;
    font-size: 14px;
    span {
      margin-top: 5px;
    }
  }
  .icon {
    fill: #fff;
  }
}
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
      justify-content: space-around;
      width: 60vw;
      height: 50px;
      .index {
        width: 30px;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
      .context {
        width: 50vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0;
        .title {
          width: 50vw;
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