<template>
  <div class="listView">
    <ListViewTop :playlist="state.playlist"></ListViewTop>
    <PlayList :playlist="state.playlist"></PlayList>
  </div>
</template>

<script setup>
import { apiPlayListDetail } from "@/api/playList.js";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// 导入组件
import ListViewTop from "@/components/listview/ListViewTop.vue";
import PlayList from "@/components/listview/PlayList.vue";
const state = reactive({
  playlist: {
    creator: {},
    tracks: [],
  },
});
const store = useStore();
const route = useRoute();
const id = route.query.id;
apiPlayListDetail({ id }).then((result) => {
  state.playlist = result.playlist;
  store.commit("setPlaylist", result.playlist.tracks);
});
</script>