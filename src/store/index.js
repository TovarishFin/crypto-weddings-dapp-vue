import Vue from 'vue'
import { pathOr, dissocPath } from 'ramda'
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
    layout: dissocPath(
      ['confirmTransactionOpen'],
      dissocPath(['accountRequestOpen'], pathOr({}, ['layout'], state))
    ),
    network: pathOr({}, ['network'], state),
    wallet: {
      encryptedMnemonic: pathOr(null, ['wallet', 'encryptedMnemonic'], state),
      pathDerivation: pathOr(null, ['wallet', 'pathDerivation'], state)
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
