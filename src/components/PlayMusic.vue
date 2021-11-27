<template>
  <Popup
    :before-close="beforeClose"
    v-model:show="props.show"
    :overlay="false"
    :style="{ height: '100%' }"
    closeable
    position="bottom"
    close-icon-position="top-left"
    close-icon="arrow-down"
  >
    <div class="bg" :style="{ backgroundImage: `url(${playDetail.al.picUrl})` }"></div>
    <div class="playTop">
      <div class="title">
        <p>{{ playDetail.name }}</p>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang" />
        </svg>
      </div>
    </div>
    <div v-show="!isLyric" @click="isLyric = !isLyric" class="playContent">
      <img
        class="needle"
        :class="{ active: !$store.state.paused }"
        src="@/assets/imgs/needle-ab.png"
        alt
      />
      <img src="@/assets/imgs/disc-circle.png" />
      <img
        :src="playDetail.al.picUrl"
        alt
        class="rotateImg"
        :class="{ paused: $store.state.paused }"
      />
    </div>
    <!-- 歌词滚动部分 -->
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
        >{{ item.lyric }}</li>
      </ul>
    </div>
    <!-- 进度条 -->
    <div class="progress">
      <Slider v-model="sliderCurrentTime" @change="onSliderChange" button-size="18px" />
    </div>
    <div class="playFooter">
      <div @click="changePlayMode">
        <svg v-show="playMode === 0" class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiaoxunhuan" />
        </svg>
        <svg v-show="playMode === 1" class="icon" aria-hidden="true">
          <use xlink:href="#icon-danquxunhuan" />
        </svg>
        <svg v-show="playMode === 2" class="icon" aria-hidden="true">
          <use xlink:href="#icon-suijibofang-copy" />
        </svg>
      </div>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-48shangyishou" />
      </svg>
      <svg v-show="$store.state.paused" class="icon play" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang1-copy" />
      </svg>
      <svg v-show="!$store.state.paused" class="icon play" aria-hidden="true" @click="play">
        <use xlink:href="#icon-zanting" />
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-048caozuo_xiayishou" />
      </svg>
      <svg class="icon" aria-hidden="true" @click="showPopUp">
        <use xlink:href="#icon-danlieliebiao" />
      </svg>
    </div>
  </Popup>
  <Popup
    v-model:show="isShow"
    position="right"
    :overlay-style="{ backgroundColor: 'transparent' }"
    :style="{ height: '10%', width: '30%', top: '86%', borderRadius: '15px' }"
  >
    <ul class="popup">
      <li @click="likeThisMusic" class="van-hairline--bottom">
        <Icon name="like-o" />
        <span>喜欢</span>
      </li>
      <li class="van-hairline--bottom">
        <Icon name="chat-o" />
        <span>评论</span>
      </li>
    </ul>
  </Popup>
</template>

<script setup>
import { Popup, Slider, Toast, Icon } from "vant";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { mapState, useStore } from "vuex";
import { getLiked } from '@/api/playList.ts'
const props = defineProps({
  show: Boolean,
  playDetail: Object,
  paused: Boolean,
  play: Function
});
const isLyric = ref(false);
const emit = defineEmits(["closePopUp", "updateCurrentTime", "playMode"]);
const beforeClose = function () {
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
  单曲循环，列表循环，随机播放
*/
/**
 * type playMode{
 *  0:'列表循环',
 *  1:'单曲循环',
 *  2:'随机播放'
 * }
 */

const playMode = ref(0);
const changePlayMode = () => {
  playMode.value += 1;
  if (playMode.value > 2) {
    playMode.value = 0;
  }
  if (playMode.value === 0) {
    Toast.setDefaultOptions({
      position: "bottom"
    });
    Toast("列表循环");
  } else if (playMode.value === 1) {
    Toast.setDefaultOptions({
      position: "bottom"
    });
    Toast("单曲循环");
  } else {
    Toast.setDefaultOptions({
      position: "bottom"
    });
    Toast("随机播放");
  }
  emit("playMode", playMode.value);
};
/* 
  上一首，下一首
*/
let store = useStore();
const goPlay = function (num) {
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
    // 刚填入歌曲的时候，播放进度百分比是NaN,需要重置为零
    if (isNaN(current)) {
      sliderCurrentTime.value = 0;
      return;
    }
    sliderCurrentTime.value = current;
  }
);
// 点击展示popup 可选 喜欢该音乐，展开 歌曲评论
const isShow = ref(false)
const showPopUp = () => {
  isShow.value = true
}
const likeThisMusic = async () => {
  const id = store.state.playlist[store.state.playCurrentIndex].id
  const res = await getLiked({ id })
  if (res.code === 200) {
    Toast.success('已添加到我喜欢的歌单')
  }
}
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
.popup {
  li {
    height: 10vw;
    text-align: center;
    line-height: 10vw;
    span {
      margin-left: 10px;
    }
  }
}
</style>