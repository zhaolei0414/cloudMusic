<template>
  <List v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <ul>
      <li
        v-for="(item, index) in data"
        :key="item.id"
        @click="$router.push(`/mvview?id=${item.id}`)"
      >
        <div class="left">
          <van-image :src="item.cover" width="30vw" height="10vh" radius="10px" />
        </div>
        <div class="right">
          <div class="title">{{ item.name }}</div>
          <Tag v-if="item.playCount >= 1000000" type="warning">百万播放</Tag>
          <div class="artist">{{ item.artists[0].name }}</div>
        </div>
      </li>
    </ul>
  </List>
</template>

<script setup>
import { getMVExclusive } from '@/api/mv.ts'
import { List, Tag } from 'vant';
import { ref, reactive } from 'vue'
const loading = ref(false);
const finished = ref(false);
const offset = ref(1)
const data = reactive([])
const onLoad = () => {
  getMVExclusive({ limit: 10, offset: 10 * offset.value }).then(res => {
    // console.log(res);
    data.push(...res.data)
    offset.value += 1
    if (res.more === false) {
      finished.value = true
      return
    } else {
      loading.value = false
    }
  })
}
</script>

<style scoped lang='less'>
li {
  width: 100vw;
  display: flex;
  margin: 15px 0;
  .right {
    margin-left: 15px;
    .title {
      font-weight: 600;
    }
    .artist {
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>