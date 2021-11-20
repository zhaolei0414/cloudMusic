<template>
  <div>
    <Tabs v-model:active="area" @change="doAreaChange" line-height="2px">
      <Tab title="全部" name="全部">
        <List
          v-model:loading="data.loading1"
          :finished="data.finished1"
          finished-text="没有更多了"
          @load="onLoad1"
        >
          <ul>
            <li
              v-for="(item, index) in data.all"
              :key="item.id"
              @click="$router.push(`/mvview?id=${item.id}`)"
            >
              <div class="left">
                <van-image :src="item.cover" width="30vw" height="10vh" radius="10px" />
              </div>
              <div class="right">
                <div class="title">{{ item.name }}</div>
                <Tag v-if="item.playCount >= 1000000" type="warning">百万播放</Tag>
                <div class="artist">{{ item.artists[0].name }}</div>
              </div>
            </li>
          </ul>
        </List>
      </Tab>
      <Tab title="内地" name="内地">
        <List
          v-model:loading="data.loading2"
          :finished="data.finished2"
          finished-text="没有更多了"
          @load="onLoad2"
        >
          <ul>
            <li
              v-for="(item, index) in data.neidi"
              :key="item.id"
              @click="$router.push(`/mvview?id=${item.id}`)"
            >
              <div class="left">
                <van-image :src="item.cover" width="30vw" height="10vh" radius="10px" />
              </div>
              <div class="right">
                <div class="title">{{ item.name }}</div>
                <Tag v-if="item.playCount >= 1000000" type="warning">百万播放</Tag>
                <div class="artist">{{ item.artists[0].name }}</div>
              </div>
            </li>
          </ul>
        </List>
      </Tab>
      <Tab title="港台" name="港台">
        <List
          v-model:loading="data.loading3"
          :finished="data.finished3"
          finished-text="没有更多了"
          @load="onLoad3"
        >
          <ul>
            <li
              v-for="(item, index) in data.gangtai"
              :key="item.id"
              @click="$router.push(`/mvview?id=${item.id}`)"
            >
              <div class="left">
                <van-image :src="item.cover" width="30vw" height="10vh" radius="10px" />
              </div>
              <div class="right">
                <div class="title">{{ item.name }}</div>
                <Tag v-if="item.playCount >= 1000000" type="warning">百万播放</Tag>
                <div class="artist">{{ item.artists[0].name }}</div>
              </div>
            </li>
          </ul>
        </List>
      </Tab>
      <Tab title="欧美" name="欧美">
        <List
          v-model:loading="data.loading4"
          :finished="data.finished4"
          finished-text="没有更多了"
          @load="onLoad4"
        >
          <ul>
            <li
              v-for="(item, index) in data.euro"
              :key="item.id"
              @click="$router.push(`/mvview?id=${item.id}`)"
            >
              <div class="left">
                <van-image :src="item.cover" width="30vw" height="10vh" radius="10px" />
              </div>
              <div class="right">
                <div class="title">{{ item.name }}</div>
                <Tag v-if="item.playCount >= 1000000" type="warning">百万播放</Tag>
                <div class="artist">{{ item.artists[0].name }}</div>
              </div>
            </li>
          </ul>
        </List>
      </Tab>
      <Tab title="日本" name="日本">
        <List
          v-model:loading="data.loading5"
          :finished="data.finished5"
          finished-text="没有更多了"
          @load="onLoad5"
        >
          <ul>
            <li
              v-for="(item, index) in data.japan"
              :key="item.id"
              @click="$router.push(`/mvview?id=${item.id}`)"
            >
              <div class="left">
                <van-image :src="item.cover" width="30vw" height="10vh" radius="10px" />
              </div>
              <div class="right">
                <div class="title">{{ item.name }}</div>
                <Tag v-if="item.playCount >= 1000000" type="warning">百万播放</Tag>
                <div class="artist">{{ item.artists[0].name }}</div>
              </div>
            </li>
          </ul>
        </List>
      </Tab>
    </Tabs>
  </div>
</template>

<script setup>
import { getMVFirst } from '@/api/mv.js';
import { Tab, Tabs, List, Tag } from "vant";
import { ref, reactive } from 'vue'
const area = ref('全部')
const data = reactive({
  // 全部
  all: [],
  loading1: false,
  finished1: false,
  limit1: 10,
  length1: 0,
  // 内地
  neidi: [],
  loading2: false,
  finished2: false,
  limit2: 10,
  length2: 0,
  // 港台
  gangtai: [],
  loading3: false,
  finished3: false,
  limit3: 10,
  length3: 0,
  // 欧美
  euro: [],
  loading4: false,
  finished4: false,
  limit4: 10,
  length4: 0,
  // 日本
  japan: [],
  loading5: false,
  finished5: false,
  limit5: 10,
  length5: 0,
  // 韩国
  koia: [],
  loading6: false,
  finished6: false,
  limit6: 10,
  length6: 0,
})
const onLoad1 = () => {
  getData()
}
const onLoad2 = () => {
  getData()
}
const onLoad3 = () => {
  getData()
}
const onLoad4 = () => {
  getData()
}
const onLoad5 = () => {
  getData()
}
const getData = () => {
  if (area.value === '全部') {
    area.value = ''
    getMVFirst({
      area: area.value,
      limit: data.limit1
    }).then(res => {
      data.all = res.data
      data.limit1 += 10
      if (data.length1 === res.data.length) {
        data.finished1 = true
        return
      } else {
        data.length1 = res.data.length
        data.loading1 = false
      }

    })
  } else if (area.value === '内地') {
    getMVFirst({
      area: area.value,
      limit: data.limit1
    }).then(res => {
      data.neidi = res.data
      data.limit2 += 10
      if (data.length2 === res.data.length) {
        data.finished2 = true
        return
      } else {
        data.length2 = res.data.length
        data.loading2 = false
      }

    })
  } else if (area.value === '港台') {
    getMVFirst({
      area: area.value,
      limit: data.limit3
    }).then(res => {
      data.gangtai = res.data
      data.limit3 += 10
      if (data.length3 === res.data.length) {
        data.finished3 = true
        return
      } else {
        data.length3 = res.data.length
        data.loading3 = false
      }

    })
  } else if (area.value === '欧美') {
    getMVFirst({
      area: area.value,
      limit: data.limit4
    }).then(res => {
      data.euro = res.data
      data.limit4 += 10
      if (data.length4 === res.data.length) {
        data.finished4 = true
        return
      } else {
        data.length4 = res.data.length
        data.loading4 = false
      }

    })
  } else if (area.value === '日本') {
    getMVFirst({
      area: area.value,
      limit: data.limit5
    }).then(res => {
      console.log(res.data);
      data.japan = res.data
      data.limit5 += 10
      if (data.length5 === res.data.length) {
        data.finished5 = true
        return
      } else {
        data.length5 = res.data.length
        data.loading5 = false
      }

    })
  }
}

const doAreaChange = () => {
  // console.log(area.value);
}
</script>

<style scoped lang='less'>
li {
  width: 100vw;
  display: flex;
  margin: 15px 0;
  .right {
    margin-left: 15px;
    .title {
      font-weight: 600;
    }
    .artist {
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>