<template>
  <Card>
    <Tabs v-model:active="active" sticky offset-top="10.67vw" scrollspy>
      <Tab title="创建歌单">
        <MyCell :list="createdPlaylist" />
      </Tab>
      <Tab title="收藏歌单">
        <MyCell :list="subscribedPlaylist" />
      </Tab>
    </Tabs>
  </Card>
</template>

<script setup>
import Card from "@/components/Card.vue";
import MyCell from "@/components/MyCell.vue";
import { Tab, Tabs } from 'vant'
import { ref } from 'vue'
const active = ref(0);
const props = defineProps({
  createdPlaylist: {
    type: Array
  },
  subscribedPlaylist: {
    type: Array
  }
})
</script>