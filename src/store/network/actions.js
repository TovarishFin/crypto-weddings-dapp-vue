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

// we do some state clearing here because we use this function not
// only on start but also no account / network change
export const bootstrapEth = async ({ commit, dispatch, getters }) => {
  const { encryptedMnemonicExists } = getters
  commit('setProviderReady', false)
  commit('setAccountReady', false)
  await dispatch('setupProvider')

  if (process.env.NODE_ENV === 'development') {
    commit('setMnemonic', process.env.VUE_APP_MNEMONIC)
    dispatch('encryptAndSaveWallet', process.env.VUE_APP_PASSWORD)
  } else {
    if (encryptedMnemonicExists) {
      dispatch('setAccountRequestOpen', true)
    }
  }

  await dispatch('setupWeddingManager')
  await dispatch('getWeddingsLength')
  dispatch('unwatchWeddingManagerEvents')
  dispatch('watchWeddingManagerEvents')
  dispatch('getWeddings')
}

export const watchPendingTx = ({ commit, dispatch }, { tx, description }) => {
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
      dispatch('getUserBalance')
    })
    .catch(() => {
      commit('setSentTransaction', {
        transactionHash: tx.hash,
        status: 'error',
        description
      })
      dispatch('getUserBalance')
    })
}
