import { ethers } from 'ethers'

// this is really just checking that the provider works now...
export const setupProvider = ({ getters, commit }) => {
  const { network } = getters

  if (network === 'private') {
    new ethers.providers.JsonRpcProvider('http://localhost:8545')
  } else {
    new ethers.getDefaultProvider(network)
  }

  commit('setProviderReady', true)
}

export const bootstrapEth = async ({ commit, dispatch, getters }) => {
  const { encryptedMnemonicExists } = getters
  commit('setProviderReady', false)
  commit('setAccountReady', false)
  await dispatch('setupProvider')
  await dispatch('setupWeddingManager')
  await dispatch('watchWeddingManagerEvents')
  await dispatch('getWeddingsLength')
  await dispatch('getWeddings')

  // TODO: should probably remove or improve this at some point...
  if (process.env.NODE_ENV === 'development') {
    dispatch('decryptAndLoadWallet', '123')
  } else {
    if (encryptedMnemonicExists) {
      dispatch('setAccountRequestOpen', true)
    }
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
