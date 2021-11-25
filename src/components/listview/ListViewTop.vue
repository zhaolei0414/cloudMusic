<template>
  <div class="listViewTop">
    <!-- 背景图片 -->
    <img :src="playlist.coverImgUrl" alt />
    <nav class="listViewTopNav">
      <div class="left">
        <div @click="$router.go(-1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zuojiantou" />
          </svg>
        </div>
        <div class="title">歌单</div>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
          <use xlink:href="#icon-sousuo" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-danlieliebiao" />
        </svg>
      </div>
    </nav>
    <div class="context">
      <div class="contextLeft">
        <img :src="playlist.coverImgUrl" alt />
        <span>{{ changeValue(playlist.playCount) }}</span>
      </div>
      <div class="contextRight">
        <h3>{{ playlist.name }}</h3>
        <div class="author">
          <img :src="playlist.creator.avatarUrl" alt />
          <span>{{ playlist.creator.nickname }}</span>
        </div>
        <div class="description">{{ playlist.description }}</div>
      </div>
    </div>
    <div class="iconList">
      <!-- 歌单评论 -->
      <div @click="showCommentPlaylist">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinxi" />
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang1" />
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div @click="doDownLoad">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai" />
        </svg>
        <span>下载</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuan" />
        </svg>
        <span>多选</span>
      </div>
    </div>
    <Popup
      v-model:show="isShowCommentPlaylist"
      position="right"
      :style="{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--van-background-color)'
      }"
    >
      <NavBar title="评论" left-arrow @click-left="isShowCommentPlaylist = false" />
      <List v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="card">
          <h4>评论区</h4>
          <ul ref="commentUlRef">
            <li
              v-for="item in commentPlaylistData.comments"
              :key="item.commentId"
              class="commentPlaylist"
              @touchstart="commentLiStart(item, $event)"
              @touchmove="commentLiMove"
              @touchend="commentLiEnd"
            >
              <div class="content">
                <div class="top">
                  <div class="left">
                    <van-image :src="item.user.avatarUrl" round width="40" height="40" />
                    <div class="nicknameAndTime">
                      <div>{{ item.user.nickname }}</div>
                      <div>{{ utils.getMonthDay(item.time) }}</div>
                    </div>
                  </div>
                  <div class="right">
                    <span>{{ item.likedCount }}</span>
                    <Icon
                      @click="commentLike(item.commentId, item.liked, item)"
                      name="good-job"
                      class="like"
                      :class="{ active: item.liked }"
                    />
                  </div>
                </div>
                <main>
                  <div class="left">{{ item.content }}</div>
                </main>
              </div>
            </li>
          </ul>
        </div>
      </List>
    </Popup>

    <Field
      v-model="commentInput"
      @keydown.enter="doCommentInput"
      :class="{ active: isShowCommentPlaylist && isShowCommentField }"
      class="commentInput van-hairline--top"
      placeholder="千头万绪，落笔汇成评论一句"
      clearable
    />
  </div>
</template>


<script setup>
import { changeValue } from "@/utils/changeValue.js";
import { getCommentNew, postCommentLike, postComment } from "@/api/playList.js";
import {
  Popup,
  NavBar,
  List,
  Icon,
  Toast,
  Field,
  CellGroup,
  Dialog
} from "vant";

import { ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import utils from '@/utils/index.js'
const props = defineProps(["playlist"]);
const route = useRoute();
const store = useStore();

/* 
  歌单评论部分
*/
// 是否展示弹出框
const isShowCommentPlaylist = ref(false);
watch(isShowCommentPlaylist, () => {
  // 进入评论区影藏底部播放器
  store.commit("setIsShowAppBottom", !isShowCommentPlaylist.value);
});
// List组件下拉刷新
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  getSongListComment();
  loading.value = false;
};
// 分页数据
const commentPlaylistData = reactive({
  pageNo: 1,
  cursor: "",
  // 数据
  comments: []
});
// 展示弹出框
const showCommentPlaylist = () => {
  isShowCommentPlaylist.value = true;
};
// 获取评论数据并交给reactive管理
const getSongListComment = async () => {
  const { data: res } = await getCommentNew({
    type: 2,
    id: route.query.id,
    // 按时间排序
    sortType: 3,
    pageNo: commentPlaylistData.pageNo,
    pageSize: 20,
    cursor: commentPlaylistData.cursor
  });
  commentPlaylistData.pageNo = 2;
  commentPlaylistData.cursor = res.cursor;
  commentPlaylistData.comments.push(...res.comments);
  // console.log(res);
  if (res.hasMore === false) {
    finished.value = true;
  }
};
/* 
  下载功能
*/
const doDownLoad = () => {
  // console.log(utils.downLoad);
  const audio = document.getElementById('playControl_doPlay')
  const downUrl = audio.src
  const fileName = store.state.playlist[store.state.playCurrentIndex].name

  // utils.downLoad(downUrl, fileName)

}

/* 点赞功能
t 是否点赞   1：点赞 0：取消点赞
点完赞后变色 */
const commentUlRef = ref();
const commentLike = async (cid, liked, item) => {
  if (!store.state.isLogin) {
    // 没有登录
    Toast.fail("需要先登录");
    return;
  }
  // 点过赞
  if (liked) {
    const res = await postCommentLike({
      id: route.query.id,
      cid: cid,
      t: 0,
      type: 2
    });
    if (res.data.code === 200) {
      // 取消点赞
      item.liked = false;
      item.likedCount = +item.likedCount - 1;
    }
  } else {
    const res = await postCommentLike({
      id: route.query.id,
      cid: cid,
      t: 1,
      type: 2
    });
    if (res.data.code === 200) {
      // 点赞
      item.liked = true;
      item.likedCount = +item.likedCount + 1;
    }
  }
};
/* 评论 */
const commentInput = ref("");
let delCommentTimeout = null;
// 增加评论
const doCommentInput = async () => {
  if (!store.state.isLogin) {
    // 没有登录
    Toast.fail("需要先登录");
    return;
  }
  const res = await postComment({
    t: 1,
    type: 2,
    id: route.query.id,
    content: commentInput.value
  });
  if (res.data.code === 200) {
    // 评论成功
    commentPlaylistData.comments.unshift(res.data.comment);
    commentInput.value = "";
  }
};
/* 这三个一起 监听手指的长按事件 */
const commentLiStart = (item, e) => {
  delCommentTimeout = setTimeout(() => {
    delComment(item, e);
  }, 500);
};
const commentLiMove = () => {
  clearTimeout(delCommentTimeout);
  delCommentTimeout = null;
};
const commentLiEnd = () => {
  clearTimeout(delCommentTimeout);
  delCommentTimeout = null;
  return false;
};
// 删除评论
const isShowCommentField = ref(true);
const delComment = (target, e) => {
  // 判断是不是自己的评论
  if (target.user.userId !== store.state.userInfo.userId) return;
  isShowCommentField.value = false;
  Dialog.confirm({
    message: "是否删除此评论?"
  })
    .then(async () => {
      // on confirm
      const res = await postComment({
        t: 0,
        type: 2,
        id: route.query.id,
        commentId: target.commentId
      });
      if (res.data.code === 200) {
        // 删除评论成功
        for (let i = 0; i < commentPlaylistData.comments.length; i++) {
          if (commentPlaylistData.comments[i].commentId === target.commentId) {
            commentPlaylistData.comments.splice(i, 1);
            return;
          }
        }
      }
      isShowCommentField.value = true;
    })
    .catch(() => {
      // on cancel
      isShowCommentField.value = true;
    });
};

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
      color: #fff;
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
      // span {
      // color: var(--van-gray-8);
      // }
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
      // color: var(--van-gray-8);
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
.card {
  margin-top: 15px;

  h4 {
    margin-bottom: 5px;
  }
  ul {
    width: 95vw;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 20px;
  }
  .commentPlaylist {
    width: 95vw;
    padding: 10px;
    font-size: 14px;
    margin-bottom: 5px;

    .content {
      .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .left {
          display: flex;
          flex-direction: row;
          align-items: center;
          .nicknameAndTime {
            margin-left: 15px;
            div:nth-child(2) {
              font-size: 12px;
              color: var(--van-gray-8);
            }
          }
        }
        .right span {
          font-size: 12px;
          margin-right: 2px;
        }
        .right .active {
          color: red;
        }
      }
      main {
        // display: flex;
        // justify-content: space-between;
        margin-top: 5px;
        margin-left: 55px;
      }
    }
  }
}
.commentInput {
  width: 95vw;
  position: fixed;
  bottom: 0;
  left: 100vw;
  z-index: 3000;
  transition: all 0.3s linear;
}
.commentInput.active {
  left: 2.34vw;
}
</style>