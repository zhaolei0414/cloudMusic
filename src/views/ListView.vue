<template>
  <ScrollY :init="init">
    <div class="listView">
      <ListViewTop :playlist="state.playlist"></ListViewTop>
      <PlayList :playlist="state.playlist"></PlayList>
    </div>
  </ScrollY>
</template>

<script setup>
import { apiPlayListDetail } from "@/api/playList.js";
import { ref, reactive, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// 导入组件
import ListViewTop from "@/components/listview/ListViewTop.vue";
import PlayList from "@/components/listview/PlayList.vue";
import ScrollY from "@/components/ScrollY.vue";
let init = ref(false);
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
  // console.log(state.playlist.tracks);
  // store.commit("setPlaylist", result.playlist.tracks);
  nextTick(() => {
    init.value = true;
  });
});
</script>