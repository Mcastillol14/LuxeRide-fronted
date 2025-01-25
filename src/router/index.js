import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/indexWeb.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/userWeb.vue')
    }

  ],

})

export default router
