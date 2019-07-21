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

export const setConfirmTransactionOpen = (state, confirmTransactionOpen) => {
  state.confirmTransactionOpen = confirmTransactionOpen
}

export const setWarningDialogOpen = (state, warningDialogOpen) => {
  state.warningDialogOpen = warningDialogOpen
}

export const setWarningComponent = (state, warningComponent) => {
  state.warningComponent = warningComponent
}

export const setWeddingInProgressTabs = (state, tabsIndex) => {
  state.weddingInProgressTabs = tabsIndex
}

export const setWeddingMarriedTabs = (state, tabsIndex) => {
  state.weddingMarriedTabs = tabsIndex
}

export const setWalletTabs = (state, tabsIndex) => {
  state.walletTabs = tabsIndex
}

export const setSettingsTabs = (state, tabsIndex) => {
  state.settingsTabs = tabsIndex
}

export const setShowTransactions = (state, showTransactions) => {
  state.showTransactions = showTransactions
}

export const setShowParticles = (state, showParticles) => {
  state.showParticles = showParticles
}

export const setUseDarkMode = (state, useDarkMode) => {
  state.useDarkMode = useDarkMode
}

export const setLoading = (state, loading) => {
  state.loading = loading
}
