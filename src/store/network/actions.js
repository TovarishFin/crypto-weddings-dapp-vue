// we do some state clearing here because we use this function not
// only on start but also no account / network change
export const bootstrapEth = async ({ commit, dispatch, getters }) => {
  const { encryptedMnemonicExists, useMetaMask } = getters
  commit('setProviderReady', false)
  commit('setAccountReady', false)
  commit('setProviderReady', true)

  if (useMetaMask) {
    if (!window.ethereum.selectedAddress) {
      dispatch('setAccountRequestOpen', true)
    } else {
      commit('setAccountReady', true)
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      commit('setMnemonic', process.env.VUE_APP_MNEMONIC)
      dispatch('encryptAndSaveWallet', process.env.VUE_APP_PASSWORD)
    } else {
      if (encryptedMnemonicExists) {
        dispatch('setAccountRequestOpen', true)
      }
    }
  }

  await dispatch('setupWeddingManager')
  await dispatch('getWeddingsLength')
  dispatch('unwatchWeddingManagerEvents')
  dispatch('watchWeddingManagerEvents')
  dispatch('getWeddings')
}

export const watchPendingTx = ({ commit }, { tx, description }) => {
  commit('setSentTransaction', {
    transactionHash: tx.hash,
    status: 'pending',
    description
  })

  tx.wait()
    .then(receipt =>
      commit('setSentTransaction', {
        ...receipt,
        status: 'complete',
        description
      })
    )
    .catch(() =>
      commit('setSentTransaction', {
        transactionHash: tx.hash,
        status: 'error',
        description
      })
    )
}

export const setupWeb3Provider = async ({ dispatch, commit }) => {
  switch (true) {
    case !!window.ethereum:
      window.ethereum.enable()
      commit('setAccountReady', true)
      commit('setAccountRequestOpen', false)
      break

    case !!window.web3:
      commit('setAccountReady', true)
      commit('setAccountRequestOpen', false)
      break

    default:
      dispatch('createNotification', 'no metamask detected...')
      break
  }
}
