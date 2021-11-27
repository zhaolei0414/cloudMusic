<template>
  <!-- topnav -->
  <nav class="listViewTopNav">
    <van-image :src="data.detail.coverUrl" class="backgroundImg" height="0.8rem" />
    <div class="left">
      <div @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou" />
        </svg>
      </div>
    </div>
    <div class="title">电台</div>
    <div class="right">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo" />
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao" />
      </svg>
    </div>
  </nav>
  <Loading v-if="isLoading" vertical />
  <main v-else>
    <!-- 背景图 -->
    <van-image :src="data.detail.coverUrl" class="backgroundImg" />
    <!-- 详情 -->
    <div class="detail">
      <van-image :src="data.detail.coverUrl" width="30vw" height="30vw" radius="2vw" />
      <div class="info">
        <div class="title">{{ data.detail.name }}</div>
        <div class="category">{{ data.detail.categoryName }}</div>
        <div class="description van-multi-ellipsis--l3">{{ data.detail.description }}</div>
      </div>
    </div>
    <!-- 点赞，评论，收藏 -->
    <div class="utils">
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianzan_kuai" />
        </svg>
      </span>
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun1" />
        </svg>
      </span>
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanfa" />
        </svg>
      </span>
    </div>
    <!-- 下拉刷新list -->

    <List v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <CellGroup>
        <Cell v-for="(item, index) in data.programs" :key="item.id" @click="onCellClick(index)">
          <template #icon>
            <van-image :src="item.coverUrl" width="15vw" height="15vw" radius="2vw" />
          </template>
          <template #value class="right">
            <div class="title">{{ item.name }}</div>
            <div class="description van-multi-ellipsis--l2">{{ item.description }}</div>
          </template>
        </Cell>
      </CellGroup>
    </List>
  </main>
</template>

<script setup>
import { getDJProgram, getDJDetail } from '@/api/dj.ts'
import { Loading, List, Cell, CellGroup } from 'vant';
import { useRoute } from 'vue-router';
import { reactive, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
const route = useRoute()
const store = useStore()
const id = route.query.id
const isLoading = ref(true)
const data = reactive({
  // `limit` : 返回数量 , 默认为 30
  limit: 20,
  // `offset` : 偏移数量，用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0
  offset: 0,
  // `asc` : 排序方式,默认为 `false` (新 => 老 ) 设置 `true` 可改为 老 => 新
  asc: false,
  programs: [],
  detail: {
    coverUrl: '',
    name: '',
    categoryName: '',
    description: ''
  }
})
// 这个接口现在可能无法获取电台详情信息
getDJDetail(id)
  .then(res => {
    console.log(res);


    data.detail = res.program
    nextTick(() => isLoading.value = false)
  })
  .catch(err => {
    // 大部分数据现在获取不到信息 404 
    // 那么取第一个电台数据
    getDJProgram({
      rid: id,
      limit: 1
    }).then(res => {
      data.detail = res.programs[0]
      nextTick(() => isLoading.value = false)
    })
  })

const getData = () => {
  return new Promise((resolve, reject) => {
    getDJProgram({
      rid: id,
      limit: data.limit,
      offset: data.offset,
      asc: data.asc
    }).then(res => {
      data.programs.push(...res.programs)
      data.offset += 1
      resolve(res)
    })
  })
}
// 上划加载
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  getData().then(res => {
    console.log(res);
    res.programs.forEach(item => {
      item.al = {}
      item.al.picUrl = item.coverUrl
      item.al.name = item.radio.name
      item.al.id = item.radio.id
    });
    if (res.more === false) {
      finished.value = true
    } else {
      loading.value = false
    }

  })
}
// cell 点击事件
const onCellClick = (index) => {
  store.commit("setPlaylist", data.programs)
}
</script>

<style lang='less' scoped>
.listViewTopNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
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
    margin: 0 15px;
    .icon:first-child {
      margin-right: 20px;
    }
  }
}
.backgroundImg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 30vh;
  filter: blur(30px);
  z-index: -1;
}
.detail {
  width: 95vw;
  margin: 0 auto;
  height: 180px;
  display: flex;
  align-items: center;
  gap: 15px 15px;
  .info {
    height: 112.5px;
    flex: 1;
    color: #fff;
    > div {
      padding-bottom: 3px;
    }
    .category {
      color: var(--van-gray-7);
      font-size: 12px;
    }
    .description {
      color: var(--van-gray-7);
      font-size: 14px;
    }
  }
}
.utils {
  width: 40vw;
  height: 5vh;
  margin: 15px auto;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
}
.title {
  margin-left: 15px;
  font-weight: 700;
  font-size: 16px;
}
.description {
  margin-left: 15px;
  font-size: 12px;
}
</style>