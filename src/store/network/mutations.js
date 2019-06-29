export const setNetwork = (state, payload) => {
  state.network = payload
}

export const setGasLimit = (state, gasLimit) => {
  state.gasLimit = gasLimit
}

export const setCustomGasPrice = (state, customGasPrice) => {
  state.customGasPrice = customGasPrice
}

export const setAccountReady = (state, ready) => {
  state.accountReady = ready
}

export const setProviderReady = (state, ready) => {
  state.providerReady = ready
}

export const setSentTransaction = (state, transaction) => {
  const { transactionHash } = transaction
  state.sentTransactions = {
    ...state.sentTransactions,
    [transactionHash]: transaction
  }
}

export const setUseMetaMask = (state, useMetaMask) => {
  state.useMetaMask = useMetaMask
}

export const setMetaMaskPollingInterval = (state, metaMaskPollingInterval) => {
  state.metaMaskPollingInterval = metaMaskPollingInterval
}

export const setMetaMaskPoller = (state, metaMaskPoller) => {
  state.metaMaskPoller = metaMaskPoller
}

export const clearTransactions = state => {
  state.sentTransactions = {}
}

export const setSkipConfirmations = (state, skipConfirmations) => {
  state.skipConfirmations = skipConfirmations
}

export const setBlockingPendingTransactionHash = (
  state,
  blockingPendingTransactionHash
) => {
  state.blockingPendingTransactionHash = blockingPendingTransactionHash
}
