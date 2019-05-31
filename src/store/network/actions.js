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

  if (process.env.NODE_ENV === 'development') {
    commit('setMnemonic', process.env.VUE_APP_MNEMONIC)
    dispatch('encryptAndSaveWallet', process.env.VUE_APP_PASSWORD)
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
