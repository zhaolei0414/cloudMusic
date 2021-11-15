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
    path: '/user',
    name: 'User',
    component: User,
  },
  {
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
            beforeEnter: (to, from, next) => {
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
    path: '/listview',
    name: 'ListView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/ListView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search/Search.vue')
  },
  {
    path: '/album',
    name: 'Album',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/albums/Albums.vue')
  },
  {
    path: '/artist',
    name: 'Artist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/artist/Artist.vue')
  },
  {
    path: '/songListCenter',
    name: 'SongListCenter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/SongListCenter/SongListCenter.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
