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

export const warnUser = ({ commit }, warningComponent) => {
  commit('setWarningComponent', warningComponent)
  commit('setWarningDialogOpen', true)
}

export const checkConfirmableTransactions = ({ commit, rootGetters }) => {
  const { pendingAction } = rootGetters
  pendingAction
    ? commit('setConfirmTransactionOpen', true)
    : commit('setConfirmTransactionOpen', false)
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

export const watchNotifications = ({ getters, commit }) => {
  setInterval(() => {
    const { notificationMessage } = getters
    if (notificationMessage) {
      commit('removeNotification')
      commit('setNotificationOpen', false)
      const { notificationMessage: newMessage } = getters

      if (newMessage) {
        setTimeout(() => commit('setNotificationOpen', true), 500)
      }
    }
  }, 7000)
}
