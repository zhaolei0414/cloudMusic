<template>
  <div>
    <router-view class="routerView"></router-view>
    <PlayController></PlayController>
  </div>
</template>

<script setup>
import PlayController from "@/components/PlayController.vue";
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "微软雅黑";
}

.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.routerView {
  height: 93vh;
}
</style>
