import { ethers } from 'ethers'
import { pathOr, pathSatisfies } from 'ramda'

export const encryptedMnemonic = state =>
  pathOr(null, ['encryptedMnemonic'], state)

export const encryptedMnemonicExists = state =>
  pathSatisfies(x => !!x, ['encryptedMnemonic'], state)

export const wallet = (state, getters, rootState) => {
  const { mnemonic } = getters
  const {
    network: { provider }
  } = rootState
  try {
    return mnemonic
      ? new ethers.Wallet.fromMnemonic(mnemonic).connect(provider)
      : null
  } catch {
    return null
  }
}

export const mnemonic = state => pathOr(null, ['mnemonic'], state)

export const address = state => pathOr(null, ['address'], state)
