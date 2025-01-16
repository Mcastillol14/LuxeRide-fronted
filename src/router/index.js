import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
     path: '/registro',
     name: 'registro',
     component: () => import('../modules/user/components/registerUser.vue'),
   },
   {
    path: '/login',
    name: 'login',
    component: () => import('../modules/user/components/loginUser.vue'),
  }
  ],

})

export default router
