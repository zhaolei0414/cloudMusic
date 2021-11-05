import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
        component: () => import('../views/Login/childComponents/Mobile.vue')
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
