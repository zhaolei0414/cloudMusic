<template>
  <swipe :autoplay="3000" lazy-render class="swipe">
    <swipe-item v-for="image in imgs" :key="image">
      <img :src="image" />
    </swipe-item>
  </swipe>
</template>

<script setup>
import { Swipe, SwipeItem } from "vant";
// 接收轮播图片
const props = defineProps({
  imgs: Array,
});
</script>

<style lang="less" scoped>
.swipe {
  width: 360px;
  height: 145px;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
::v-deep .van-swipe__indicators {
  background-color: transparent;
}
</style>