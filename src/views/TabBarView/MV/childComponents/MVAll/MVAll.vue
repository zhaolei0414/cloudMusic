<template>
  <div>
    <Tabs v-model:active="area" @change="doAreaChange" line-height="2px">
      <Tab title="全部" name="全部" />
      <Tab title="内地" name="内地" />
      <Tab title="港台" name="港台" />
      <Tab title="欧美" name="欧美" />
      <Tab title="日本" name="日本" />
      <Tab title="韩国" name="韩国" />
    </Tabs>
    <Tabs v-model:active="type" @change="doTypeChange" line-height="1px">
      <Tab title="全部" name="全部" />
      <Tab title="官方版" name="官方版" />
      <Tab title="现场版" name="现场版" />
    </Tabs>
    <Tabs v-model:active="order" line-height="1px">
      <Tab title="上升最快" name="上升最快">
        <List
          v-model:loading="loading1"
          :finished="finished1"
          finished-text="没有更多了"
          @load="onLoad1"
        >
          <ul>
            <li
              v-for="item in data.view1"
              :key="item.id"
              @click="$router.push(`/mvview?id=${item.id}`)"
              class="liItem"
            >
              <div class="pic">
                <van-image :src="item.cover" width="45vw" height="15vh" radius="10px" />
              </div>
              <div class="msg">
                <div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
                <div class="author van-ellipsis">{{ item.artistName }}</div>
              </div>
            </li>
          </ul>
        </List>
      </Tab>
      <Tab title="最热" name="最热">
        <List
          v-model:loading="loading2"
          :finished="finished2"
          finished-text="没有更多了"
          @load="onLoad2"
        >
          <ul>
            <li
              v-for="item in data.view2"
              :key="item.id"
              @click="$router.push(`/mvview?id=${item.id}`)"
              class="liItem"
            >
              <div class="pic">
                <van-image :src="item.cover" width="45vw" height="15vh" radius="10px" />
              </div>
              <div class="msg">
                <div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
                <div class="author van-ellipsis">{{ item.artistName }}</div>
              </div>
            </li>
          </ul>
        </List>
      </Tab>
      <Tab title="最新" name="最新">
        <List
          v-model:loading="loading3"
          :finished="finished3"
          finished-text="没有更多了"
          @load="onLoad3"
        >
          <ul>
            <li
              v-for="item in data.view3"
              :key="item.id"
              @click="$router.push(`/mvview?id=${item.id}`)"
              class="liItem"
            >
              <div class="pic">
                <van-image :src="item.cover" width="45vw" height="15vh" radius="10px" />
              </div>
              <div class="msg">
                <div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
                <div class="author van-ellipsis">{{ item.artistName }}</div>
              </div>
            </li>
          </ul>
        </List>
      </Tab>
    </Tabs>
  </div>
</template>

<script setup>
import { Tab, Tabs, List, Cell } from "vant";
import { reactive, ref } from "vue";
import { getMVAll } from "@/api/mv.ts";
// 国家
const area = ref("全部");
// 类型
const type = ref("全部");
const order = ref("上升最快");

const data = reactive({
  view1: [],
  offset1: 0,
  view2: [],
  offset2: 0,
  view3: [],
  offset3: 0
});
const loading1 = ref(false);
const finished1 = ref(false);
const onLoad1 = () => {
  getMV(data.offset1).then(res => {
    data.offset1 += 30;
    if (res.hasMore === false) {
      finished1.value = true;
    } else {
      loading1.value = false;
    }
  });
};

const loading2 = ref(false);
const finished2 = ref(false);
const onLoad2 = () => {
  getMV(data.offset2).then(res => {
    data.offset2 += 30;
    if (res.hasMore === false) {
      finished2.value = true;
    } else {
      loading2.value = false;
    }
  });
};

const loading3 = ref(false);
const finished3 = ref(false);
const onLoad3 = () => {
  getMV(data.offset3).then(res => {
    data.offset3 += 30;
    if (res.hasMore === false) {
      finished3.value = true;
    } else {
      loading3.value = false;
    }
  });
};

const doAreaChange = () => {
  for (let item in data) {
    if (/offset/.test(item)) {
      data[item] = 0;
    }
  }
  for (let item in data) {
    if (/view/.test(item)) {
      data[item] = [];
    }
  }
  getMV();
};
const doTypeChange = () => {
  for (let item in data) {
    if (/offset/.test(item)) {
      data[item] = 0;
    }
  }
  for (let item in data) {
    if (/view/.test(item)) {
      data[item] = [];
    }
  }
  getMV();
};

const getMV = offset => {
  return new Promise((resolve, reject) => {
    getMVAll({
      area: area.value,
      type: type.value,
      order: order.value,
      offset: offset
    }).then(res => {
      // console.log(res);
      if (order.value === "上升最快") {
        data.view1.push(...res.data);
        resolve(res);
      } else if (order.value === "最热") {
        data.view2.push(...res.data);
        resolve(res);
      } else {
        data.view3.push(...res.data);
        resolve(res);
      }
    });
  });
};
</script>

<style scoped lang='less'>
ul {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  justify-content: space-evenly;
}
.liItem {
  width: 45vw;
  height: 185px;
  .msg {
    .title {
      font-size: 14px;
    }
    .author {
      font-size: 12px;
    }
  }
}
</style>