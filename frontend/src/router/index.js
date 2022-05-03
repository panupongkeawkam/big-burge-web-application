import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios";

Vue.use(VueRouter)

const routes = [
  {
    path: '/manager',
    name: 'Manager',
    meta: { role: 'manager' },
  },
  {
    path: '/manager/login',
    name: 'ManagerLogin',
    meta: { role: 'manager' },
    component: () => import('../views/employee/LoginPage.vue')
  },
  {
    path: '/manager/tables',
    name: 'ManagerTables',
    meta: { role: 'manager' },
    component: () => import('../views/employee/TablesPage.vue')
  },
  {
    path: '/manager/menus',
    name: 'ManagerMenus',
    meta: { role: 'manager' },
    component: () => import('../views/employee/MenusPage.vue')
  },
  {
    path: '/manager/profile',
    name: 'ManagerProfile',
    meta: { role: 'manager' },
    component: () => import('../views/employee/ProfilePage.vue')
  },
  {
    path: '/table/:tableId/home',
    name: 'Home',
    meta: { role: 'customer' },
    component: () => import('../views/customer/HomePage.vue')
  },
  {
    path: '/table/:tableId/menu',
    name: 'Menu',
    meta: { role: 'customer' },
    component: () => import('../views/customer/MenuPage.vue')
  },
  {
    path: '/table/:tableId/order',
    name: 'Order',
    meta: { role: 'customer' },
    component: () => import('../views/customer/OrderPage.vue')
  },
  {
    path: '/table/:tableId/waiting',
    name: 'Waiting',
    meta: { role: 'customer' },
    component: () => import('../views/customer/WaitingPage.vue')
  },
  {
    path: '/table/:tableId/served',
    name: 'Served',
    meta: { role: 'customer' },
    component: () => import('../views/customer/ServedPage.vue')
  },
  {
    path: '/table/:tableId/billing',
    name: 'Billing',
    meta: { role: 'customer' },
    component: () => import('../views/customer/BillingPage.vue')
  },
  {
    path: '/completed',
    name: 'Completed',
    component: () => import('../views/customer/CompletedPage.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.role === 'manager' && to.params.login !== 'required') {
    var token = localStorage.getItem('token')
    await axios
      .get("http://localhost:3000/manager/account", {
        headers: {
          'Authorization': `Roti ${token}`
        }
      })
      .then((res) => {
        var account = res.data.account;
        if (!account) {
          next({ name: 'ManagerLogin', params: { login: 'required' } })
        } else if (to.name === 'Manager' || to.name === 'ManagerLogin') {
          next({ name: 'ManagerTables' })
        }
      })
      .catch(() => {
        next({ name: 'ManagerLogin', params: { login: 'required' } })
      });
    return next()
  }

  if (to.name !== 'NotFound' && (to.meta.role === undefined || to.params.tableId <= 0 || to.params.tableId > 15)) {
    return next({ name: 'NotFound' })
  }

  if (to.meta.role === 'customer') {
    var tableId = to.params.tableId
    axios
      .get(`http://localhost:3000/table/${tableId}/status`)
      .then(res => {
        var status = res.data.status
        if (status === null && to.name !== 'Home' && tableId) {
          next({ name: 'Home', params: { tableId: tableId } })
        } else if (status === 'created' && ['Menu', 'Order'].includes(to.name)) {
          next()
        } else if (status === 'created' && !['Menu', 'Order'].includes(to.name)) {
          next({ name: 'Menu', params: { tableId: tableId } })
        } else if (status === 'pending' && to.name !== 'Waiting') {
          next({ name: 'Waiting', params: { tableId: tableId } })
        } else if (status === 'served' && to.name !== 'Served') {
          next({ name: 'Served', params: { tableId: tableId } })
        } else if (status === 'billing' && to.name !== 'Billing') {
          next({ name: 'Billing', params: { tableId: tableId } })
        } else {
          next()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  next()
})


export default router