<template>
  <Popup
    :before-close="beforeClose"
    :show="props.show"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
    close-icon="arrow-down"
    :overlay="false"
  >
    <div
      class="bg"
      :style="{ backgroundImage: `url(${playDetail.al.picUrl})` }"
    ></div>
    <div class="playTop">
      <div class="title">
        <p>{{ playDetail.name }}</p>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div v-show="!isLyric" @click="isLyric = !isLyric" class="playContent">
      <img
        class="needle"
        :class="{ active: !$store.state.paused }"
        src="@/assets/imgs/needle-ab.png"
        alt=""
      />
      <img src="@/assets/imgs/disc-circle.png" />
      <img
        :src="playDetail.al.picUrl"
        alt=""
        class="rotateImg"
        :class="{ paused: $store.state.paused }"
      />
    </div>
    <div v-show="isLyric" @click="isLyric = !isLyric" class="playLyric">
      <ul>
        <li
          v-for="(item, i) in $store.getters.lyricList"
          :key="i"
          :class="{
            active:
              item.time <= $store.state.currentTime &&
              item.pre > $store.state.currentTime
          }"
        >
          {{ item.lyric }}
        </li>
      </ul>
    </div>
    <div class="progress">
      <Slider
        v-model="sliderCurrentTime"
        @change="onSliderChange"
        button-size="18px"
      />
    </div>
    <div class="playFooter">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danxunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-48shangyishou"></use>
      </svg>
      <svg
        v-show="$store.state.paused"
        class="icon play"
        aria-hidden="true"
        @click="play"
      >
        <use xlink:href="#icon-bofang1-copy"></use>
      </svg>
      <svg
        v-show="!$store.state.paused"
        class="icon play"
        aria-hidden="true"
        @click="play"
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-048caozuo_xiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div>
  </Popup>
</template>

<script setup>
import { Popup, Slider } from "vant";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { mapState, useStore } from "vuex";
const props = defineProps({
  show: Boolean,
  playDetail: Object,
  paused: Boolean,
  play: Function
});
const isLyric = ref(false);
const emit = defineEmits(["closePopUp", "updateCurrentTime"]);
const beforeClose = function() {
  emit("closePopUp");
};
/* 
  歌词滚动
*/
let timer = ref(null);
onMounted(() => {
  timer = setInterval(() => {
    let p = document.querySelector(".playLyric li.active");
    if (p) {
      let offsetTop = p.offsetTop;
      // console.log(offsetTop);
      let h = document.querySelector(".playLyric").offsetHeight;
      // console.log(h);
      document.querySelector(".playLyric").scrollTop = p.offsetTop;
    }
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});
/* 
  上一首，下一首
*/
let store = useStore();
const goPlay = function(num) {
  // 点击上一首，下一首时，将进度条归零
  sliderCurrentTime.value = 0;
  let currentNum = store.state.playCurrentIndex + num;
  if (currentNum < 0) {
    currentNum = store.state.playlist.length - 1;
  } else if (currentNum == store.state.playlist.length) {
    currentNum = 0;
  }
  store.commit("setPlayCurrentIndex", currentNum);
  // console.log(store.state.playlist[currentNum].id);
  store.commit("setPaused", true);
  store.dispatch("reqLyric", store.state.playlist[currentNum].id);
  // props.mustPlay();
};
/* 
  滑块 拖动滑块调整播放进度
*/
let sliderCurrentTime = ref(0);

const onSliderChange = () => {
  // console.log(sliderCurrentTime.value);
  // 总时长
  const duration = store.state.duration;
  const current = duration * (sliderCurrentTime.value / 100);
  // console.log(current);
  emit("updateCurrentTime", current);
};
watch(
  () => store.state.currentTimePrecent,
  (current, prev) => {
    // console.log(current);
    sliderCurrentTime.value = current;
  }
);
</script>



<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: auto 100%;
  filter: blur(80px);
  z-index: -1;
}
.playTop {
  width: 100vw;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .title {
    width: 200px;
    margin-left: 100px;
    justify-self: center;
    overflow: visible;
    p {
      width: 200px;
      padding-right: 50px;
      color: #fff;
      font-weight: 900;
      text-align: center;
    }
  }
}
.playContent {
  position: fixed;
  width: 100vw;
  left: 0;
  top: 1.5rem;
  .needle {
    width: 100px;
    height: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    transform-origin: 15px 15px;
    transform: rotate(-30deg);
    transition: 1s all;
  }
  .needle.active {
    transform: rotate(10deg);
    transition: 1s all;
  }
  img:nth-child(2) {
    width: 250px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 100px;
  }

  .rotateImg {
    width: 3.15rem;
    height: 3.15rem;
    border-radius: 50%;
    position: absolute;
    left: 30%;
    top: 147px;
    transform-origin: center;
    transform: translateX(-50%);
    animation: rotate 6s infinite linear;
  }
  .rotateImg.paused {
    animation-play-state: paused;
  }
}
.playLyric {
  position: absolute;
  width: 100vw;
  height: 80vh;
  line-height: 40px;
  left: 0;
  top: 1.5rem;
  text-align: center;
  overflow: scroll;

  .active {
    color: red;
    transition: all 1s;
  }
}
.playFooter {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  .play.icon {
    width: 0.8rem;
    height: 0.8rem;
  }
}
.progress {
  position: absolute;
  width: 100vw;
  bottom: 60px;
  left: 0;
}
</style>