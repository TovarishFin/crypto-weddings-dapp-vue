import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/pages/Home.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/components/pages/About.vue')
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: () => import('@/components/pages/Wallet.vue')
    },
    {
      path: '/get-married',
      name: 'Get married',
      component: () => import('@/components/pages/GetMarried.vue')
    },
    {
      path: '/wedding/:address',
      name: 'Wedding',
      component: () => import('@/components/pages/Wedding.vue')
    },
    {
      path: '*',
      name: 'Not Found',
      component: () => import('@/components/layout/NotFound.vue')
    }
  ]
})
