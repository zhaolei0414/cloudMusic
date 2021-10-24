<template>
  <div class="playController">
    <div class="left" @click="showPopUp">
      <img :src="playlist[playCurrentIndex].al.picUrl" alt="" />
      <div class="content">
        <div class="title">
          {{ playlist[playCurrentIndex].name }}
        </div>
        <div class="tips">横滑可切换上下首哦</div>
      </div>
    </div>
    <div class="right">
      <svg v-show="paused" class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-show="!paused" class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-playlistMusic"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      @timeupdate="updateTime"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"
    ></audio>
    <PlayMusic
      :show="show"
      :playDetail="playlist[playCurrentIndex]"
      @closePopUp="closePopUp"
      :paused="paused"
      :play="play"
    ></PlayMusic>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import PlayMusic from "@/components/PlayMusic.vue";
import { mapState, useStore } from "vuex";
export default {
  components: {
    PlayMusic,
  },
  computed: {
    ...mapState(["playlist", "playCurrentIndex"]),
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
    const play = function () {
      if (audio.value.paused) {
        audio.value.play();
        store.dispatch(
          "reqLyric",
          store.state.playlist[store.state.playCurrentIndex].id
        );
        store.commit("setPaused", false);
        paused.value = false;
      } else {
        audio.value.pause();
        paused.value = true;
        store.state.playlist[store.state.playCurrentIndex].id;
        store.commit("setPaused", true);
      }
    };
    /* 
    展示详情页
    */
    const show = ref(false);
    const showPopUp = function () {
      show.value = true;
    };
    const closePopUp = function () {
      show.value = false;
    };
    /* 
      播放进度
    */
    //  audio标签提供的api 当播放时触发钩子

    const updateTime = function () {
      store.commit("setCurrentTime", audio.value.currentTime);
    };
    return {
      audio,
      play,
      paused,
      showPopUp,
      show,
      closePopUp,
      updateTime,
    };
  },
};
</script>

<style lang="less" scoped>
.playController {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  background-color: #fff;
  .left {
    display: flex;
    padding: 0 0.4rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .content {
      padding: 0 0.2rem;
      .tips {
        font-size: 0.2rem;
        color: gray;
      }
    }
  }
  .right {
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 0.2rem;
    }
  }
}
</style>