import { createRouter, createWebHistory } from 'vue-router';
import { obtenerRoles, estaAutenticado } from '../modules/jwt/controlToken.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/indexWeb.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/userWeb.vue'),
      meta: { requiereAuth: true, roles: ['ROLE_ROL_CLIENTE', 'ROLE_ROL_TAXISTA', 'ROLE_ROL_ADMIN'] }
    },
    {
      path: '/trip',
      name: 'Trip',
      component:()=>import("@/views/tripWeb.vue"),
      meta: { requiereAuth: true, roles: ['ROLE_ROL_CLIENTE', 'ROLE_ROL_TAXISTA', 'ROLE_ROL_ADMIN'] }
    },
    {
      path: '/driver',
      name: 'Driver',
      component: () => import('@/views/driverLogin.vue'),
    },
    {
      path: '/driver/dashboard',
      name: 'Driver-Dashboard',
      component: () => import('@/views/driverDashboard.vue'),
      meta: { requiereAuth: true, roles: ['ROLE_ROL_TAXISTA','ROLE_ROL_ADMIN'] }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/adminLogin.vue'),
    },
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/adminDashboard.vue'),
      meta: { requiereAuth: true, roles: ['ROLE_ROL_ADMIN'] }
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiereAuth) {
    if (!estaAutenticado()) {
      next({ name: 'Index' });
    } else {
      const roles = obtenerRoles();
      if (to.meta.roles.some(role => roles.includes(role))) {
        next();
      } else {
        next({ name: 'Index' });
      }
    }
  } else {
    next();
  }
});


export default router;
