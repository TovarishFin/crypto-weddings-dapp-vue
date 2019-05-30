export const setCurrentBlock = (state, payload) => {
  state.currentBlock = payload
}

export const setNetwork = (state, payload) => {
  state.network = payload
}

export const setNetworkId = (state, payload) => {
  state.networkId = payload
}

export const setNetworkData = (state, payload) => {
  const { currentBlock, network, networkId } = payload
  state.currentBlock = currentBlock
  state.network = network
  state.networkId = networkId
}

export const setEthReady = (state, payload) => {
  state.ethReady = payload
}

export const setSentTransaction = (state, transaction) => {
  const { transactionHash } = transaction
  state.sentTransactions = {
    ...state.sentTransactions,
    [transactionHash]: transaction
  }
}

export const setProviderReady = (state, ready) => {
  state.providerReady = ready
}

export const setAccountReady = (state, ready) => {
  state.accountReady = ready
}

export const setGasLimit = (state, gasLimit) => {
  state.gasLimit = gasLimit
}
