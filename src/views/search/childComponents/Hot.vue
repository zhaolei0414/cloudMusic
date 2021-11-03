<template>
  <div class="hot">
    <h4>推荐搜索:</h4>
    <ul class="lists">
      <li v-for="(item, i) in hots" :key="i" @click="$emit('searchHot', item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getHot } from "@/api/search.js";
import { reactive } from "vue";
const hots = reactive([]);
getHot().then((res) => {
  // console.log(res.result.hots);
  res.result.hots = res.result.hots.splice(0, 4);
  const map = res.result.hots.map((item) => item.first);

  hots.push(...map);
});
</script>

<style scoped lang="less">
.hot {
  margin-top: 15px;
  // display: flex;
  height: 20px;
  h4 {
    margin-bottom: 5px;
    margin-right: 15px;
  }
}
.lists {
  display: flex;
  li {
    padding-right: 15px;
    color: #333;
    font-size: 12px;
    line-height: 20px;
  }
}
</style>