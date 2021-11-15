<template>
  <div class="tabview">
    <Loading v-show="data.isLoading" vertical />

    <Row v-show="!data.isLoading" justify="space-between" gutter="10">
      <Col v-for="item in data.showListView" :key="item.id" span="8">
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
            <span class="playCount">{{ changeValue(item.playCount) }}</span>
          </div>
          <!-- 标题 -->
          <div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script setup>
import { apiPersonalized, getTopList, getTopPlaylist } from "@/api/home.js";
import { changeValue } from "@/utils/changeValue.js";
import { Col, Row, Loading } from "vant";
import { watch, ref, reactive, nextTick } from "vue";
const props = defineProps({
  // 接收一个cat 根据cat请求数据
  cat: {
    type: String,
    default: "personalized"
  }
});
// 数据
const data = reactive({
  // 是否显示加载中图标
  isLoading: true,
  // 要展示的页面
  showListView: [
    {
      picUrl: "",
      id: "",
      name: "",
      playCount: ""
    }
  ],
  // 推荐歌单
  personalized: [],
  // 排行榜
  toplist: [],
  // 精品
  boutique: []
});

// 默认选中第一个 推荐歌单
apiPersonalized().then(res => {
  data.personalized = res.result;
  data.showListView = data.personalized;
  nextTick(() => {
    data.isLoading = false;
  });
  // console.log(data.personalized);
});

// 监听标签页的变化，点击不同标签页请求相关的数据
watch(
  () => props.cat,
  (current, prev) => {
    // console.log(current);
    if (current === "推荐") {
      data.showListView = data.personalized;
    } else if (current === "排行榜") {
      data.isLoading = true;
      // 判断有没有获取过数据，如果已经获取过，不要发起请求
      if (data.toplist.length !== 0) {
        data.showListView = data.toplist;
        data.isLoading = false;
        return;
      }
      getTopList().then(res => {
        // console.log(res.list);
        // 遍历每一项 将key  coverImgUrl 修改为 picUrl
        for (let i = 0; i < res.list.length; i++) {
          res.list[i].picUrl = res.list[i].coverImgUrl;
          delete res.list[i].coverImgUrl;
        }
        data.toplist = res.list;
        data.showListView = data.toplist;
        nextTick(() => {
          data.isLoading = false;
        });
      });
    } else if (current === "精品") {
      data.isLoading = true;
      // 判断有没有获取过数据，如果已经获取过，不要发起请求
      if (data.boutique.length !== 0) {
        data.showListView = data.boutique;
        data.isLoading = false;
        return;
      }
      getTopPlaylist().then(res => {
        // console.log(res);
        for (let i = 0; i < res.playlists.length; i++) {
          res.playlists[i].picUrl = res.playlists[i].coverImgUrl;
          delete res.playlists[i].coverImgUrl;
        }
        data.boutique = res.playlists;
        data.showListView = data.boutique;
        nextTick(() => (data.isLoading = false));
      });
    } else {
      // console.log(current);
      data.isLoading = true;
      getTopPlaylist({ cat: current }).then(res => {
        // 遍历每一项 将key  coverImgUrl 修改为 picUrl
        for (let i = 0; i < res.playlists.length; i++) {
          res.playlists[i].picUrl = res.playlists[i].coverImgUrl;
          delete res.playlists[i].coverImgUrl;
        }
        data.showListView = res.playlists;
        nextTick(() => {
          data.isLoading = false;
        });
      });
    }
  }
);
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