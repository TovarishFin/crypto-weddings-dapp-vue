export const toggleDrawer = ({ commit }) => {
  commit('toggleDrawer')
}

export const setDrawer = ({ commit }, drawerOpen) => {
  commit('setDrawer', drawerOpen)
}

export const createNotification = ({ commit }, notificationMessage) => {
  commit('createNotification', notificationMessage)
}

export const setNotificationOpen = ({ commit }, notificationOpen) => {
  commit('setNotificationOpen', notificationOpen)
}

export const dismissNotification = ({ commit, getters }) => {
  commit('removeNotification')
  const { messagesLength } = getters

  if (messagesLength) {
    commit('toggleNotification')
  }

  commit('toggleNotification')
}

export const setWeb3RequestOpen = ({ commit }, web3RequestOpen) => {
  commit('setWeb3RequestOpen', web3RequestOpen)
}

export const setHideTokenDepositWarnings = ({ commit }, hide) => {
  commit('setHideTokenDepositWarnings', hide)
}

export const setHideEtherDepositWarnings = ({ commit }, hide) => {
  commit('setHideEtherDepositWarnings', hide)
}

export const setHomeTabs = ({ commit }, tabIndex) => {
  commit('setHomeTabs', tabIndex)
}

export const setBankTabs = ({ commit }, tabIndex) => {
  commit('setBankTabs', tabIndex)
}

export const setAccountTabs = ({ commit }, tabIndex) => {
  commit('setAccountTabs', tabIndex)
}

export const setHasGrantedWeb3Access = ({ commit }, hasGrantedWeb3Access) => {
  commit('setHasGrantedWeb3Access', hasGrantedWeb3Access)
}

export const setShowTransactions = ({ commit }, showTransactions) => {
  commit('setShowTransactions', showTransactions)
}
