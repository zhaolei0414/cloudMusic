<template>
  <div class="root">
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
</template>

<script setup>
import { Col, Row, Icon } from "vant";
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