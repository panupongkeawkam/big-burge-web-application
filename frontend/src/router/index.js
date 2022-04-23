import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/manager/login',
    name: 'Login',
    component: () => import('../views/employee/LoginPage.vue')
  },
  {
    path: '/manager/tables',
    name: 'Tables',
    component: () => import('../views/employee/TablesPage.vue')
  },
  {
    path: '/manager/menus',
    name: 'Menus',
    component: () => import('../views/employee/MenusPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router