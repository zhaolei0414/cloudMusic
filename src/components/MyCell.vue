<template>
  <ul>
    <li
      v-for="(item, index) in list"
      :key="item.id"
      @click="$router.push(`/listview?id=${item.id}`)"
    >
      <div class="left">
        <van-image :src="item.coverImgUrl" width="15vw" height="15vw" radius="3vw" />
      </div>
      <div class="middle">
        <div class="title">{{ item.name }}</div>
        <div class="count">{{ item.trackCount }} 首</div>
      </div>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array
  }
})
</script>

<style lang="less" scoped>
li {
  display: flex;
  gap: 15px;
  .middle {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .title {
      font-size: 16px;
      font-weight: 700;
    }
    .count {
      font-size: 12px;
      color: #969799;
    }
  }
}
</style>