<template>
  <div class="homelists">
    <nav>
      <div>
        <span class="active">推荐歌单</span>
        <span>丨</span>
        <span>推荐单曲</span>
      </div>
      <span class="more">更多</span>
    </nav>
    <main>
      <ScrollX class="scroll">
        <div class="contain">
          <div class="self">
            <div>
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </div>
            <div>2</div>
            <div>3</div>
          </div>
          <div class="self">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
      </ScrollX>
    </main>
  </div>
</template>

<script setup>
import ScrollX from "@/components/ScrollX.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<style scoped lang='less'>
.homelists {
  nav {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    > span {
      margin-right: 20px;
    }
    div {
      margin-left: 15px;
      span {
        margin-right: 5px;
      }
      span:nth-child(2) {
        color: var(--van-gray-5);
      }
      span.active {
        font-weight: 700;
      }
    }
  }
  main {
    .scroll {
      .contain {
        display: flex;
        .self {
          display: flex;
          width: 100vw;
          div {
            width: 33.3vw;
          }
        }
      }
    }
  }
}
</style>