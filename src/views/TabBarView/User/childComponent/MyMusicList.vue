<template>
  <!-- 我喜欢的音乐 -->
  <Card @click="routerPushListView" class="card2">
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin1-copy" />
      </svg>
    </div>
    <div>
      <div class="title">我喜欢的音乐</div>
      <span>{{ count }} 首</span>
    </div>
  </Card>
</template>

<script setup>
import Card from "@/components/Card.vue";
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
const router = useRouter()
const props = defineProps({
  count: {
    type: Number
  },
  id: {
    type: Number,
    default: 0
  }
})
const id = ref(0)
watch(() => props.id, (current, prev) => {
  id.value = current
})
const routerPushListView = () => {
  if (id.value != 0) {
    router.push({
      name: 'ListView',
      query: {
        id: id.value
      }
    })
  } else {
    Toast.resetDefaultOptions()
    Toast('请先登录')
  }
}
</script>

<style lang="less"   scoped>
.card2 {
  display: flex;
  align-items: center;
  > div:first-child {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 10px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      color: #fff;
    }
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    span {
      font-size: 12px;
    }
  }
}
</style>