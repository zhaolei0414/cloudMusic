<template>
  <!-- 验证码界面 -->
  <div class="captcha">
    <!-- 密码输入框 -->
    <NavBar title="请输入验证码" left-arrow @click-left="$router.go(-1)" />
    <CaptchaInput
      :value="value"
      :focused="showKeyboard"
      :length="4"
      :maxlength="4"
      :mask="false"
      @focus="showKeyboard = true"
      class="captchaInput"
    />
    <!-- 数字键盘 -->
    <NumberKeyboard
      v-model="value"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script setup>
import {
  NavBar,
  PasswordInput as CaptchaInput,
  NumberKeyboard,
  Toast
} from "vant";
import {
  postcaptchaVerify,
  postLoginInfo,
  getLoginRefresh
} from "@/api/login.js";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
/* vant 控件 */
const value = ref("");
const showKeyboard = ref(true);
/* 监听用户输入的value */
watch(value, async () => {
  if (value.value.length === 4) {
    // 验证码是否正确
    const res = await postcaptchaVerify({
      // 手机号
      phone: store.state.userInfo.phone,
      // 验证码
      captcha: value.value
    });
    console.log(res);
    if (res.data.code === 200) {
      // 验证码正确 开始登录
      const resData = await postLoginInfo({
        phone: store.state.userInfo.phone,
        captcha: value.value
      });
      console.log(resData.data);
      localStorage.setItem("userInfo", JSON.stringify(resData.data));
      // 将得到的用户信息保存到 localStorage
      localStorage.setItem("token", resData.data.token); //暂不知怎么用
      // 保存cookie 请求时带上cookie
      localStorage.setItem("cookie", encodeURIComponent(resData.data.cookie));
      // 登录完成 更新状态
      store.dispatch("checkLogin");
      //  ...

      router.replace({
        name: "Home"
      });
    } else {
      // 验证码错误 要求重新填
      Toast.fail("验证码错误");
      value.value = "";
    }
  }
});
</script>

<style scoped lang='less'>
.captcha {
  position: relative;
  height: 100vh;
  z-index: 1000001;
  .captchaInput {
    margin-top: 15px;
  }
}
</style>