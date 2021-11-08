<template>
  <div class="homelists">
    <nav>
      <div>
        <span @click="changeToList" :class="{ active: data.page === 'list' }"
          >为你推荐</span
        >
        <span>丨</span>
        <span @click="changeToSong" :class="{ active: data.page === 'song' }"
          >推荐单曲</span
        >
      </div>
      <span class="more">更多</span>
    </nav>

    <Swipe
      v-if="data.page === 'list'"
      class="list-swipe"
      :loop="false"
      :show-indicators="false"
      indicator-color="white"
    >
      <Swipe-item class="page1"> </Swipe-item>
      <Swipe-item class="page2">2</Swipe-item>
    </Swipe>
    <Swipe
      v-else-if="data.page === 'song'"
      class="song-swipe"
      :loop="false"
      :show-indicators="false"
      indicator-color="white"
    >
      <Swipe-item class="page1">{{ data.page }}</Swipe-item>
      <Swipe-item class="page2">2</Swipe-item>
    </Swipe>
  </div>
</template>

<script setup>
import { Swipe, SwipeItem } from "vant";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["homeData"]);
const router = useRouter();
const data = reactive({
  page: "list",
  listData: {}
});
const changeToList = () => {
  data.page = "list";
};
const changeToSong = () => {
  data.page = "song";
};

const routerLinkToListView = id => {
  router.push({
    name: "ListView",
    query: {
      id: id
    }
  });
};
</script>



<style scoped lang='less'>
.homelists {
  nav {
    display: flex;
    width: 100vw;
    height: 25px;
    line-height: 25px;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 10px;
    > span {
      margin-right: 20px;
    }
    div {
      margin-left: 15px;
      span {
        margin-right: 5px;
      }
      span:nth-child(2) {
        color: var(--van-gray-5);
      }
      span.active {
        font-weight: 700;
      }
    }
  }
  .list-swipe {
    height: 200px;

    .page2 {
      background-color: pink;
    }
  }
  .song-swipe {
    height: 200px;
    .page1 {
      background-color: green;
    }
    .page2 {
      background-color: purple;
    }
  }
  .page1,
  .page2 {
    width: 50px;
    height: 150px;
    li {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 15px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 15px;
      }
      span {
        margin-left: 15px;
        font-size: 14px;
      }
    }
  }
}
</style>