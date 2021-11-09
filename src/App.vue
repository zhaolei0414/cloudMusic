<template>
  <div>
    <router-view></router-view>
    <!-- 登录界面不显示底部播放栏 -->
    <div v-show="!/^\/login/i.test($route.path)" class="flexColumn appBottom">
      <PlayController />
      <TabBar :fixed="false" active-color="#d20a0a" />
    </div>
    <!-- 底部是fixed定位 没有高度 搞个透明的盒子撑开高度 -->
    <div class="bottomView"></div>
  </div>
</template>

<script setup>
import PlayController from "@/components/PlayController.vue";
import TabBar from "@/components/TabBar/TabBar.vue";
import { useStore } from "vuex";
// 启动的时候检查是否登录
const store = useStore();
store.dispatch("checkLogin");
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "微软雅黑";
}
body {
  background-color: var(--van-background-color);
}
a {
  color: var(--van-gray-8);
}
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.flexColumn {
  display: flex;
  flex-direction: column;
}
.appBottom {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99999;
}
// 更多标签页
.more {
  position: relative;
  justify-self: end;
  width: 50px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 12px;
}
.more::after {
  content: "";
  position: absolute;
  right: 5px;
  top: 10px;
  width: 5px;
  height: 5px;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  transform: rotate(-45deg);
}
.bottomView {
  height: 107px;
}
</style>
