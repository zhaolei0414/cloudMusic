<template>
  <Sticky>
    <nav class="topNav">
      <div class="topLeft">
        <slot name="left">
          <svg class="icon" aria-hidden="true" @click="showSideBar">
            <use xlink:href="#icon-danlieliebiao"></use>
          </svg>
        </slot>
      </div>
      <div class="topCenter">
        <slot name="center"></slot>
      </div>
      <div class="topRight">
        <slot name="right"></slot>
      </div>
    </nav>
  </Sticky>
  <Popup
    v-model:show="show"
    position="left"
    :style="{
      height: '100%',
      width: '80%',
      zIndex: '100000',
      backgroundColor: '#f7f8fa'
    }"
  >
    <SiderBar></SiderBar>
  </Popup>
</template>

<script>
import { Sticky, Popup } from "vant";
export default {
  name: "TopNav",
  components: {
    Sticky,
    Popup
  }
};
</script>

<script setup>
import { ref } from "vue";
import SiderBar from "@/components/SiderBar/SiderBar.vue";
const show = ref(false);
const showSideBar = () => {
  show.value = true;
};
</script>

<style lang="less" scoped>
.topNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 375px;
  height: 40px;
  background-color: #fff;
  .topLeft {
    width: 30px;
    padding: 0 10px;
  }
  .topCenter {
    display: flex;
    justify-content: space-between;
    align-content: center;
    .active {
      font-weight: 900;
    }
  }
  .topRight {
    width: 30px;
    padding: 0 20px 0 0;
  }
}
</style>