<template>
  <div class="home">
    <TopNav>
      <template v-slot:center>
        <top-input @click="routerLinkTO"></top-input>
      </template>
      <template #right>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </template>
    </TopNav>

    <div class="scroll-wrapper" ref="wrapper">
      <div class="scroll-content">
        <MySwiper :imgs="imgs" class="swiper"></MySwiper>
        <IconList />
        <!-- 推荐歌单 -->
        <Personalized />
        <TopList />
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

// import ArtistList from "@/components/home/ArtistList.vue";
// @ is an alias to /src
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { apiBanner } from "@/api/home.js";
import { getUserAgent } from "@/utils/getUserAgent";
import BScroll from "@better-scroll/core";
const name = "Home";

/* 
  bscroll
*/
let bs = null;
function bsInit(doc) {
  bs = new BScroll(doc, {
    // scrollX: true,
    probeType: 1, // listening scroll event
    click: true,
    tap: true,
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

/* 
bscroll ended
*/
const imgs = reactive([]);
const nav = reactive([]);
async function getSwiperInfo() {
  const type = getUserAgent();
  const { banners } = await apiBanner({ type: type });
  // 轮播图数据 banners
  // console.log(banners);
  const banner = banners.map((item) => {
    return {
      pic: item.pic,
      url: item.url,
    };
  });
  imgs.push(...banner);
}
getSwiperInfo();

const router = useRouter();
const routerLinkTO = () => {
  router.push("/search");
};
</script>

<style lang="less" scoped>
.scroll-wrapper {
  position: relative;
  height: 90vh;
  white-space: nowrap;
  overflow: hidden;
}
.scroll-content {
  height: 120vh;
  display: inline-block;
}
.swiper {
  margin-top: 15px;
  border-radius: 15px;
}
</style>