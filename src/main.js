import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant 全局组件

import { Image as VanImage, Toast } from 'vant';


const app = createApp(App).use(store).use(router).use(VanImage)
app.mount('#app')
