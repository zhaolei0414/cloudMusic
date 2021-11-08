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
    <NavBar
      :border="false"
      fixed
      :style="{ backgroundColor: 'rgba(255,255,255,0)' }"
    >
      <template #left>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
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
      <div>
        {{ imageDesc }}
      </div>
      <Button type="danger" round class="starBtn">关注</Button>
    </div>

    <Tabs v-model:active="active" swipeable>
      <Tab title="主页">内容 1</Tab>
      <Tab title="歌曲">内容 2</Tab>
    </Tabs>
  </div>
</template>

<script setup>
import { getArtistDesc, getArtistDetail } from "@/api/artist.js";
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { NavBar, Icon, Button, Tab, Tabs } from "vant";
const route = useRoute();
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
      imageDesc: ""
    }
  },
  desc: {}
});
const id = route.query.id;
getArtistDetail(id).then(res => {
  console.log(res.data);
  artist.detail = res.data;
});
getArtistDesc(id).then(res => {
  console.log(res);
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
</script>

<style lang="less" scoped>
.artist {
  position: relative;
  width: 100vw;
  min-height: 100vh;

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
}
</style>