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
    <MySwiper :imgs="imgs" class="swiper"></MySwiper>
    <IconList />
    <!-- 推荐歌单 -->
    <Personalized />
    <TopList />
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
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { apiBanner } from "@/api/home.js";
import { getUserAgent } from "@/utils/getUserAgent";

const name = "Home";
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
.swiper {
  margin-top: 15px;
  border-radius: 15px;
}
</style>