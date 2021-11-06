<template>
  <div>
    <NavBar
      title="手机号登录"
      left-arrow
      @click-left="$router.go(-1)"
      :border="false"
    />
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
        class="field"
      />
      <Field
        v-model="password"
        type="password"
        label="密码"
        label-width="3.1em"
        autofocus
        clearable
        placeholder="请输入密码"
        :style="{ borderBottom: '1px solid var(--van-border-color)' }"
        class="field"
      />
      <Button
        round
        type="primary"
        size="large"
        color="#D87093"
        @click="checkTel"
        >登录</Button
      >
    </CellGroup>
  </div>
</template>

<script setup>
import { NavBar, Field, CellGroup, Button, Toast } from "vant";
import { postLoginInfo } from "@/api/login.js";
import { ref } from "vue";
const tel = ref("");
const password = ref("");
const checkTel = () => {
  // console.log(tel.value);
  // console.log(password.value);
  sendLoginInfo();
};
const sendLoginInfo = async () => {
  try {
    const result = await postLoginInfo({
      phone: tel.value,
      password: password.value
    });
    console.log(result);
    if (result.data.code === 200) {
      localStorage.setItem("userInfo", JSON.stringify(result.data));
      // 将得到的用户信息保存到 localStorage
      localStorage.setItem("token", resData.data.token); //暂不知怎么用
      // 保存cookie 请求时带上cookie
      localStorage.setItem("cookie", encodeURIComponent(resData.data.cookie));

      // ...
    } else if (result.data.code === 502) {
      Toast.fail("密码错误");
      password.value = "";
    }
  } catch (error) {
    Toast.fail("账户不存在");
    // 可跳转到注册页
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 10px;
}
</style>