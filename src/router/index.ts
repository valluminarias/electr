import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'
const Home = () => import('@/Pages/Home.vue')
const List = () => import('@/Pages/List.vue')
const About = () => import('@/Pages/About.vue')
const Setting = () => import('@/Pages/Setting.vue')
const ReadingDetail = () => import('@/Pages/ReadingDetail.vue')
const EditReading = () => import('@/Pages/EditReading.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/list',
    component: List,
  },
  {
    path: '/readings/:key',
    component: ReadingDetail,
  },
  {
    path: '/readings/:key/edit',
    component: EditReading,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/settings',
    component: Setting,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
