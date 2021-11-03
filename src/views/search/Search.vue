<template>
  <div>
    <!-- 搜索框 -->
    <CellGroup class="cellGroup">
      <Search
        :placeholder="showKeyword"
        class="field"
        v-model="userInput"
        @keydown.enter="search"
        shape="round"
      >
      </Search>
      <span @click="$router.go(-1)">取 消</span>
    </CellGroup>
    <!-- 热搜 -->
    <Hot @searchHot="searchHot" />
    <!-- 弹出层 当按下enter搜索时显示 -->
    <Popup
      :show="show"
      closeable
      @close="show = false"
      position="right"
      :style="{ height: '100%', width: '100%' }"
      close-icon-position="top-left"
    >
      <Row>
        <Col offset="4" span="18">
          <Search
            :placeholder="showKeyword"
            class="field"
            v-model="userInput"
            @keydown.enter="search"
            shape="round"
          >
          </Search>
        </Col>
      </Row>
      <Tabs
        v-model:active="active"
        @click-tab="onClickTab"
        class="tabs"
        sticky
        swipeable
      >
        <Tab title="单曲">
          <ul>
            <li
              v-for="(item, i) in recommendSongs.songsList"
              :key="item.id"
              @click="playList(i)"
            >
              <div class="flex">
                <div class="flexColumn">
                  <span>{{ item.name }}</span>
                  <span>{{ item.artists[0].name }}</span>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1-copy"></use>
                  </svg>
                </div>
              </div>
            </li>
          </ul>
        </Tab>
        <Tab title="歌单">
          <Loading vertical v-if="loadingOne" />
          <ul v-else>
            <router-link
              :to="{ path: '/listview', query: { id: item.id } }"
              v-for="item in tabs.songList"
              :key="item.id"
              class="searchList"
            >
              <li class="gedan">
                <div class="left">
                  <img :src="item.coverImgUrl" />
                </div>
                <div class="right">
                  <div>{{ item.name }}</div>
                  <span
                    >by {{ item.creator.nickname }} 播放{{
                      changeValue(item.playCount)
                    }}次</span
                  >
                </div>
              </li>
            </router-link>
          </ul>
        </Tab>
        <Tab title="歌手">
          <Loading vertical v-if="loadingTwo" />
          <ul v-else>
            <!-- id: 歌手id -->
            <li v-for="item in tabs.artists" :key="item.id" class="artists">
              <div class="left">
                <img :src="item.picUrl" alt="" />
              </div>
              <div class="right">
                <span>{{ item.name }}</span>
                <span
                  ><Button round plain type="warning" size="mini"
                    >关注</Button
                  ></span
                >
              </div>
            </li>
          </ul>
        </Tab>
        <Tab title="专辑">
          <Loading vertical v-if="loadingThree" />
          <ul v-else>
            <li
              v-for="item in tabs.albums"
              :key="item.id"
              class="albums"
              @click="routerToAlbumsView(item.id)"
            >
              <div class="left">
                <img :src="item.picUrl" alt="" />
              </div>
              <div class="right">
                <span
                  >{{ item.name }} <i>{{ item.alias[0] }}</i></span
                >
                <span
                  >{{ item.artists[0].name }}
                  <i>{{ getLocalTime(item.publishTime) }}</i></span
                >
              </div>
            </li>
          </ul>
        </Tab>
      </Tabs>
    </Popup>
  </div>
</template>

<script setup>
// import { Field, CellGroup } from "vant";
import {
  Search,
  CellGroup,
  Popup,
  Tab,
  Tabs,
  Col,
  Row,
  Sticky,
  Loading,
  Button,
} from "vant";
import { ref, reactive, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter} from "vue-router";
import { getDefault, getSuggest } from "@/api/search.js";
import { getLocalTime } from "@/utils/getLocalTime.js";
import Hot from "./childComponents/Hot.vue";
import { changeValue } from "@/utils/changeValue.js";
let showKeyword = ref("");
let realkeyword = ref("");
let userInput = ref("");

// 获取默认搜索关键词
getDefault().then((res) => {
  showKeyword.value = res.data.showKeyword;
  realkeyword.value = res.data.realkeyword;
});

// 搜索 默认单曲推荐
const recommendSongs = reactive({
  songsList: [],
});
let inputValue = ref("");
const search = async () => {
  if (userInput.value === "") {
    inputValue.value = realkeyword.value;
  } else {
    inputValue.value = userInput.value;
  }
  // console.log(value);

  const data = await getSuggest({
    keywords: inputValue.value,
  });
  show.value = true;
  // console.log(data.result.songs);
  recommendSongs.songsList = data.result.songs;
  // 强制跳到第一个标签页 不然会出bug的 ^_^
  active.value = 0;
  // 重新搜索后需要重新加载数据后在显示
  loadingOne.value = true;
  loadingTwo.value = true;
  loadingThree.value = true;
};

/* 
弹出层
*/
let show = ref(false);
let active = ref(0);
let loadingOne = ref(true);
let loadingTwo = ref(true);
let loadingThree = ref(true);
const tabs = reactive({
  songList: [],
  artists: [],
  albums: [],
});
const onClickTab = async (title) => {
  // 点击歌单标签页 获取歌单数据
  if (title.name === 1) {
    const res = await getSuggest({
      keywords: inputValue.value,
      type: 1000,
    });
    // console.log(res.result.playlists);
    tabs.songList = res.result.playlists;
    nextTick(() => {
      loadingOne.value = false;
    });
  }
  // 歌手标签页
  if (title.name === 2) {
    const res = await getSuggest({
      keywords: inputValue.value,
      type: 100,
    });
    // console.log(res.result.artists);
    tabs.artists = res.result.artists;
    nextTick(() => {
      loadingTwo.value = false;
    });
  }
  if (title.name === 3) {
    const res = await getSuggest({
      keywords: inputValue.value,
      type: 10,
    });
    // console.log(res.result.albums);
    tabs.albums = res.result.albums;
    nextTick(() => {
      loadingThree.value = false;
    });
  }
};
/* 
  点击li标签播放音乐(单曲)
*/
const store = useStore();
const playList = (i) => {
  // 将歌单推入playlist
  // console.log(i);
  // console.log(recommendSongs);
  const playlist = recommendSongs.songsList.map((item) => {
    return {
      name: item.name,
      id: item.id,
      al: {
        id: item.artists[0].id,
        name: item.artists[0].name,
        picUrl: item.artists[0].img1v1Url,
      },
    };
  });
  // console.log(playlist);
  store.commit("setPlaylist", playlist);
  // console.log(i, store.state.playCurrentIndex);
  if (i !== store.state.playCurrentIndex) {
    store.commit("setPaused", true);
  }
  store.commit("setPlayCurrentIndex", i);
};

/* 
  点击专辑标签页上的li 跳转到专辑页面
*/
const router = useRouter();
// const route = useRoute();
const routerToAlbumsView = (id) => {
  console.log(id);
  router.push({
    name: "Album",
    query: {
      id,
    },
  });
};
/* 
  点击热词调用search事件
*/
const searchHot = (item) => {
  userInput.value = item;
  search();
};
</script>

<style scoped lang='less'>
.cellGroup {
  display: flex;
  justify-content: space-between;
  .field {
    width: 80vw;
  }
  span {
    text-align: center;
    line-height: 54px;
    margin-right: 15px;
  }
}
.mask {
  position: absolute;
  top: 54px;
  left: 0;
  width: 750px;
  background-color: #fff;
}
.tabs li {
  height: 50px;
  border-bottom: 1px solid #f0f0f0;
  margin: 5px 10px;
  span:nth-child(2) {
    font-size: 12px;
    color: #c3c3c3;
  }
}
.flexColumn {
  display: flex;
  flex-direction: column;
}
.flex {
  display: flex;
  justify-content: space-between;
  .icon {
    margin-right: 15px;
  }
}

.searchList {
  width: 30vw;
  font-size: 12px;
  color: #000;
}
.gedan {
  display: flex;

  .left {
    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }
  .right {
    margin-left: 25px;
    font-size: 14px;
  }
}
.artists {
  display: flex;
  img {
    width: 40px;
    height: 40px;
    border-radius: 15px;
  }
  .right {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    font-size: 14px;
    line-height: 40px;
    margin-left: 15px;
    span:last-child {
      margin-right: 15px;
    }
  }
}
.albums {
  display: flex;
  img {
    width: 40px;
    height: 40px;
    border-radius: 15px;
  }
  .right {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    span i {
      color: #c3c3c3;
      font-size: 12px;
      text-decoration: none;
    }
  }
}
</style>