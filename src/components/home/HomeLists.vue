<template>
  <div class="homelists">
    <nav>
      <div>
        <span @click="changeToList" :class="{ active: data.page === 'list' }"
          >精品歌单</span
        >
        <span>丨</span>
        <span @click="changeToSong" :class="{ active: data.page === 'song' }"
          >新音乐</span
        >
      </div>
      <span class="more" @click="$router.push('/songListCenter')">更多</span>
    </nav>

    <Swipe
      v-if="data.page === 'list'"
      class="list-swipe"
      :loop="false"
      :show-indicators="false"
      indicator-color="white"
    >
      <Swipe-item class="page1">
        <ul>
          <li
            v-for="item in data.listData.slice(0, 3)"
            :key="item.id"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend(item.id, 'list')"
          >
            <div class="left">
              <van-image
                :src="item.coverImgUrl"
                width="40"
                height="40"
                radius="10"
                @load="$emit('refresh')"
              />
            </div>
            <div class="right van-ellipsis">{{ item.name }}</div>
          </li>
        </ul>
      </Swipe-item>
      <Swipe-item class="page2">
        <ul>
          <li
            v-for="item in data.listData.slice(3, 6)"
            :key="item.id"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend(item.id, 'list')"
          >
            <div class="left">
              <van-image
                :src="item.coverImgUrl"
                width="40"
                height="40"
                radius="10"
              />
            </div>
            <div class="right van-ellipsis">{{ item.name }}</div>
          </li>
        </ul>
      </Swipe-item>
    </Swipe>
    <Swipe
      v-else-if="data.page === 'song'"
      class="song-swipe"
      :loop="false"
      :show-indicators="false"
      indicator-color="white"
    >
      <Swipe-item class="page1">
        <ul>
          <li
            v-for="item in data.songData.slice(0, 3)"
            :key="item.id"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend(item.id, 'song')"
          >
            <div class="left">
              <van-image
                :src="item.picUrl"
                width="40"
                height="40"
                radius="10"
              />
            </div>
            <div class="right van-ellipsis">{{ item.name }}</div>
          </li>
        </ul>
      </Swipe-item>
      <Swipe-item class="page2">
        <ul>
          <li
            v-for="item in data.songData.slice(3, 6)"
            :key="item.id"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend(item.id, 'song')"
          >
            <div class="left">
              <van-image
                :src="item.picUrl"
                width="40"
                height="40"
                radius="10"
              />
            </div>
            <div class="right van-ellipsis">{{ item.name }}</div>
          </li>
        </ul>
      </Swipe-item>
    </Swipe>
  </div>
</template>

<script setup>
import { Swipe, SwipeItem } from "vant";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getTopPlaylist, getPersonalizedNewsong } from "@/api/home.js";

const props = defineProps(["homeData"]);
const router = useRouter();
const store = useStore();
const data = reactive({
  page: "list",
  listData: [
    {
      picUrl: "",
      name: "",
      id: ""
    }
  ],
  songData: [{ coverImgUrl: "", name: "", id: "" }]
});
const changeToList = () => {
  data.page = "list";
};
const changeToSong = () => {
  data.page = "song";
};
/* 获取精品歌单相关部分 */
getTopPlaylist({ limit: 6 }).then(res => {
  data.listData = res.playlists;
});
/* 移动端滑动轮播图，滑动后会触发click事件,此为改进 */
const isClicked = ref(true);
function touchstart() {
  // console.log(isClicked.value);
  isClicked.value = true;
}
function touchmove() {
  // console.log("touchmoved");
  isClicked.value = false;
}
function touchend(id, string) {
  // console.log("touchended", isClicked.value);
  if (isClicked.value === true && string === "list") {
    routerLinkToListView(id);
  } else if (isClicked.value === true && string === "song") {
    // 播放单曲
    playSong(id);
  }
}
const routerLinkToListView = id => {
  router.push({
    name: "ListView",
    query: {
      id: id
    }
  });
};
const playSong = id => {
  const song = [];
  for (let i = 0; i < data.songData.length; i++) {
    if (data.songData[i].id === id) {
      song.push(data.songData[i]);
      break;
    }
  }
  const playSong = [
    {
      name: song[0].name,
      id: song[0].id,
      al: {
        id: song[0].song.artists[0].id,
        name: song[0].song.artists[0].name,
        picUrl: song[0].song.artists[0].img1v1Url
      }
    }
  ];
  // 装填单曲
  store.commit("setPlaylist", playSong);
  // 获取歌词
  store.dispatch(
    "reqLyric",
    store.state.playlist[store.state.playCurrentIndex].id
  );
  store.commit("setPaused", true);
};
/* 获取推荐新歌部分 */
getPersonalizedNewsong().then(res => {
  data.songData = res.result;
});
</script>



<style scoped lang='less'>
.homelists {
  nav {
    display: flex;
    width: 100vw;
    height: 25px;
    line-height: 25px;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 10px;
    > span {
      margin-right: 20px;
    }
    div {
      margin-left: 15px;
      span {
        margin-right: 5px;
      }
      span:nth-child(2) {
        color: var(--van-gray-5);
      }
      span.active {
        font-weight: 700;
      }
    }
  }
  .list-swipe {
    height: 200px;
  }
  .song-swipe {
    height: 200px;
  }
  .page1,
  .page2 {
    width: 50px;
    height: 150px;
    li {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 15px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 15px;
      }
      span {
        margin-left: 15px;
        font-size: 14px;
      }
    }
  }
}
</style>