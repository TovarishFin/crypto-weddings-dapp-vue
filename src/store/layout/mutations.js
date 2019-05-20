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

export const setWeb3RequestOpen = (state, web3RequestOpen) => {
  state.web3RequestOpen = web3RequestOpen
}

export const setHideTokenDepositWarnings = (state, hide) => {
  state.hideTokenDepositWarnings = hide
}

export const setHideEtherDepositWarnings = (state, hide) => {
  state.hideEtherDepositWarnings = hide
}

export const setHomeTabs = (state, tabsIndex) => {
  state.homeTabs = tabsIndex
}

export const setBankTabs = (state, tabsIndex) => {
  state.bankTabs = tabsIndex
}

export const setAccountTabs = (state, tabsIndex) => {
  state.accountTabs = tabsIndex
}

export const setHasGrantedWeb3Access = (state, hasGrantedWeb3Access) => {
  state.hasGrantedWeb3Access = hasGrantedWeb3Access
}

export const setShowTransactions = (state, showTransactions) => {
  state.showTransactions = showTransactions
}
