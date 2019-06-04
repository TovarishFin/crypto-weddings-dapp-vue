import { Wallet, utils } from 'ethers'
import { AES, enc } from 'crypto-js'
import QR from 'qrcode'

export const generateMnemonic = async ({ commit }) => {
  const wallet = Wallet.createRandom()
  commit('setMnemonic', wallet.mnemonic)
}

export const encryptAndSaveWallet = ({ commit, getters }, password) => {
  const { mnemonic } = getters
  const encrypted = AES.encrypt(mnemonic, password).toString()
  commit('setEncryptedMnemonic', encrypted)
  commit('setAccountReady', true)
}

export const decryptAndLoadWallet = (
  { commit, getters, dispatch },
  password
) => {
  const { encryptedMnemonic, pathDerivation } = getters
  try {
    const decrypted = AES.decrypt(encryptedMnemonic, password).toString(
      enc.Utf8
    )
    const wallet = Wallet.fromMnemonic(decrypted, pathDerivation)
    commit('setMnemonic', wallet.mnemonic)
    commit('setAccountReady', true)
    commit('setAccountRequestOpen', false)
  } catch {
    commit('setMnemonic', '')
    commit('setAccountReady', false)
    dispatch('createNotification', 'incorrect password... try again')
  }
}

export const setPendingTransaction = (
  { commit, dispatch },
  { action, description, payload }
) => {
  commit('setPendingAction', action)
  commit('setPendingActionDescription', description)
  commit('setPendingPayload', payload)
  dispatch('setConfirmTransactionOpen', true)
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

export const sendEther = async ({ getters, dispatch }, { to, smallValue }) => {
  const { wallet } = getters
  const value = utils.parseEther(smallValue.toString())

  const tx = await wallet.sendTransaction({
    to,
    value
  })

  dispatch('watchPendingTx', { tx, description: 'send ether' })
}

export const watchBalance = ({ rootGetters, getters, commit }) => {
  const { address } = getters
  const { provider } = rootGetters
  provider.removeAllListeners(address)
  provider.on(address, balance => {
    const etherBalance = parseFloat(utils.formatEther(balance.toString()))
    commit('setUserBalance', etherBalance)
  })
}
