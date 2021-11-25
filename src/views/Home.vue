<template>
  <div class="home">
    <TopNav>
      <template v-slot:center>
        <top-input @click="routerLinkTO"></top-input>
      </template>
      <template #right>
        <a href="https://github.com/zhaolei0414/cloudMusic">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-github" />
          </svg>
        </a>
      </template>
    </TopNav>

    <div class="scroll-wrapper" ref="wrapper">
      <div class="scroll-content">
        <MySwiper :imgs="imgs" class="swiper"></MySwiper>
        <IconList />
        <!-- 推荐歌单 -->
        <Personalized />
        <!-- 排行榜 -->
        <TopList />
        <!-- 为你推荐 -->
        <HomeLists @refresh="refresh" />
        <div class="height"></div>
      </div>
    </div>

    <!-- <ArtistList /> -->
  </div>
</template>

<script setup>
// 组件
import MySwiper from "../components/MySwiper.vue";
import TopInput from "../components/TopInput.vue";
import TopNav from "../components/TopNav.vue";
import IconList from "@/components/home/IconList.vue";
import Personalized from "@/components/home/Personalized.vue";
import TopList from "@/components/home/TopList.vue";
import HomeLists from "@/components/home/HomeLists.vue";

// import ArtistList from "@/components/home/ArtistList.vue";
// @ is an alias to /src
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { apiBanner, getAllHomeData } from "@/api/home.js";
import { getUserAgent } from "@/utils/getUserAgent";
import BScroll from "@better-scroll/core";
const name = "Home";
const store = useStore();
/* 
  bscroll
*/
let bs = null;
function bsInit(doc) {
  bs = new BScroll(doc, {
    // scrollX: true,
    probeType: 1, // listening scroll event
    click: true,
    tap: true
    // bounce: false,
  });
}
const wrapper = ref(null);
onMounted(() => {
  const doc = wrapper.value;
  bsInit(doc);
});
onBeforeUnmount(() => {
  bs.destroy();
});
function refresh() {
  bs.refresh();
}
/* 
bscroll ended
*/

/* 
  首页轮播
*/
const imgs = reactive([]);
const nav = reactive([]);
async function getSwiperInfo() {
  const type = getUserAgent();
  const { banners } = await apiBanner({ type: type });
  // 轮播图数据 banners
  // console.log(banners);
  const banner = banners.map(item => {
    return {
      pic: item.pic,
      url: item.url
    };
  });
  imgs.push(...banner);
}
getSwiperInfo();
/* 
  跳转搜索页
*/
const router = useRouter();
const routerLinkTO = () => {
  router.push("/search");
};
</script>

<style lang="less" scoped>
.scroll-wrapper {
  position: relative;
  height: 82vh;
  white-space: nowrap;
  overflow: hidden;
}
.scroll-content {
  // height: 155vh;
  display: inline-block;
}
.swiper {
  margin-top: 15px;
  // border-radius: 15px;
}
.height {
  height: 10vh;
}
</style>