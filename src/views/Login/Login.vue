<template>
  <div v-if="$route.path === '/login'" class="root">
    <!-- 左上角 X  -->
    <Icon name="cross" class="cross" @click="$router.go(-1)" />
    <!-- logo图标 -->
    <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    <div class="button">
      <Button
        @click="
          $router.push({
            name: 'Mobile'
          })
        "
        round
        type="primary"
        size="large"
        color="#d4171e"
        plain
        >手机登录</Button
      >
      <Button
        @click="
          $router.push({
            name: 'EMail'
          })
        "
        class="secondBtn"
        round
        type="primary"
        size="large"
        color="#d4171e"
        plain
        >邮箱登录</Button
      >
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script setup>
import { ref } from "vue";
import { Icon, Button } from "vant";
const show = ref(false);
</script>

<style scoped lang="less">
.root {
  position: relative;
  height: 100vh;
  width: 100vw;
  z-index: 100000;
  background-color: #d4171e;
  color: #fff;
  .cross {
    margin-top: 15px;
    margin-left: 15px;
  }
  .logo {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
  }
  .button {
    position: absolute;
    width: 70vw;
    left: 50%;
    top: 50%;
    font-weight: 700;
    transform: translate(-50%, -50%);
    .secondBtn {
      margin-top: 15px;
    }
  }
}
</style>