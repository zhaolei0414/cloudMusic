<template>
  <TopNav>
    <template #right>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo" />
      </svg>
    </template>
  </TopNav>
  <NoticeBar left-icon="volume-o" text="目前很多电台已经没有音频了" />
  <!-- 电台轮播 -->
  <Banner class="banner" />
  <!-- 个性推荐 -->
  <Recommend />
</template>

<script setup>
import Banner from './childComponent/Banner/Banner.vue'
import Recommend from './childComponent/Recommend/Recommend.vue'
import TopNav from '@/components/TopNav.vue'
import { NoticeBar } from 'vant';
</script>

<style scoped>
.banner {
  margin-top: 15px;
}
</style>