export const drawerOpen = state => state.drawerOpen

export const notificationOpen = state => state.notificationOpen

export const notificationMessage = state => state.notificationMessages[0]

export const web3RequestOpen = state => state.web3RequestOpen

export const messagesLength = state => state.notificationMessages.length

export const hideTokenDepositWarnings = state => state.hideTokenDepositWarnings

export const hideEtherDepositWarnings = state => state.hideEtherDepositWarnings

export const homeTabs = state => state.homeTabs

export const bankTabs = state => state.bankTabs

export const accountTabs = state => state.accountTabs

export const hasGrantedWeb3Access = state => state.hasGrantedWeb3Access

export const showTransactions = state => state.showTransactions
