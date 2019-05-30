import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexPersistence from 'vuex-persist'
import stateWatchers from './plugins/stateWatchers'
import route from './route'
import layout from './layout'
import network from './network'
import wallet from './wallet'
import weddingManager from './weddingManager'
import wedding from './wedding'
import contractEvents from './contractEvents'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    layout: state.layout,
    network: state.network,
    wallet: {
      encryptedMnemonic: state.wallet.encryptedMnemonic,
      pathDerivation: state.wallet.pathDerivation
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
    weddingManager,
    wedding,
    contractEvents
  },
  plugins: [stateWatchers, vuexLocal.plugin]
})
