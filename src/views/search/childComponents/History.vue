<template>
  <div v-if="history">
    <h4>搜索历史:</h4>
    <div class="history">
      <span>{{ history }}</span>
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
      history: "",
    };
  },
  created() {
    this.history = localStorage.getItem("history");
  },
  methods: {
    delHistory() {
      localStorage.removeItem("history");
      this.history = "";
    },
  },
};
</script>


<style scoped lang="less">
.history {
  display: flex;
  justify-content: space-between;
  .icon {
    margin-right: 15px;
  }
}
</style>