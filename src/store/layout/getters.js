export const drawerOpen = state => state.drawerOpen

export const notificationOpen = state => state.notificationOpen

export const notificationMessage = state => state.notificationMessages[0]

export const messagesLength = state => state.notificationMessages.length

export const accountRequestOpen = state => state.accountRequestOpen

export const confirmTransactionOpen = state => state.confirmTransactionOpen

export const warningDialogOpen = state => state.warningDialogOpen

export const warningComponent = state => state.warningComponent

export const weddingInProgressTabs = state => state.weddingInProgressTabs

export const weddingMarriedTabs = state => state.weddingInProgressTabs

export const walletTabs = state => state.walletTabs

export const settingsTabs = state => state.settingsTabs

export const showTransactions = state => state.showTransactions

export const showParticles = state => state.showParticles

export const useDarkMode = state => state.useDarkMode

export const loading = state => state.loading
