<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
// BScroll 封装
import BScroll from "@better-scroll/core";
import { ref, onMounted, onBeforeUnmount } from "vue";
let bs = null;
function bsInit(doc) {
  bs = new BScroll(doc, {
    scrollX: true,
    probeType: 1, // listening scroll event
    click: true,
    tap: true,
  });
}
const wrapper = ref(null);
onMounted(() => {
  const doc = wrapper.value;
  bsInit(doc);
});
onBeforeUnmount(() => {
  bs.destroy();
});
</script>

<style scoped>
.scroll-wrapper {
  position: relative;
  width: 100vw;
  white-space: nowrap;
  overflow: hidden;
}
.scroll-content {
  width: 200vw;
  display: inline-block;
}
</style>