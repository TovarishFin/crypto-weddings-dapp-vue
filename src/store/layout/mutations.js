export const toggleDrawer = state => {
  state.drawerOpen = !state.drawerOpen
}

export const setDrawer = (state, drawerOpen) => {
  state.drawerOpen = drawerOpen
}

export const createNotification = (state, notificationMessage) => {
  state.notificationMessages = [
    ...state.notificationMessages,
    notificationMessage
  ]
  state.notificationOpen = true
}

export const setNotificationOpen = (state, notificationOpen) => {
  state.notificationOpen = notificationOpen
}

export const removeNotification = state => {
  state.notificationMessages = [...state.notificationMessages.splice(1)]
}

export const toggleNotification = state => {
  state.notificationOpen = !state.notificationOpen
}

export const setAccountRequestOpen = (state, accountRequestOpen) => {
  state.accountRequestOpen = accountRequestOpen
}

export const setWeddingInProgressTabs = (state, tabsIndex) => {
  state.weddingInProgressTabs = tabsIndex
}

export const setHasUnlockedAccount = (state, hasUnlockedAccount) => {
  state.hasUnlockedAccount = hasUnlockedAccount
}

export const setShowTransactions = (state, showTransactions) => {
  state.showTransactions = showTransactions
}
