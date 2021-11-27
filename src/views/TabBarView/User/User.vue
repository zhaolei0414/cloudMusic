<template>
  <TopNav>
    <template #right>
      <svg
        @click="
          $router.push({
            name: 'Search'
          })
        "
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-sousuo" />
      </svg>
    </template>
  </TopNav>
  <UserInfo />
  <!-- 我喜欢的音乐 -->
  <MyMusicList :count="data.likedMusicCount" :id="data.likedMusicId" />
  <!-- 创建歌单 收藏歌单 -->
  <MyPlayList
    :createdPlaylist="data.createdPlaylist"
    :subscribedPlaylist="data.subscribedPlaylist"
  />
</template>

<script setup>
import { getUserSubcount, getUserPlaylist } from '@/api/user.ts'
import TopNav from "@/components/TopNav.vue";
import UserInfo from './childComponent/UserInfo.vue'
import MyMusicList from './childComponent/MyMusicList.vue'
import MyPlayList from './childComponent/MyPlayList.vue'
import { useStore } from "vuex";
import { reactive } from "vue";
const store = useStore();
const data = reactive({
  isLogin: store.state.isLogin,
  id: store.state.userInfo.userId,
  // 创建歌单数量
  createdPlaylistCount: 0,
  // 收藏歌单数量
  subPlaylistCount: 0,
  // 我喜欢的歌单数量
  likedMusicCount: 0,
  // 喜欢 的歌单 id
  likedMusicId: 0,
  // 创建的歌单
  createdPlaylist: [],
  // 收藏的歌单
  subscribedPlaylist: []
});
if (data.isLogin) {
  getUserSubcount().then(res => {
    data.createdPlaylistCount = res.createdPlaylistCount
    data.subPlaylistCount = res.subPlaylistCount
  })
  getUserPlaylist({ uid: data.id, limit: 100 }).then(res => {
    data.likedMusicCount = res.playlist[0].trackCount
    data.likedMusicId = res.playlist[0].id
    res.playlist.shift()
    // console.log(res.playlist);
    data.createdPlaylist = res.playlist.filter(item => !item.subscribed)
    data.subscribedPlaylist = res.playlist.filter(item => item.subscribed)
  })
}
</script>

<style scoped lang='less'>
</style>