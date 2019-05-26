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

export const setWeddingInProgressTabs = ({ commit }, tabIndex) => {
  commit('setWeddingInProgressTabs', tabIndex)
}

export const setHasUnlockedAccount = ({ commit }, hasUnlockedAccount) => {
  commit('setHasUnlockedAccount', hasUnlockedAccount)
}

export const setShowTransactions = ({ commit }, showTransactions) => {
  commit('setShowTransactions', showTransactions)
}
