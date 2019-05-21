import { Wallet } from 'ethers'
import { AES, enc } from 'crypto-js'

export const generateMnemonic = async ({ commit }) => {
  const wallet = Wallet.createRandom()
  commit('setMnemonic', wallet.mnemonic)
  commit('setAddress', wallet.address)
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
  const { encryptedMnemonic } = getters
  try {
    const decrypted = AES.decrypt(encryptedMnemonic, password).toString(
      enc.Utf8
    )
    const wallet = Wallet.fromMnemonic(decrypted)
    commit('setMnemonic', wallet.mnemonic)
    commit('setAddress', wallet.address)
    commit('setAccountReady', true)
    commit('setAccountRequestOpen', false)
  } catch {
    commit('setMnemonic', '')
    commit('setAddress', '')
    commit('setAccountReady', false)
    dispatch('createNotification', 'incorrect password... try again')
  }
}
