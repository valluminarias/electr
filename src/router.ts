import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';
const Home = () => import("@/Pages/Home.vue");

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Home
    }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;