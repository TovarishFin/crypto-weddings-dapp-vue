import { ethers } from 'ethers'

export const setupProvider = ({ getters, commit }) => {
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
  await dispatch('getWeddingsLength')

  if (encryptedMnemonicExists) {
    dispatch('setAccountRequestOpen', true)
  }
}

export const watchPendingTx = ({ commit }, { tx, description }) => {
  commit('setSentTransaction', {
    transactionHash: tx.hash,
    status: 'pending',
    description
  })

  tx.wait()
    .then(receipt => {
      commit('setSentTransaction', {
        ...receipt,
        status: 'complete',
        description
      })
    })
    .catch(() => {
      commit('setSentTransaction', {
        transactionHash: tx.hash,
        status: 'error',
        description
      })
    })
}
