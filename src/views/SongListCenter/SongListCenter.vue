<template>
  <div>
    <NavBar
      title="歌单广场"
      @click-left="$router.go(-1)"
      left-arrow
      fixed
      placeholder
    />
    <Tabs
      v-model:active="active"
      @click-tab="onClickTab"
      animated
      swipeable
      sticky
      offset-top="46px"
    >
      <Tab title="推荐">
        <div class="tabview">
          <Loading v-show="data.isLoading" vertical />
          <Row v-show="!data.isLoading" gutter="10">
            <Col v-for="item in data.personalized" :key="item.id" span="8">
              <div
                @click="
                  $router.push({
                    name: 'ListView',
                    query: {
                      id: item.id
                    }
                  })
                "
                class="flexBox"
              >
                <div class="img">
                  <!-- 图片 -->
                  <van-image :src="item.picUrl" radius="10" />
                  <!-- 播放次数 -->
                  <span class="playCount">{{
                    changeValue(item.playCount)
                  }}</span>
                </div>
                <!-- 标题 -->
                <div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
              </div>
            </Col>
          </Row>
        </div>
      </Tab>
      <Tab title="排行榜">
        <div class="tabview">
          <Loading v-show="data.isLoading" vertical />
          <Row v-show="!data.isLoading" gutter="10">
            <Col v-for="item in data.toplist" :key="item.id" span="8">
              <div
                @click="
                  $router.push({
                    name: 'ListView',
                    query: {
                      id: item.id
                    }
                  })
                "
                class="flexBox"
              >
                <div class="img">
                  <!-- 图片 -->
                  <van-image :src="item.coverImgUrl" radius="10" />
                  <!-- 播放次数 -->
                  <span class="playCount">{{
                    changeValue(item.playCount)
                  }}</span>
                </div>
                <!-- 标题 -->
                <div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
              </div>
            </Col>
          </Row>
        </div>
      </Tab>
      <Tab title="精品">
        <List
          v-model:loading="topSonglistLoading"
          :finished="topSonglistFinished"
          finished-text="没有更多了"
          @load="onTopSonglistLoad"
        >
          <div class="tabview">
            <Loading v-show="data.isLoading" vertical />
            <Row v-show="!data.isLoading" gutter="10">
              <Col v-for="item in data.topSonglist" :key="item.id" span="8">
                <div
                  @click="
                    $router.push({
                      name: 'ListView',
                      query: {
                        id: item.id
                      }
                    })
                  "
                  class="flexBox"
                >
                  <div class="img">
                    <!-- 图片 -->
                    <van-image :src="item.coverImgUrl" radius="10" />
                    <!-- 播放次数 -->
                    <span class="playCount">{{
                      changeValue(item.playCount)
                    }}</span>
                  </div>
                  <!-- 标题 -->
                  <div class="title van-multi-ellipsis--l2">
                    {{ item.name }}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </List>
      </Tab>
      <Tab title="华语">
        <List
          v-model:loading="chineseSonglistLoading"
          :finished="chineseSonglistFinished"
          finished-text="没有更多了"
          @load="onChineseSonglistLoad"
        >
          <div class="tabview">
            <Loading v-show="data.isLoading" vertical />
            <Row v-show="!data.isLoading" gutter="10">
              <Col v-for="item in data.chineseSonglist" :key="item.id" span="8">
                <div
                  @click="
                    $router.push({
                      name: 'ListView',
                      query: {
                        id: item.id
                      }
                    })
                  "
                  class="flexBox"
                >
                  <div class="img">
                    <!-- 图片 -->
                    <van-image :src="item.coverImgUrl" radius="10" />
                    <!-- 播放次数 -->
                    <span class="playCount">{{
                      changeValue(item.playCount)
                    }}</span>
                  </div>
                  <!-- 标题 -->
                  <div class="title van-multi-ellipsis--l2">
                    {{ item.name }}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </List>
      </Tab>
      <Tab title="流行">
        <List
          v-model:loading="popularSonglistLoading"
          :finished="popularSonglistFinished"
          finished-text="没有更多了"
          @load="onPopularSonglistLoad"
        >
          <div class="tabview">
            <Loading v-show="data.isLoading" vertical />
            <Row v-show="!data.isLoading" gutter="10">
              <Col v-for="item in data.popularSonglist" :key="item.id" span="8">
                <div
                  @click="
                    $router.push({
                      name: 'ListView',
                      query: {
                        id: item.id
                      }
                    })
                  "
                  class="flexBox"
                >
                  <div class="img">
                    <!-- 图片 -->
                    <van-image :src="item.coverImgUrl" radius="10" />
                    <!-- 播放次数 -->
                    <span class="playCount">{{
                      changeValue(item.playCount)
                    }}</span>
                  </div>
                  <!-- 标题 -->
                  <div class="title van-multi-ellipsis--l2">
                    {{ item.name }}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </List>
      </Tab>
      <Tab title="欧美">
        <List
          v-model:loading="westSonglistLoading"
          :finished="westSonglistFinished"
          finished-text="没有更多了"
          @load="onWestSonglistLoad"
        >
          <div class="tabview">
            <Loading v-show="data.isLoading" vertical />
            <Row v-show="!data.isLoading" gutter="10">
              <Col v-for="item in data.westSonglist" :key="item.id" span="8">
                <div
                  @click="
                    $router.push({
                      name: 'ListView',
                      query: {
                        id: item.id
                      }
                    })
                  "
                  class="flexBox"
                >
                  <div class="img">
                    <!-- 图片 -->
                    <van-image :src="item.coverImgUrl" radius="10" />
                    <!-- 播放次数 -->
                    <span class="playCount">{{
                      changeValue(item.playCount)
                    }}</span>
                  </div>
                  <!-- 标题 -->
                  <div class="title van-multi-ellipsis--l2">
                    {{ item.name }}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </List>
      </Tab>
    </Tabs>
  </div>
</template>

<script setup>
import { apiPersonalized, getTopList, getTopPlaylist } from "@/api/home.js";
import { changeValue } from "@/utils/changeValue.js";
import { NavBar, Tab, Tabs, Col, Row, Loading, List } from "vant";
import { ref, reactive, nextTick } from "vue";
const active = ref(0);
// 数据
const data = reactive({
  // 是否显示加载中图标
  isLoading: true,
  // 推荐歌单
  personalized: [],
  // 排行榜
  toplist: [],
  // 精品歌单
  topSonglist: [],
  // 华语歌单
  chineseSonglist: [],
  // 流行歌单
  popularSonglist: [],
  // 欧美歌单
  westSonglist: []
});
apiPersonalized().then(res => {
  // console.log(res.result);
  data.personalized = res.result;
  nextTick(() => {
    data.isLoading = false;
  });
});
const onClickTab = title => {
  // 排行榜
  if (title.name === 1) {
    getTopList().then(res => {
      // console.log(res.list);
      data.toplist = res.list;
    });
    // 精品
  } else if (title.name === 2) {
  }
};

// 精品歌单下拉加载
const topSonglistLoading = ref(false);
const topSonglistFinished = ref(false);
const onTopSonglistLoad = () => {
  let updataTime = "";
  if (data.topSonglist.length !== 0) {
    updataTime = data.topSonglist[data.topSonglist.length - 1].updateTime;
  }
  console.log(updataTime);
  getTopPlaylist({ before: updataTime }).then(res => {
    data.topSonglist.push(...res.playlists);
    topSonglistLoading.value = false;
    if (res.more === false) {
      topSonglistFinished.value = true;
    }
  });
};
// 华语歌单下拉加载
const chineseSonglistLoading = ref(false);
const chineseSonglistFinished = ref(false);
const onChineseSonglistLoad = () => {
  let updataTime = "";
  if (data.chineseSonglist.length !== 0) {
    updataTime =
      data.chineseSonglist[data.chineseSonglist.length - 1].updateTime;
  }
  console.log(updataTime);
  getTopPlaylist({ before: updataTime, cat: "华语" }).then(res => {
    data.chineseSonglist.push(...res.playlists);
    chineseSonglistLoading.value = false;
    if (res.more === false) {
      chineseSonglistFinished.value = true;
    }
  });
};
// 流行歌单下拉加载
const popularSonglistLoading = ref(false);
const popularSonglistFinished = ref(false);
const onPopularSonglistLoad = () => {
  let updataTime = "";
  if (data.popularSonglist.length !== 0) {
    updataTime =
      data.popularSonglist[data.popularSonglist.length - 1].updateTime;
  }
  console.log(updataTime);
  getTopPlaylist({ before: updataTime, cat: "流行" }).then(res => {
    data.popularSonglist.push(...res.playlists);
    popularSonglistLoading.value = false;
    if (res.more === false) {
      popularSonglistFinished.value = true;
    }
  });
};
// 欧美歌单下拉加载
const westSonglistLoading = ref(false);
const westSonglistFinished = ref(false);
const onWestSonglistLoad = () => {
  let updataTime = "";
  if (data.westSonglist.length !== 0) {
    updataTime = data.westSonglist[data.westSonglist.length - 1].updateTime;
  }
  console.log(updataTime);
  getTopPlaylist({ before: updataTime, cat: "欧美" }).then(res => {
    data.westSonglist.push(...res.playlists);
    westSonglistLoading.value = false;
    if (res.more === false) {
      westSonglistFinished.value = true;
    }
  });
};
</script>

<style scoped lang='less'>
.tabview {
  width: 95vw;
  margin: 0 auto;
}
.flexBox {
  height: 180px;
  font-size: 14px;
  .img {
    position: relative;
    .playCount {
      position: absolute;
      right: 5px;
      top: 5px;
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>