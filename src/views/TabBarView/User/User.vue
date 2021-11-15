<template>
  <div>
    <div v-if="!data.isLogin">
      <TopNav>
        <template #right>
          <svg
            @click="
              $router.push({
                name: 'Search'
              })
            "
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </template>
      </TopNav>
      <Card class="card1">
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
      <!-- 我喜欢的音乐 -->
      <Card class="card2">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin1-copy"></use>
          </svg>
        </div>
        <div>
          <div class="title">我喜欢的音乐</div>
          <span>0首</span>
        </div>
      </Card>
    </div>
    <div v-else>
      <TopNav>
        <template #right>
          <svg
            @click="
              $router.push({
                name: 'Search'
              })
            "
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </template>
      </TopNav>
      <Card class="card1">
        <div class="userImg">
          <van-image
            :src="data.avatarUrl"
            width="50"
            height="50"
            round
            class="avatarUrl"
          />
        </div>
        <div class="nickname">{{ data.nickname }}</div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";
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

<style scoped lang='less'>
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
.card2 {
  display: flex;
  align-items: center;
  > div:first-child {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 10px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      color: #fff;
    }
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
  }
}
</style>