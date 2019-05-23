import { ethers } from 'ethers'

export const setupProvider = async ({ getters, commit }) => {
  const { network } = getters
  let provider

  if (network === 'private') {
    provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
  } else {
    provider = new ethers.getDefaultProvider(network)
  }

  commit('setProvider', provider)
  commit('setProviderReady', true)
}

export const bootstrapEth = async ({ dispatch, getters }) => {
  const { encryptedMnemonicExists } = getters
  await dispatch('setupProvider')
  await dispatch('setupWeddingManager')

  if (encryptedMnemonicExists) {
    dispatch('setAccountRequestOpen', true)
  }
}

export const watchPendingTx = async ({ commit }, { tx, description }) => {
  tx.once('transactionHash', transactionHash =>
    commit('setSentTransaction', {
      transactionHash,
      status: 'pending',
      description
    })
  ).once('receipt', receipt =>
    commit('setSentTransaction', {
      ...receipt,
      status: 'complete',
      description
    })
  )
}
