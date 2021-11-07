<template>
  <div class="homelists">
    <nav>
      <div>
        <span class="active">推荐歌单</span>
        <span>丨</span>
        <span>推荐单曲</span>
      </div>
      <span class="more">更多</span>
    </nav>
    <Swipe class="my-swipe" indicator-color="white">
      <Swipe-item>1</Swipe-item>
      <Swipe-item>2</Swipe-item>
      <Swipe-item>3</Swipe-item>
      <Swipe-item>4</Swipe-item>
    </Swipe>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import { Swipe, SwipeItem } from "vant";
const store = useStore();
</script>

<style scoped lang='less'>
.homelists {
  nav {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    > span {
      margin-right: 20px;
    }
    div {
      margin-left: 15px;
      span {
        margin-right: 5px;
      }
      span:nth-child(2) {
        color: var(--van-gray-5);
      }
      span.active {
        font-weight: 700;
      }
    }
  }
}
.swiper {
  width: 600px;
  height: 300px;
}
</style>