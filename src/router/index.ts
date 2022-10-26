import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';
const Home = () => import("@/Pages/Home.vue");
const List = () => import("@/Pages/List.vue");

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;