<template>
  <div>
    <NavBar
      title="歌单广场"
      @click-left="$router.go(-1)"
      left-arrow
      fixed
      placeholder
    />
    <Tabs
      v-model:active="active"
      @click-tab="onClickTab"
      animated
      sticky
      offset-top="46px"
    >
      <Tab title="推荐">
        <TabView :cat="currentTabTitle" />
      </Tab>
      <Tab title="排行榜">
        <TabView :cat="currentTabTitle" />
      </Tab>
      <Tab title="精品">
        <TabView :cat="currentTabTitle" />
      </Tab>
      <Tab title="华语"> <TabView :cat="currentTabTitle" /> </Tab>
      <Tab title="流行"> <TabView :cat="currentTabTitle" /> </Tab>
      <Tab title="欧美"> <TabView :cat="currentTabTitle" /> </Tab>
      <Tab title="古风"> <TabView :cat="currentTabTitle" /> </Tab>
    </Tabs>
  </div>
</template>

<script setup>
import { NavBar, Tab, Tabs } from "vant";
import TabView from "./childComponents/TabView.vue";
import { ref } from "vue";
const active = ref(0);
const currentTabTitle = ref("推荐");
const onClickTab = title => {
  currentTabTitle.value = title.title;
};
</script>

<style>
</style>