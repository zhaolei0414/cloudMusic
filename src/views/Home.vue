<template>
  <div class="home">
    <TopNav>
      <template v-slot:center>
        <top-input></top-input>
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
  </div>
</template>

<script setup>
// 组件
import MySwiper from "../components/MySwiper.vue";
import TopInput from "../components/TopInput.vue";
import TopNav from "../components/TopNav.vue";
import IconList from "@/components/home/IconList.vue";
import Personalized from "@/components/home/Personalized.vue";
// @ is an alias to /src
import { reactive } from "vue";
import { apiBanner } from "@/api/home.js";
import { getUserAgent } from "@/utils/getUserAgent";

const name = "Home";
const imgs = reactive([]);
async function getSwiperInfo() {
  const type = getUserAgent();
  const { banners } = await apiBanner({ type: type });
  // 轮播图数据 banners
  const banner = banners.map((item) => item.pic);
  imgs.push(...banner);
}
getSwiperInfo();
</script>

<style lang="less" scoped>
.swiper {
  margin-top: 15px;
  border-radius: 15px;
}

</style>