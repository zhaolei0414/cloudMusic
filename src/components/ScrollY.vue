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
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
const props = defineProps({
  init: Boolean,
});
// console.log(props);
let bs = null;
function bsInit(doc) {
  bs = new BScroll(doc, {
    // scrollX: true,
    probeType: 1, // listening scroll event
    click: true,
    tap: true,
    bounce: false,
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
watch(props, (current, prev) => {
  // console.log(current, prev);
  bs.refresh();
});
</script>

<style scoped>
.scroll-wrapper {
  position: relative;
  height: 90vh;
  white-space: nowrap;
  overflow: hidden;
}
.scroll-content {
  /* width: 200vw; */
  display: inline-block;
}
</style>