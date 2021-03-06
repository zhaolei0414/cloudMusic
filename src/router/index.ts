import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/TabBarView/User/User.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    // 我的
    path: '/user',
    name: 'User',
    component: User,
  },
  {
    // dj
    path: '/dj',
    name: 'DJ',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '@/views/TabBarView/DJ/DJ.vue')
  },
  {
    // mv
    path: '/mv',
    name: 'MV',
    meta: {
      keepAlive: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '@/views/TabBarView/MV/MV.vue')
  },
  {
    // 登录
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/Login/Login.vue'),
    children: [
      {
        path: 'mobile',
        name: 'Mobile',
        component: () => import('../views/Login/childComponents/Mobile.vue'),
        children: [
          {
            path: 'captcha',
            name: 'Captcha',
            component: () => import('../views/Login/childComponents/Captcha.vue'),
            beforeEnter: (to: any, from: any, next: any) => {
              // ...
              if (to.path === '/login/mobile/captcha' && to.query.phone) {
                next()
              } else {
                next({
                  name: 'Login'
                })
              }
            }
          },
          {
            path: 'phonePassword',
            name: 'PhonePassword',
            component: () => import('../views/Login/childComponents/PhonePassword.vue')
          }
        ]
      },
      {
        path: 'email',
        name: 'EMail',
        component: () => import('../views/Login/childComponents/EMail.vue')
      }
    ]
  },
  {
    // 歌单
    path: '/listview',
    name: 'ListView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/ListView.vue')
  },
  {
    // 搜索页面
    path: '/search',
    name: 'Search',
    component: () => import('../views/search/Search.vue')
  },
  {
    // 专辑
    path: '/album',
    name: 'Album',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/albums/Albums.vue')
  },
  {
    // 歌手页面
    path: '/artist',
    name: 'Artist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/artist/Artist.vue')
  },
  {
    // 歌单广场
    path: '/songListCenter',
    name: 'SongListCenter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/SongListCenter/SongListCenter.vue')
  },
  {
    // 视频
    path: '/mvview',
    name: 'MVView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/MV/MV.vue')
  },
  {
    // 电台
    path: '/djview',
    name: 'DJView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/DJ/DJView/DJView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
