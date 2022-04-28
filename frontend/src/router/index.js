import Vue from 'vue'
import VueRouter from 'vue-router'
// import axios from "axios";

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
    name: 'Home',
    component: () => import('../views/customer/HomePage.vue')
  },
  {
    path: '/table/:tableId/menu',
    name: 'Menu',
    component: () => import('../views/customer/MenuPage.vue')
  },
  {
    path: '/table/:tableId/order',
    name: 'Order',
    component: () => import('../views/customer/OrderPage.vue')
  },
  {
    path: '/table/:tableId/waiting',
    name: 'Waiting',
    component: () => import('../views/customer/WaitingPage.vue')
  },
  {
    path: '/table/:tableId/served',
    name: 'Served',
    component: () => import('../views/customer/ServedPage.vue')
  },
  {
    path: '/table/:tableId/billing',
    name: 'Billing',
    component: () => import('../views/customer/BillingPage.vue')
  },
  {
    path: '/completed',
    name: 'Completed',
    component: () => import('../views/customer/CompletedPage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  console.log('from: \n', from)
  console.log('to: \n', to)

  var managerPath = ['ManagerLogin', 'ManagerTables', 'ManagerMenus', 'ManagerProfile']
  if (managerPath.includes(to.name) || to.query.login === 'required') { // second condition for test
    return next()
  }

  next()

  // var tableId = to.params.tableId
  // axios
  //   .get(`http://localhost:3000/table/${tableId}/status`)
  //   .then(res => {
  //     var token = localStorage.getItem('token')
  //     if (!token) {
  //       return next({ name: 'Home', params: { tableId: tableId }, query: { login: 'required' } })
  //     }

  //     var status = res.data.status
  //     if (status === null && to.name !== 'Home' && tableId) {
  //       next({ name: 'Home', params: { tableId: tableId } })
  //     } else if (status === 'created' && ['Menu', 'Order'].includes(to.name)) {
  //       next()
  //     } else if (status === 'created' && !['Menu', 'Order'].includes(to.name)) {
  //       next({ name: 'Menu', params: { tableId: tableId } })
  //     } else if (status === 'pending' && to.name !== 'Waiting') {
  //       next({ name: 'Waiting', params: { tableId: tableId } })
  //     } else if (status === 'served' && to.name !== 'Served') {
  //       next({ name: 'Served', params: { tableId: tableId } })
  //     } else if (status === 'billing' && to.name !== 'Billing') {
  //       next({ name: 'Billing', params: { tableId: tableId } })
  //     } else {
  //       next()
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
})


export default router