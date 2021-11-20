<template>
  <div>
    <TopNav>
      <template #right>
        <svg
          @click="
            $router.push({
              name: 'Search'
            })
          "
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-sousuo" />
        </svg>
      </template>
    </TopNav>
    <Tabs v-model:active="active" swipeable animated sticky offset-top="40px">
      <Tab title="推荐">
        <PersonalizedMV />
      </Tab>
      <Tab title="全部">
        <MVAll />
      </Tab>
      <Tab title="最新">
        <First />
      </Tab>
      <Tab title="网易出品">
        <Exclusive />
      </Tab>
    </Tabs>
  </div>
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";
import PersonalizedMV from "./childComponents/PersonalizedMV.vue";
import MVAll from "./childComponents/MVAll/MVAll.vue";
import First from './childComponents/First/First.vue'
import Exclusive from './childComponents/Exclusive/Exclusive.vue'
import { Tab, Tabs } from "vant";
import { ref } from "vue";
import { useStore } from "vuex";
// 激活的标签页
const active = ref(1);
const store = useStore();
</script>


<style scoped>
</style>