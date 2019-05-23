import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexPersistence from 'vuex-persist'
import stateWatchers from './plugins/stateWatchers'
import route from './route'
import layout from './layout'
import network from './network'
import wallet from './wallet'
import weddingManager from './weddingManager'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    layout: state.layout,
    wallet: {
      encryptedMnemonic: state.wallet.encryptedMnemonic
    }
  })
})

export default new Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    route,
    layout,
    network,
    wallet,
    weddingManager
  },
  plugins: [stateWatchers, vuexLocal.plugin]
})
