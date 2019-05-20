export const setCoinbase = (state, payload) => {
  state.coinbase = payload
}

export const setCurrentBlock = (state, payload) => {
  state.currentBlock = payload
}

export const setNetwork = (state, payload) => {
  state.network = payload
}

export const setNetworkId = (state, payload) => {
  state.networkId = payload
}

export const setCoinbaseReady = (state, payload) => {
  state.coinbaseReady = payload
}

export const setWeb3Ready = (state, payload) => {
  state.web3Ready = payload
}

export const setNetworkData = (state, payload) => {
  const { currentBlock, network, networkId } = payload
  state.currentBlock = currentBlock
  state.network = network
  state.networkId = networkId
}

export const setWeb3 = async (state, payload) => {
  state.web3 = payload
}

export const setWeb3Ws = async (state, payload) => {
  state.web3Ws = payload
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
