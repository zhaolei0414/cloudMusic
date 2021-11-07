<template>
  <div class="root">
    <!-- 未登录 -->
    <div v-if="!$store.state.isLogin">
      <Row class="userTop" @click="$router.push('/login')">
        <Col offset="1">
          <img src="@/assets/imgs/user_default.png" alt="" />
        </Col>
        <Col offset="1" @click="$router.push('/login')">
          立即登录
          <Icon name="arrow" />
        </Col>
      </Row>
    </div>
    <!-- 已登录 -->
    <div v-if="$store.state.isLogin">
      <Row class="userTop">
        <Col offset="1">
          <img :src="$store.state.userInfo.avatarUrl" alt="" />
        </Col>
        <Col offset="1">
          {{ $store.state.userInfo.nickname }}
          <Icon name="arrow" />
        </Col>
      </Row>
      <Button @click="logout" type="danger" size="normal" round
        >退出登录</Button
      >
    </div>
  </div>
</template>

<script setup>
import { Col, Row, Icon, Button } from "vant";
import { useStore } from "vuex";
const store = useStore();
const logout = () => {
  store.dispatch("logout");
};
</script>

<style scoped lang="less">
.root {
  .userTop {
    line-height: 30px;
    font-size: 12px;
    margin-top: 15px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>