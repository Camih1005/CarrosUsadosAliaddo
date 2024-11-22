import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AdminAuto from '../views/AdminAuto.vue'
import Ventas from '../views/VentasAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, 
    },
    {
      path: '/adm/new',
      name: 'adm',
      component: AdminAuto, 
    },
   
    {
      path: '/ventas',
      name: 'ventas',
      component: Ventas, 
    },
    
  ],
})

export default router
