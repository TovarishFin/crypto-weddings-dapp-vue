import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexPersistence from 'vuex-persist'
import network from './network'
import wallet from './wallet'
import layout from './layout'
import route from './route'
import stateWatchers from './plugins/stateWatchers'

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
    network,
    layout,
    wallet,
    route
  },
  plugins: [stateWatchers, vuexLocal.plugin]
})
