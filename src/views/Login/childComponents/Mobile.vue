<template>
  <div>
    <NavBar
      title="手机号登录"
      left-arrow
      @click-left="$router.go(-1)"
      :border="false"
    />
    <main class="mobileLoginMain">
      <h4>登录体验更多精彩</h4>
      <span>未注册手机号登录后将自动创建账号</span>
      <CellGroup inset>
        <!-- 输入手机号，调起手机号键盘 -->
        <Field
          v-model="tel"
          type="tel"
          label="+86"
          label-width="3.1em"
          autofocus
          clearable
          placeholder="请输入手机号"
          :style="{ borderBottom: '1px solid var(--van-border-color)' }"
        />
        <Button
          round
          type="primary"
          size="large"
          color="#D87093"
          class="nextBtn"
          >下一步</Button
        >
        <!-- 等会写 -->
        <div class="loginWithPassword">密码登录</div>
      </CellGroup>
    </main>
  </div>
</template>

<script setup>
import { NavBar, Field, CellGroup, Button } from "vant";
import { ref } from "vue";
const tel = ref("");
</script>

<style lang="less" scoped>
.mobileLoginMain {
  margin-left: 15px;
  span {
    font-size: 12px;
    color: var(--van-gray-5);
  }
  .nextBtn {
    margin-top: 25px;
    height: 40px;
  }
  .loginWithPassword {
    display: none;
    margin-top: 30px;
    font-size: 12px;
  }
}
</style>