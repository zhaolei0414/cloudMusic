<template>
  <div>
    <div class="flex box1">
      <h3>编辑推荐</h3>
      <span class="more">更多</span>
    </div>
    <div class="scroll-wrapper" ref="wrapper">
      <div class="scroll-content">
        <div class="flex box2">
          <router-link
            :to="{ path: '/listview', query: { id: item.id } }"
            v-for="item in list"
            :key="item.id"
            class="recommendList"
          >
            <span>
              <img :src="item.picUrl" />
            </span>
            <p>{{ item.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiPersonalized } from "@/api/home.js";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
// 引入BScroll 滑动组件
import BScroll from "@better-scroll/core";
/* 
	 数据部分
	 */
const list = reactive([]);
// limit: 取出数量 , 默认为 30 (不支持 offset)
apiPersonalized({ limit: 9 }).then(res => {
  const { result: data } = res;
  list.push(...data);
});
/* 
	BScroll 
	 */
let bs = null;
function bsInit(doc) {
  bs = new BScroll(doc, {
    scrollX: true,
    probeType: 3, // listening scroll event
    click: true,
    tap: true
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

<style lang="less" scoped>
.flex {
  display: flex;
  flex-direction: row;
}
.box1 {
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 5px;
}

.scroll-wrapper {
  position: relative;
  width: 100vw;
  white-space: nowrap;
  overflow: hidden;
}
.scroll-content {
  width: 300vw;
  display: inline-block;
}
.box2 {
  justify-content: space-around;
}
.recommendList {
  width: 30vw;
  font-size: 12px;
  color: #000;
  span {
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  p {
    display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示*/
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2; /*限制在一个块元素显示的文本的行数*/
    -webkit-box-orient: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/
  }
}
</style>
