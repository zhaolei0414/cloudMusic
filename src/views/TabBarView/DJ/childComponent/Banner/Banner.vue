<template>
  <MySwiper :imgs="data.banner" />
</template>

<script setup>
import { getBanner } from '@/api/dj.ts'
import MySwiper from '@/components/MySwiper.vue'
import { reactive } from 'vue'
const data = reactive({
  banner: []
})
getBanner().then(res => {
  // console.log(res);
  data.banner = res.data
})
</script>