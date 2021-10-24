<template>
  <nav class="topNav">
    <div class="topLeft">
      <slot name="left">
        <svg class="icon" aria-hidden="true">
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
</template>

<script>
export default {
  name: "TopNav",
};
</script>

<style lang="less" scoped>
.topNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 375px;
  height: 40px;

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