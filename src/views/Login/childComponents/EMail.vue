<template>
  <div class="email">
    <NavBar
      title="网易邮箱登录"
      left-arrow
      @click-left="$router.go(-1)"
      :border="false"
    />
    <CellGroup inset>
      <!-- 输入手机号，调起手机号键盘 -->
      <Field
        v-model="mail"
        label="邮箱"
        label-width="3.1em"
        autofocus
        clearable
        placeholder="请输入网易邮箱号"
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
import { postLoginMail } from "@/api/login.js";
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const mail = ref("");
const password = ref("");
const checkTel = () => {
  // console.log(tel.value);
  // console.log(password.value);
  sendLoginInfo();
};
const sendLoginInfo = async () => {
  try {
    const result = await postLoginMail({
      email: mail.value,
      password: password.value
    });
    console.log(result);
    //  ...
    if (result.data.code === 200) {
      localStorage.setItem("userInfo", JSON.stringify(result.data));
      // 将得到的用户信息保存到 localStorage
      localStorage.setItem("token", result.data.token); //暂不知怎么用

      // 保存cookie 请求时带上cookie
      localStorage.setItem("cookie", encodeURIComponent(result.data.cookie));
      // 登录完成 更新状态
      store.dispatch("checkLogin");
      router.replace({
        name: "Home"
      });
    } else if (result.data.code === 502) {
      Toast.fail("账号或密码错误");
      password.value = "";
    } else if (result.data.code === 250) {
      Toast.fail(result.data.message);
    }
  } catch (error) {
    Toast.fail("账户不存在");
  }
};
</script>

<style scoped>
.email {
  background-color: #fff;
}
.field {
  margin-bottom: 10px;
}
</style>