import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const loadPage = async importPromise => {
  store.commit('setLoading', true)
  const component = await importPromise
  store.commit('setLoading', false)

  return component
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => loadPage(import('@/components/pages/Home.vue'))
    },
    {
      path: '/about',
      name: 'About',
      component: () => loadPage(import('@/components/pages/About.vue'))
    },
    {
      path: '/help',
      name: 'Help',
      component: () => loadPage(import('@/components/pages/Help.vue'))
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: () => loadPage(import('@/components/pages/Wallet.vue'))
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => loadPage(import('@/components/pages/Settings.vue'))
    },
    {
      path: '/get-married',
      name: 'Get married',
      component: () => loadPage(import('@/components/pages/GetMarried.vue'))
    },
    {
      path: '/wedding/:address',
      name: 'Wedding',
      component: () => loadPage(import('@/components/pages/Wedding.vue'))
    },
    {
      path: '/synthwave',
      name: 'Synthwave',
      component: () => loadPage(import('@/components/pages/Synthwave.vue'))
    },
    {
      path: '*',
      name: 'Not Found',
      component: () => loadPage(import('@/components/layout/NotFound.vue'))
    }
  ]
})
