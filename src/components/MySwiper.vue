<template>
  <swipe :autoplay="3000" lazy-render class="myswipe" :width="375">
    <!-- @click="goUrl(image.url)" -->
    <swipe-item v-for="image in imgs" :key="image">
      <img
        :src="image.pic"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend(image.url)"
      />
    </swipe-item>
  </swipe>
</template>

<script setup>
import { Swipe, SwipeItem } from "vant";
import { ref } from "vue";
// 接收轮播图片
const props = defineProps({
  imgs: Array,
  nav: Array
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
function touchend(url) {
  // console.log("touchended", isClicked.value);
  if (isClicked.value === true) {
    goUrl(url);
  }
}

const goUrl = function(url) {
  if (!url) return;
  if (url.search("http") === -1) return;
  window.location.href = url;
};
</script>

<style lang="less" scoped>
.myswipe {
  img {
    width: 375px;
    height: 145px;
    border-radius: 15px 15px 20px 20px;
  }
}
</style>