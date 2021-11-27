<template>
  <div>视频</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getMVDetail } from "@/api/mv.ts";
const route = useRoute();
const id = route.query.id;
getMVDetail(id).then(res => {
  console.log(res);
});
</script>

<style>
</style>