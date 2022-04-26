import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/manager/login',
    name: 'ManagerLogin',
    component: () => import('../views/employee/LoginPage.vue')
  },
  {
    path: '/manager/tables',
    name: 'ManagerTables',
    component: () => import('../views/employee/TablesPage.vue')
  },
  {
    path: '/manager/menus',
    name: 'ManagerMenus',
    component: () => import('../views/employee/MenusPage.vue')
  },
  {
    path: '/manager/profile',
    name: 'ManagerProfile',
    component: () => import('../views/employee/ProfilePage.vue')
  },
  {
    path: '/table/:tableId/home',
    component: () => import('../views/customer/HomePage.vue')
  },
  {
    path: '/table/:tableId/menu',
    component: () => import('../views/customer/MenuPage.vue')
  },
  {
    path: '/table/:tableId/order',
    component: () => import('../views/customer/OrderPage.vue')
  },
  {
    path: '/table/:tableId/waiting',
    component: () => import('../views/customer/WaitingPage.vue')
  },
  {
    path: '/table/:tableId/served',
    component: () => import('../views/customer/ServedPage.vue')
  },
  {
    path: '/completed',
    component: () => import('../views/customer/CompletedPage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if (from.path === '/' && to.name === 'ManagerTables') {
  //   return router.push('/manager/login')
  // }
  console.log('from: \n', from)
  console.log('to: \n', to)
  if (to) {
    next()
  }
})

export default router