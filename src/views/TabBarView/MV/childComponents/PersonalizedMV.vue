<template>
  <div>
    <!-- 推荐mv -->
    <Divider>推荐mv</Divider>
    <div class="card">
      <ul>
        <li
          v-for="item in data.mv"
          :key="item.id"
          class="mv van-hairline--bottom"
          @click="$router.push(`/mvview?id=${item.id}`)"
        >
          <div class="left">
            <van-image :src="item.picUrl" width="35vw" height="15vh" radius="10px" />
          </div>
          <div class="right">
            <div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
            <div class="author van-ellipsis">{{ item.artists[0].name }}</div>
          </div>
        </li>
      </ul>
    </div>

    <Divider dashed>没有更多了</Divider>
  </div>
</template>

<script setup>
import { getPersonalizedMV, getProgramRecommend } from "@/api/mv";
import { getLocalTime } from "@/utils/getLocalTime";
import { reactive } from "vue";
import { Divider, Tag } from "vant";
const data = reactive({
  mv: []
});
getPersonalizedMV().then(res => {
  // console.log(res.result);
  data.mv = res.result;
});
</script>

<style scoped lang='less'>
.card {
  // margin-top: 5px;
  width: 95vw;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #fff;
}
.creatTime {
  font-size: 12px;
}
.bottom {
  width: 210px;
  display: flex;
  justify-content: space-between;
}
.mv {
  display: flex;
  margin-left: 15px;
  margin-bottom: 5px;
  .right {
    margin-left: 15px;
    .title {
      font-weight: 700;
      font-size: 14px;
    }
    .author {
      font-size: 12px;
    }
  }
}
</style>