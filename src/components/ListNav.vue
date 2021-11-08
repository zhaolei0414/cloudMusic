<template>
  <div>
    <div class="flex box1">
      <h3><slot>推荐歌单</slot></h3>
      <span class="more">更多</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: row;
}
.box1 {
  width: 100vw;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 5px;
  margin-top: 15px;
}
.more {
  position: relative;
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
</style>