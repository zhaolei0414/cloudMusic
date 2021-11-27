<template>
  <div class="artist">
    <!-- 顶部背景图 -->
    <van-image
      class="image"
      width="100vw"
      height="30vh"
      fit="cover"
      :src="artist.detail.artist.cover"
    ></van-image>
    <NavBar :border="false" fixed :style="{ backgroundColor: 'rgba(255,255,255,0)' }">
      <template #left>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou" />
        </svg>
      </template>
      <template #right>
        <Icon name="ellipsis" color="#fff" />
      </template>
    </NavBar>

    <!-- 卡片视图 -->
    <div class="card">
      <h3>{{ artist.detail.artist.name }}</h3>
      <div>歌曲数量: {{ artist.detail.artist.musicSize }}</div>
      <div>{{ imageDesc }}</div>
      <Button type="danger" round class="starBtn">关注</Button>
    </div>

    <Tabs
      v-model:active="active"
      @click-tab="onClickTab"
      swipeable
      background="rgba(255,255,255,0)"
    >
      <Tab title="主页">
        <Card class="mainCard">
          <h4>艺人百科</h4>
          <div>艺人名: {{ artist.detail.artist.name }}</div>
          <main>简介: {{ artist.detail.artist.briefDesc }}</main>
          <div v-if="artist.detail.identify" class="bottom van-hairline--top">
            <a :href="artist.detail.identify.actionUrl">点击查看更多</a>
          </div>
        </Card>
      </Tab>
      <Tab title="歌曲" class="songList">
        <div class="top">
          <div class="left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang1-copy-copy" />
            </svg>
            <h3>播放热门50</h3>
          </div>
          <div class="right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tianjia" />
            </svg>
          </div>
        </div>
        <!-- 播放列表 -->
        <main>
          <List v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <li
              v-for="(item, i) in topSongData.songs"
              :key="item.id"
              class="topSongList"
              @click="play(i)"
            >
              <div class="left">
                <div class="index">{{ i + 1 }}</div>
                <div class="title">
                  <div>{{ item.name }}</div>
                  <div>{{ item.al.name }}</div>
                </div>
              </div>
              <div class="right">
                <Icon name="ellipsis" />
              </div>
            </li>
          </List>
        </main>
      </Tab>
    </Tabs>
  </div>
</template>

<script setup>
import {
  getArtistDesc,
  getArtistDetail,
  getArtistTopSong,
  getArtistSongs
} from "@/api/artist.ts";
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { NavBar, Icon, Button, Tab, Tabs, List } from "vant";
import Card from "@/components/Card.vue";
const route = useRoute();
const store = useStore();
/* 
  artist 歌手相关 数据和方法
*/
const artist = reactive({
  detail: {
    artist: {
      cover: "",
      name: "",
      musicSize: 0
    },
    identify: {
      imageDesc: "",
      actionUrl: ""
    }
  },
  desc: {}
});
const id = route.query.id;
getArtistDetail(id).then(res => {
  // console.log(res.data);
  artist.detail = res.data;
});
getArtistDesc(id).then(res => {
  // console.log(res);
  artist.desc = res;
});

/* 
  card 视图
*/
const imageDesc = computed(() =>
  artist.detail.identify
    ? artist.detail.identify.imageDesc
    : artist.detail.identify
);

/*  
  Tabs,Tab 
*/
const active = ref(0);
const topSongData = reactive({
  songs: [
    {
      name: "",
      id: "",
      al: {
        id: "",
        name: "",
        pic: "",
        picUrl: ""
      }
    }
  ],
  isMore: false
});

/* 
  下拉加载
*/
const loading = ref(false);
const finished = ref(false);
// 页数
let page = 1;
// 歌曲总数
// let total = 50;
let limit = 50;
const onLoad = () => {
  // 如果没有更多
  if (topSongData.isMore === false) {
    finished.value = true;
    return;
  }
  getArtistSongs({
    id: route.query.id,
    limit: limit,
    offset: page * limit
  }).then(res => {
    console.log(res);
    page = page + 1;
    if (res.more === false) {
      finished.value = true;
    }
    // 可恶，居然没有背景图，那我自己加一个好了
    res.songs.map(
      item => (item.al.picUrl = require("@/assets/imgs/artist_default.png"))
    );
    topSongData.songs.push(...res.songs);
    loading.value = false;
  });
};

// tabs页签点击事件
const onClickTab = ({ name }) => {
  console.log(name + "clicked");
};

// 获取歌手热门50
const getTopSongs = async () => {
  const res = await getArtistTopSong(route.query.id);
  console.log(res);
  if (res.code === 200) {
    topSongData.songs = res.songs;
  }
  if (res.more === true) {
    topSongData.isMore = true;
  }
};
getTopSongs();

// play
const play = i => {
  // console.log(i);
  // console.log(topSongData.songs.length);
  store.commit("setPlaylist", topSongData.songs);
  store.commit("setPlayCurrentIndex", i);
};
</script>

<style lang="less" scoped>
.artist {
  position: relative;
  width: 100vw;
  // min-height: 100vh;
  height: 50%;
  .icon {
    color: #fff;
  }

  .image {
    z-index: -1;
    height: auto;
  }
  .card {
    width: 90vw;
    height: 20vh;
    margin: -20px auto 20px;

    padding: 10px;
    background-color: #fff;
    border-radius: 30px;
    text-align: center;
    div {
      font-size: 12px;
      margin-top: 5px;
      color: var(--van-gray-8);
    }
    .starBtn {
      margin-top: 15px;
      width: 30vw;
    }
  }
  .mainCard {
    main {
      text-indent: 2em;
      font-size: 14px;
      line-height: 1.5em;
    }
    .bottom {
      text-align: center;
      padding-top: 5px;
      font-size: 12px;
    }
  }
  .songList {
    .top {
      display: flex;
      justify-content: space-between;
      .left {
        // width: 70vw;
        display: flex;
        margin-left: 15px;
        h3 {
          padding-left: 15px;
        }
      }
      .right {
        // width: 30vw;
        margin-right: 30px;
        svg {
          color: #000;
        }
      }
    }
    .topSongList {
      width: 100vw;
      height: 55px;
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding-left: 15px;
      list-style: none;

      .left {
        display: flex;
        .index {
          padding-right: 20px;
        }
        .title {
          display: flex;
          flex-direction: column;
          height: 50px;
          div {
            height: 25px;
            line-height: 1.8em;
            &:nth-child(2) {
              font-size: 12px;
              color: var(--van-gray-8);
            }
          }
        }
      }
      .right {
        margin-right: 15px;
      }
    }
  }
}
</style>