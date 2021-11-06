<template>
  <div class="root">
    <Loading v-show="isLoading" vertical class="loading" />
    <div v-show="!isLoading" class="listView">
      <ListViewTop :playlist="state.playlist"></ListViewTop>
      <PlayList :playlist="state.playlist"></PlayList>
    </div>
  </div>
</template>

<script setup>
import { apiPlayListDetail } from "@/api/playList.js";
import { ref, reactive, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Loading } from "vant";
// 导入组件
import ListViewTop from "@/components/listview/ListViewTop.vue";
import PlayList from "@/components/listview/PlayList.vue";

let isLoading = ref(true);
const state = reactive({
  playlist: {
    creator: {},
    tracks: []
  }
});
const store = useStore();
const route = useRoute();
const id = route.query.id;
apiPlayListDetail({ id }).then(result => {
  state.playlist = result.playlist;
  // console.log(state.playlist.tracks);
  // store.commit("setPlaylist", result.playlist.tracks);
  nextTick(() => {
    isLoading.value = false;
  });
});
</script>

<style lang="less" scoped>
.root {
  margin-bottom: 13vh;

  .loading {
    width: 100vw;
    height: 100%;
  }
}
</style>