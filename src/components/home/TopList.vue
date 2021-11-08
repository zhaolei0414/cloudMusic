<template>
  <div>
    <ListNav>排行榜</ListNav>
    <scroll-x>
      <div class="content">
        <router-link
          :to="{ path: '/listview', query: { id: item.id } }"
          v-for="item in state.list"
          :key="item.id"
          class="recommendList"
        >
          <img :src="item.coverImgUrl" />
        </router-link>
      </div>
    </scroll-x>
  </div>
</template>

<script setup>
import { getTopList } from "@/api/home.js";
import ScrollX from "@/components/ScrollX.vue";
import ListNav from "@/components/ListNav.vue";

import { reactive } from "vue";
const state = reactive({
  list: []
});
getTopList().then(res => {
  // console.log(res.list);
  let map = res.list.map(item => {
    return {
      coverImgUrl: item.coverImgUrl,
      id: item.id
    };
  });
  // console.log(map);
  map = map.splice(0, 6);
  // console.log(map);
  state.list = map;
});
</script>

<style scoped lang="less">
.content {
  display: flex;
  // width: 200vw;
  justify-content: space-around;
  height: 112.5px;
  .recommendList {
    width: 30vw;
    img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
}
</style>