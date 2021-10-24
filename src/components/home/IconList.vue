<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <div class="flex">
        <div v-for="item in data" :key="item.id" class="iconItem">
          <a :href="item.url">
            <span>
              <img :src="item.iconUrl" alt="" />
            </span>
            <p>{{ item.name }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiDragonBall } from "@/api/home.js";
import { reactive, ref, onMounted, onUnmounted } from "vue";
// 引入BScroll 滑动组件
import BScroll from "@better-scroll/core";
/* 
获取数据
*/
let data = reactive([]);
apiDragonBall().then((res) => {
  const { data: r } = res;
  data.push(...r);
});
/* 
实现水平滑动
*/
let bs = null;
function bsInit(doc) {
  bs = new BScroll(doc, {
    scrollX: true,
    probeType: 3, // listening scroll event
  });
}
const wrapper = ref(null);
onMounted(() => {
  const doc = wrapper.value;
  bsInit(doc);
});
onUnmounted(() => {
  bs.destroy();
});
</script>

<style lang="less" scoped>
.scroll-wrapper {
  position: relative;
  width: 100vw;
  height: 100px;
  white-space: nowrap;
  margin-top: 15px;
  overflow: hidden;
}
.scroll-content {
  display: inline-block;
  width: 180vw;
}
.flex {
  display: flex;
}

.iconItem {
  display: flex;
  flex-direction: column;
  width: 20vw;
  text-align: center;
  font-size: 14px;

  a {
    text-decoration: none;
    color: black;
  }
  span {
    width: 20vw;
    height: 75px;

    img {
      width: 50%;
      background-color: pink;
      border-radius: 50%;
    }
  }
}
</style>