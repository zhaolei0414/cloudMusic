<template>
  <div class="card">
    <nav>猜你喜欢</nav>
    <div class="grid">
      <div
        class="gridItem"
        @click="$router.push({
          name: 'DJView',
          query: {
            id: item.id
          }
        })"
        v-for="(item, index) in data.items"
        :key="item.id"
      >
        <van-image :src="item.picUrl" radius="15px" />
        <div class="title van-multi-ellipsis--l2">
          <Tag type="warning" round plain>{{ item.category }}</Tag>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPersonalizeRecommend } from '@/api/dj.js'
import { Tag } from 'vant'
import { reactive } from 'vue'
const data = reactive({
  items: []
})
getPersonalizeRecommend().then(res => {
  console.log(res);
  data.items = res.data
})
</script>

<style lang="less" scoped>
.card {
  width: 95vw;
  margin: 15px auto 0;
  background-color: #fff;
  border-radius: 5px;
}

nav {
  margin-left: 15px;
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-template-rows: 150px 150px;
  gap: 15px 15px;
  .gridItem {
    .title {
      font-size: 12px;
    }
  }
}
</style>