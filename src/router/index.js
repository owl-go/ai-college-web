import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Recommendation from '@/views/Recommendation.vue'
import SchoolDetail from '@/views/SchoolDetail.vue'
import Wishlist from '@/views/Wishlist.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/recommendation',
    name: 'Recommendation',
    component: Recommendation
  },
  {
    path: '/school/:id',
    name: 'SchoolDetail',
    component: SchoolDetail
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
