import { Wallet, utils } from 'ethers'
import { AES, enc } from 'crypto-js'
import QR from 'qrcode'

export const generateMnemonic = async ({ commit }) => {
  const wallet = Wallet.createRandom()
  commit('setMnemonic', wallet.mnemonic)
}

export const encryptAndSaveWallet = (
  { dispatch, commit, getters },
  password
) => {
  const { mnemonic } = getters
  const encrypted = AES.encrypt(mnemonic, password).toString()
  commit('setEncryptedMnemonic', encrypted)
  dispatch('decryptAndLoadWallet', password)
  dispatch('createNotification', 'wallet has been saved!')
}

export const decryptAndLoadWallet = (
  { commit, getters, dispatch },
  password
) => {
  const { encryptedMnemonic } = getters
  try {
    const decrypted = AES.decrypt(encryptedMnemonic, password).toString(
      enc.Utf8
    )

    commit('setMnemonic', decrypted)
    commit('setAccountReady', true)
    commit('setAccountRequestOpen', false)
  } catch {
    commit('setMnemonic', '')
    commit('setAccountReady', false)
    dispatch('createNotification', 'incorrect password... try again')
  }
}

export const setPendingTransaction = (
  { rootGetters, commit, dispatch },
  { action, description, payload, requireConfirmation }
) => {
  const { skipConfirmations, accountReady } = rootGetters

  commit('setPendingAction', action)
  commit('setPendingActionDescription', description)
  commit('setPendingPayload', payload)

  if (accountReady) {
    skipConfirmations && !requireConfirmation
      ? dispatch('confirmTransaction')
      : dispatch('setConfirmTransactionOpen', true)

    return
  }

  dispatch('setAccountRequestOpen', true)
  dispatch('createNotification', 'you need an account to do that...')
}

export const confirmTransaction = ({ dispatch, commit, getters }) => {
  const { pendingAction, pendingPayload } = getters
  dispatch(pendingAction, pendingPayload)
  commit('setPendingAction', null)
  commit('setPendingActionDescription', null)
  commit('setPendingPayload', null)
  dispatch('setConfirmTransactionOpen', false)
}

export const cancelTransaction = ({ dispatch, commit }) => {
  commit('setPendingAction', null)
  commit('setPendingActionDescription', null)
  commit('setPendingPayload', null)
  dispatch('setConfirmTransactionOpen', false)
}

export const getUserQrCode = async ({ getters, commit }) => {
  const { address } = getters
  const qrCode = await QR.toDataURL(address)
  commit('setUserQrCode', qrCode)
}

export const sendEther = async (
  { getters, rootGetters, dispatch },
  { to, smallValue }
) => {
  const { wallet } = getters
  const { provider, customGasPrice } = rootGetters
  const value = utils.parseEther(smallValue.toString())
  const gasPrice = parseInt(customGasPrice)
    ? utils.parseUnits(customGasPrice, 'gwei')
    : await provider.getGasPrice()

  const tx = await wallet.sendTransaction({
    to,
    value,
    gasPrice
  })

  dispatch('watchPendingTx', { tx, description: 'send ether' })
}

export const sweepEther = async ({ getters, rootGetters, dispatch }, to) => {
  const { wallet } = getters
  const { provider, customGasPrice } = rootGetters
  const gasLimit = 21000
  const code = await provider.getCode(to)
  if (code != '0x') {
    return dispatch('createNotification', 'cannot withdraw funds to contract')
  }

  const balance = await wallet.getBalance()
  const gasPrice = parseInt(customGasPrice)
    ? utils.parseUnits(customGasPrice, 'gwei')
    : await provider.getGasPrice()
  const value = balance.sub(gasPrice.mul(gasLimit))

  const tx = await wallet.sendTransaction({
    gasLimit,
    gasPrice,
    to,
    value
  })

  dispatch('watchPendingTx', { tx, description: 'send ether' })
}

export const watchBalance = ({ rootGetters, getters, commit, dispatch }) => {
  const { address } = getters
  const { provider } = rootGetters
  provider.removeAllListeners(address)
  provider.on(address, balance => {
    const etherBalance = parseFloat(utils.formatEther(balance.toString()))
    commit('setUserBalance', etherBalance)
    dispatch(
      'createNotification',
      `Your current account balance is ${etherBalance} ether.`
    )
  })
}
