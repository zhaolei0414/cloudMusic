<template>
  <div v-if="$route.path === '/login/mobile'" class="mobile">
    <NavBar
      title="验证码登录"
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
          @click="checkTel"
          >下一步</Button
        >
        <div
          class="loginWithPassword"
          @click="$router.push({ name: 'PhonePassword' })"
        >
          密码登录
        </div>
      </CellGroup>
    </main>
  </div>
  <router-view v-else></router-view>
</template>

<script setup>
import { NavBar, Field, CellGroup, Button, Toast } from "vant";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  getExistenceCheck,
  getCaptcha,
  postcaptchaVerify
} from "@/api/login.js";

const router = useRouter();
const route = useRoute();
const store = useStore();

const tel = ref("");
// 验证输入的手机号
const checkTel = async () => {
  if (tel.value === "") {
    return Toast("请输入手机号");
  }
  const checkRes = await getExistenceCheck({
    phone: tel.value
  });
  // console.log(checkRes);
  if (checkRes.exist === 1) {
    // 用户存在 发送验证码
    const captcha = await getCaptcha({
      phone: tel.value
    });
    console.log(captcha);
    if (captcha.code === 200) {
      // 将用户的手机号信息保存到vuex
      store.commit("setUserPhone", tel.value);
      // 跳转到输入验证码页面,需要传递query,否则会被路由守卫打回
      router.replace({
        name: "Captcha",
        query: {
          phone: tel.value
        }
      });
    } else if (captcha.code === 400) {
      Toast.fail(captcha.message);
    } else {
      Toast.fail("服务器错误");
    }
  } else {
    // 用户不存在 跳转注册页
    Toast("用户不存在,跳转注册页,暂时没写");
  }
};
</script>

<style lang="less" scoped>
.mobile {
  position: relative;
  left: 0;
  top: 0;
  height: 100vh;
}
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
    margin-top: 30px;
    font-size: 12px;
  }
}
</style>