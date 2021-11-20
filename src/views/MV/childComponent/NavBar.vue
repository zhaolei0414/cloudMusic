<template>
  <nav>
    <div class="left">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <div class="center">
      <div>MV</div>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huazhonghua-copy"></use>
      </svg>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
nav {
  width: 100vw;
  height: 40px;
  color: #fff;
  font-weight: 700;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    margin-left: 15px;
  }
  .center {
    flex: 1;
    text-align: center;
  }
  .right {
    margin-right: 15px;
  }
}
</style>