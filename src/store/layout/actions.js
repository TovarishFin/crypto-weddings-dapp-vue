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

export const setAccountRequestOpen = ({ commit }, accountRequestOpen) => {
  commit('setAccountRequestOpen', accountRequestOpen)
}

export const setConfirmTransactionOpen = (
  { commit },
  confirmTransactionOpen
) => {
  commit('setConfirmTransactionOpen', confirmTransactionOpen)
}

export const setWeddingInProgressTabs = ({ commit }, tabsIndex) => {
  commit('setWeddingInProgressTabs', tabsIndex)
}

export const setWalletTabs = ({ commit }, tabsIndex) => {
  commit('setWalletTabs', tabsIndex)
}

export const setShowTransactions = ({ commit }, showTransactions) => {
  commit('setShowTransactions', showTransactions)
}
