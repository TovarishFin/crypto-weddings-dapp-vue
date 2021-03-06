import { utils, constants } from 'ethers'
import { pathOr } from 'ramda'
import { networkIdToName } from '@/utils/data'

// we do some state clearing here because we use this function not
// only on start but also no account / network change
export const bootstrapEth = async ({ commit, dispatch, getters }) => {
  const { encryptedMnemonicExists, useMetaMask } = getters
  commit('setProviderReady', false)
  commit('setAccountReady', false)
  dispatch('watchMetaMask')

  if (useMetaMask && !window.ethereum.selectedAddress) {
    dispatch('setAccountRequestOpen', true)
  } else if (!useMetaMask && process.env.VUE_APP_AUTO_LOAD_WALLET === 'true') {
    commit('setMnemonic', process.env.VUE_APP_MNEMONIC)
    dispatch('encryptAndSaveWallet', process.env.VUE_APP_PASSWORD)
  } else if (
    !useMetaMask &&
    encryptedMnemonicExists &&
    process.env.VUE_APP_AUTO_LOAD_WALLET !== 'true'
  ) {
    dispatch('setAccountRequestOpen', true)
  }

  await dispatch('setupWeddingManager')
  await dispatch('getWeddingsLength')
  dispatch('unwatchWeddingManagerEvents')
  dispatch('watchWeddingManagerEvents')
  dispatch('getWeddings')
  commit('setProviderReady', true)
}

export const watchPendingTx = ({ commit }, { tx, description, blocking }) => {
  commit('setSentTransaction', {
    transactionHash: tx.hash,
    status: 'pending',
    description
  })

  if (blocking) {
    commit('setBlockingPendingTransactionHash', tx.hash)
  }

  tx.wait()
    .then(receipt => {
      commit('setSentTransaction', {
        ...receipt,
        status: 'complete',
        description
      })

      if (blocking) {
        commit('setBlockingPendingTransactionHash', null)
      }
    })
    .catch(err => {
      commit('setSentTransaction', {
        transactionHash: tx.hash,
        status: 'error',
        description,
        error: err.toString()
      })

      if (blocking) {
        commit('setBlockingPendingTransactionHash', null)
      }
    })
}

export const clearTransactions = ({ dispatch, commit }) => {
  commit('clearTransactions')
  dispatch('createNotification', 'transactions cleared.')
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

const checkMetaMask = ({ commit, getters, rootGetters }) => {
  const { network, useMetaMask } = getters
  const { metaMaskAddress } = rootGetters
  const currentNetwork = networkIdToName(
    pathOr(null, ['ethereum', 'networkVersion'], window)
  )
  const currentAddress = utils.getAddress(
    pathOr(constants.AddressZero, ['ethereum', 'selectedAddress'], window)
  )

  if (network !== currentNetwork) {
    if (useMetaMask) {
      commit('setNetwork', currentNetwork)
    }
  }

  if (metaMaskAddress !== currentAddress) {
    commit('setMetaMaskAddress', currentAddress)

    if (useMetaMask) {
      commit('setAccountReady', true)
    }
  }
}

export const watchMetaMask = async context => {
  const { commit, getters } = context
  const { metaMaskPollingInterval } = getters
  checkMetaMask(context)
  const metaMaskPoller = setInterval(
    () => checkMetaMask(context),
    metaMaskPollingInterval
  )

  commit('setMetaMaskPoller', metaMaskPoller)
}

export const setSkipConfirmations = (
  { dispatch, commit },
  skipConfirmations
) => {
  commit('setSkipConfirmations', skipConfirmations)
  const message = skipConfirmations
    ? 'blockchain transactions will now run with NO confirmations!'
    : 'blockchain transactions will now require confirmations.'
  dispatch('createNotification', message)
}
