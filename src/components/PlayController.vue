<template>
  <!-- 如果在登录界面，隐藏 -->
  <div  class="playController">
    <div class="left" @click="showPopUp">
      <!-- <img :src="playlist[playCurrentIndex].al.picUrl" alt="" /> -->
      <!-- :error-icon="require('@/assets/imgs/artist_default.png')" -->
      <van-image
        width="0.8rem"
        height="0.8rem"
        round
        class="img"
        :src="playlist[playCurrentIndex].al.picUrl"
      />
      <div class="content">
        <div class="title">
          {{ playlist[playCurrentIndex].name }}
        </div>
        <div class="tips">点击显示详情</div>
      </div>
    </div>
    <div class="right">
      <svg
        v-show="$store.state.paused"
        class="icon"
        aria-hidden="true"
        @click="play"
      >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg
        v-show="!$store.state.paused"
        class="icon"
        aria-hidden="true"
        @click="play"
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-playlistMusic"></use>
      </svg>
    </div>
    <audio
      @timeupdate="updateTime"
      @ended="ended"
      @error="error"
      @loadedmetadata="loadedmetadata"
      :src="
        `https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`
      "
      preload="metadata"
      ref="audio"
      id="playControl_doPlay"
    ></audio>
    <PlayMusic
      @closePopUp="closePopUp"
      @updateCurrentTime="updateCurrentTime"
      @playMode="playMode"
      :show="show"
      :playDetail="playlist[playCurrentIndex]"
      :paused="paused"
      :play="play"
    ></PlayMusic>
  </div>
</template>

<script>
import { ref, computed, nextTick } from "vue";
import PlayMusic from "@/components/PlayMusic.vue";
import { mapState, useStore } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    PlayMusic
  },
  computed: {
    ...mapState(["playlist", "playCurrentIndex"])
  },
  mounted() {
    this.$store.dispatch("reqLyric", this.playlist[this.playCurrentIndex].id);
  },
  setup() {
    /* 
    播放
    */
    const store = useStore();
    const paused = ref(true);
    const audio = ref(null);
    const play = function() {
      if (audio.value.paused) {
        audio.value.play();
        store.dispatch(
          "reqLyric",
          store.state.playlist[store.state.playCurrentIndex].id
        );
        store.commit("setPaused", false);
        // paused.value = false;
      } else {
        audio.value.pause();
        // paused.value = true;
        // store.state.playlist[store.state.playCurrentIndex].id;
        store.commit("setPaused", true);
      }
    };
    // 当audio标签出错时，触发
    const error = e => {
      // console.log(e);
      Toast.setDefaultOptions({ className: "inexa" });
      Toast.fail("o(╥﹏╥)o, 版权问题不能播放");
      store.commit("setPaused", true);
      setTimeout(() => {
        store.commit("setPlayCurrentIndex", store.state.playCurrentIndex + 1);
      }, 1000);
    };

    // audio元数据获取成功时，触发
    const loadedmetadata = () => {
      store.commit("setDuration", audio.value.duration);
      store.commit("setcurrentTimePrecent", currentTimePercent.value);
      // console.log((currentTimePercent.value * 100).toFixed(2));
      store.commit("setCurrentTime", audio.value.currentTime);
    };
    /* 
    展示详情页
    */
    const show = ref(false);
    const showPopUp = function() {
      show.value = true;
    };
    const closePopUp = function() {
      show.value = false;
    };
    /* 
      播放进度
    */
    // 播放进度百分比
    let currentTimePercent = ref(0);
    //  audio标签提供的api 当播放时触发钩子
    const updateTime = function() {
      // console.log(audio.value.currentTime, audio.value.duration);
      currentTimePercent.value = +(
        (audio.value.currentTime / audio.value.duration) *
        100
      ).toFixed(0);
      store.commit("setcurrentTimePrecent", currentTimePercent.value);
      store.commit("setCurrentTime", audio.value.currentTime);
    };
    const mode = ref(0);
    const playMode = num => {
      mode.value = num;
    };

    // 播放结束时触发
    const ended = () => {
      // 列表循环
      if (mode.value === 0) {
        // console.log("ended");
        store.commit("setPaused", true);
        let current = store.state.playCurrentIndex;
        // console.log(current);
        current += 1;
        store.commit("setPlayCurrentIndex", current);
        nextTick(() => {
          play();
        });
      } else if (mode.value === 1) {
        // 单曲循环
        store.commit("setPaused", true);
        play();
      } else {
        // 随机播放
        store.commit("setPaused", true);
        // 歌单数组的长度length
        const length = store.state.playlist.length;
        // 返回 0 - length-1 的随机整数
        const random = Math.floor(Math.random() * (length - 1));
        store.commit("setPlayCurrentIndex", random);
        nextTick(() => {
          play();
        });
      }
    };
    const updateCurrentTime = time => {
      audio.value.currentTime = time;
    };
    return {
      audio,
      play,
      paused,
      showPopUp,
      show,
      closePopUp,
      updateTime,
      ended,
      error,
      currentTimePercent,
      updateCurrentTime,
      loadedmetadata,
      playMode,
      mode
    };
  }
};
</script>

<style lang="less" scoped>
.playController {
  width: 100vw;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  background-color: #fff;
  .left {
    display: flex;
    width: 75vw;
    justify-content: space-around;
    .img {
      width: 0.8rem;
    }
    .content {
      justify-self: end;
      .tips {
        font-size: 0.2rem;
        color: gray;
      }
      .title {
        width: 60vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .right {
    // width: 50vw;

    .icon {
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 0.2rem;
    }
  }
}
</style>