<template>
  <!-- 卡片视图 -->
  <div class="my-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: "string",
    }
  }
};
</script>

<style scoped>
.my-card {
  width: 90vw;
  margin: 15px auto 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 8vw;
  color: var(--van-gray-8);
}
</style>