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

export const setEthReady = async (state, payload) => {
  state.ethReady = payload
}

export const setSentTransaction = async (state, transaction) => {
  const { transactionHash } = transaction
  state.sentTransactions = {
    ...state.sentTransactions,
    [transactionHash]: transaction
  }
}

export const setProvider = async (state, payload) => {
  state.provider = payload
}

export const setProviderReady = (state, payload) => {
  state.providerReady = payload
}

export const setAccountReady = (state, ready) => {
  state.accountReady = ready
}
