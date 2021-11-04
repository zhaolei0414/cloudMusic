<template>
  <div class="listViewTop">
    <!-- 背景图片 -->
    <img :src="playlist.coverImgUrl" alt="" />
    <nav class="listViewTopNav">
      <div class="left">
        <div @click="$router.go(-1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zuojiantou"></use>
          </svg>
        </div>
        <div class="title">歌单</div>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-danlieliebiao"></use>
        </svg>
      </div>
    </nav>
    <div class="context">
      <div class="contextLeft">
        <img :src="playlist.coverImgUrl" alt="" />
        <span>{{ changeValue(playlist.playCount) }}</span>
      </div>
      <div class="contextRight">
        <h3>{{ playlist.name }}</h3>
        <div class="author">
          <img :src="playlist.creator.avatarUrl" alt="" />
          <span>{{ playlist.creator.nickname }}</span>
        </div>
        <div class="description">
          {{ playlist.description }}
        </div>
      </div>
    </div>
    <div class="iconList">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinxi"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang1"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <span>下载</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { changeValue } from "@/utils/changeValue.js";
const props = defineProps(["playlist"]);
</script>

<style lang="less" scoped>
.listViewTop {
  width: 100vw;
  padding: 0 0.4rem;
  margin-top: 15px;
  > img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: auto;
    filter: blur(40px);
  }
  .listViewTopNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.8rem;
    font-size: 16px;
    color: #fff;
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      fill: #fff;
    }
    .left,
    .right {
      display: flex;
      .icon:first-child {
        margin-right: 20px;
      }
    }
  }
}
.context {
  margin-top: 50px;
  display: flex;
  .contextLeft {
    position: relative;
    img {
      width: 150px;
      height: 150px;
      border-radius: 15px;
    }
    span {
      position: absolute;
      top: 0;
      right: 10px;
      color: #eee;
    }
  }
  .contextRight {
    margin-left: 15px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    .author {
      display: flex;
      align-items: center;
      span {
        color: #d3c6c6;
      }
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .description {
      display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示*/
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 2; /*限制在一个块元素显示的文本的行数*/
      -webkit-box-orient: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/
      color: #ccc;
      font-size: 12px;
      margin-top: 15px;
    }
  }
}
.iconList {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #eee;
    font-size: 14px;
    span {
      margin-top: 5px;
    }
  }
  .icon {
    fill: #fff;
  }
}
</style>