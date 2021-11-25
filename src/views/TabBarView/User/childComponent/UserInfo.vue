<template>
  <Card v-if="!data.isLogin" class="card1">
    <div class="userImg">
      <van-image
        :src="require('@/assets/imgs/user_default.png')"
        width="50"
        height="50"
        round
        class="avatarUrl"
      />
    </div>
    <div class="nickname" @click="$router.push('/login')">登录后查看</div>
  </Card>
  <Card v-else class="card1">
    <div class="userImg">
      <van-image :src="data.avatarUrl" width="50" height="50" round class="avatarUrl" />
    </div>
    <div class="nickname">{{ data.nickname }}</div>
  </Card>
</template>

<script setup>
import Card from "@/components/Card.vue";
import { useStore } from "vuex";
import { reactive } from "vue";
const store = useStore();
const data = reactive({
  isLogin: store.state.isLogin,
  nickname: store.state.userInfo.nickname,
  avatarUrl: store.state.userInfo.avatarUrl
});
</script>

<style lang="less"  scoped>
.card1 {
  margin-top: 20px;
  .userImg {
    position: relative;
    .avatarUrl {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
    }
  }
  .nickname {
    margin-top: 30px;
    text-align: center;
    font-size: 14px;
  }
}
</style>