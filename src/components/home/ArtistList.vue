<template>
  <div>
    <ListNav>歌手榜</ListNav>
    <ScrollX>
      <div class="contain">
        <router-link
          :to="{ path: '/listview', query: { id: item.id } }"
          v-for="item in artistsList"
          :key="item.id"
          class="recommendList"
        >
          <img :src="item.picUrl" alt="" />
        </router-link>
      </div>
    </ScrollX>
  </div>
</template>

<script setup>
import ListNav from "@/components/ListNav.vue";
import ScrollX from "@/components/ScrollX.vue";
import { getArtist } from "@/api/home.js";
import { reactive } from "vue";
const artistsList = reactive([]);
getArtist().then((res) => {
  // console.log(res.list.artists);
  const artists = res.list.artists.splice(0, 6);
  artists.map((item) => {
    return {
      picUrl: item.picUrl,
      name: item.name,
      id: item.id,
    };
  });
  artistsList.push(...artists);
});
</script>

<style scoped lang="less">
.contain {
  display: flex;
  justify-content: space-around;
  height: 150px;
  .recommendList {
    width: 30vw;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>