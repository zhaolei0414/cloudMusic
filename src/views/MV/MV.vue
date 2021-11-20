<template>
  <div class="mvView">
    <!-- nav 导航栏 -->
    <NavBar />
    <Swipe @change="onChange" class="swipe" lazy-render vertical :show-indicators="false">
      <SwipeItem v-for="(item,i) in data.detail" :key="item.id" style="height: 100vh">
        <main @scroll="scroll">
          <!-- 视频播放器 -->
          <video :src="data.url[i]" style="width:100%" x5-video-player-type="h5" controls />
          <!-- 右侧按钮 -->
          <div v-if="isInfoComputed" class="sliderBar">
            <!-- 点赞 -->
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianzan_kuai" />
              </svg>
              <div class="likedCount">{{ changeValue(data.info[i].likedCount) }}</div>
            </div>
            <!-- 评论 -->
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun1" />
              </svg>
              <div>{{ data.info[i].commentCount }}</div>
            </div>
            <!-- 转发 -->
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhuanfa" />
              </svg>
              <div>{{ data.info[i].shareCount }}</div>
            </div>
            <!-- 收藏 -->
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wenjianjia" />
              </svg>
              <div>收藏</div>
            </div>
          </div>
          <!-- 左下角信息 -->
          <div class="info">
            <div class="author">
              <van-image :src="item.cover" round width="12vw" height="12vw" />
              <div>{{ item.artistName }}</div>
            </div>
            <div class="name van-ellipsis">{{ item.name }}</div>
            <div class="playCount">{{ changeValue(item.playCount) + '次观看' }}</div>
          </div>
        </main>
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script setup>
import NavBar from "./childComponent/NavBar.vue";
import { Swipe, SwipeItem } from "vant";
import { useRoute } from "vue-router";
import { getMVDetail, getMVUrl, getSimiMV, getMVDetailInfo } from "@/api/mv.js";
import { ref, onMounted, reactive, nextTick } from "vue";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const id = route.query.id;
const data = reactive({
  // 播放地址
  url: [],
  // 信息
  detail: [],
  // // 点赞，评论，转发
  info: []
});
const isInfoComputed = ref(false)
// 获取相似mv
getSimiMV(id).then(res => {
  // console.log(res.mvs);
  data.detail.push(...res.mvs)
  const id = res.mvs.map(item => item.id)
  const promise = id.map(item => {
    return getMVUrl(item).then(res => {
      // console.log(res.data.url);
      data.url.push(res.data.url)
      getMVDetailInfo(item).then(res => {
        // console.log(res);
        data.info.push(res)
      })
    })
  })
  Promise.all(promise).then(res => {
    nextTick(() => {
      setTimeout(() => {
        isInfoComputed.value = true
      }, 100)
    })
  })
});
// 获取mv详情信息
getMVDetail(id).then(res => {
  // console.log(res.data);
  data.detail.push(res.data)
});
// 获取mv地址
getMVUrl(id).then(res => {
  // console.log(res);
  data.url.push(res.data.url)
});
getMVDetailInfo(id).then(res => {
  data.info.push(res)
})

const onChange = (i) => {
  const videos = document.querySelectorAll('video')
  videos.forEach(item => item.pause())
  videos[i].play()
}

const changeValue = (num) => {
  if (num > 10000) {
    num = (num / 10000).toFixed(1) + '万'
  }
  return num
}
onMounted(() => {
  // 进入mv播放页，暂停audio标签的播放
  const audio = document.querySelector("#playControl_doPlay");
  audio.pause();
  store.commit("setPaused", true);
});
</script>

<style scoped lang='less'>
.mvView {
  width: 100vw;
  // height: 100vh;
  background-color: rgb(54, 46, 46);
  .swipe {
    height: 100vh;
  }
  main {
    position: relative;
    height: 100vh;
    video {
      position: absolute;
      left: 0;
      top: 20%;
    }
  }
  .sliderBar {
    position: absolute;
    right: 0;
    top: 40%;
    z-index: 99;
    width: 10vw;
    height: 40vh;
    margin-right: 15px;
    color: #fff;
    font-size: 14px;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      .likedCount {
        width: 20vw;
        text-align: center;
      }
      .icon {
        width: 8vw;
        height: 8vh;
      }
    }
  }
  .info {
    position: absolute;
    left: 0;
    bottom: 20vh;
    width: 40vw;
    height: 10vh;
    color: #fff;
    font-size: 14px;
    .author {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
    .name {
      width: 70vw;
      margin: 15px 0 0 15px;
    }
    .playCount {
      margin: 15px 0 0 15px;
      color: #969799;
    }
  }
}
</style>