<template>
  <div v-if="history.length">
    <h4>搜索历史:</h4>
    <div class="history">
      <span
        v-for="(item, index) in history"
        :key="index"
        @click="$emit('searchHistory', item)"
        class="van-ellipsis"
        >{{ item }}</span
      >
      <Icon class="icon" name="cross" @click="delHistory" />
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  name: "History",
  components: { Icon },
  data() {
    return {
      history: []
    };
  },
  created() {
    if (!localStorage.getItem("history")) return;
    const localHistory = localStorage
      .getItem("history")
      .split(",")
      .reverse();
    // 只显示五个
    // console.log(localHistory);
    if (localHistory.length >= 5) {
      localHistory.splice(5, localHistory.length);
    }
    this.history = localHistory;
  },
  methods: {
    delHistory() {
      localStorage.removeItem("history");
      this.history = "";
    }
  }
};
</script>


<style scoped lang="less">
.history {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: 90vw;
  // justify-content: space-between;
  .icon {
    position: absolute;
    right: -30px;
    top: 2px;
    margin-right: 15px;
  }
  span {
    margin-top: 5px;
    margin-right: 5px;
    font-size: 12px;
    color: --van-text-color-2;
  }
}
</style>