<template>
  <!-- App 底部TabBar -->
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    <van-tabbar-item replace icon="friends-o">关注</van-tabbar-item>
    <van-tabbar-item replace icon="setting-o">标签</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from "vant";
import { ref } from "vue";
const active = ref(0);
</script>

<style>
</style>