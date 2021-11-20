<template>
  <!-- App 底部TabBar -->
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    <van-tabbar-item replace to="/dj">
      <template #icon>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-diantai"></use>
        </svg>
      </template>
      电台
    </van-tabbar-item>
    <van-tabbar-item replace to="/mv">
      <template #icon>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-mv"></use>
        </svg>
      </template>
      MV</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup>
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from "vant";
import { ref } from "vue";
const active = ref(0);
</script>

<style scoped>
.icon {
  /* width: 5vw; */
  height: 2.5vh;
}
</style>