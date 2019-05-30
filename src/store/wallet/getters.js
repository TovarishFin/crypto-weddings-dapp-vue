import { ethers } from 'ethers'
import { pathOr, pathSatisfies } from 'ramda'

export const encryptedMnemonic = state =>
  pathOr(null, ['encryptedMnemonic'], state)

export const encryptedMnemonicExists = state =>
  pathSatisfies(x => !!x, ['encryptedMnemonic'], state)

export const wallet = (_, getters, __, rootGetters) => {
  const { mnemonic, pathDerivation } = getters
  const { provider } = rootGetters
  try {
    return mnemonic
      ? new ethers.Wallet.fromMnemonic(mnemonic, pathDerivation).connect(
          provider
        )
      : null
  } catch (err) {
    return null
  }
}

export const mnemonic = state => pathOr(null, ['mnemonic'], state)

export const address = state => pathOr(null, ['address'], state)

export const pathDerivation = state =>
  pathOr('m/44’/60’/0’/0/0', ['pathDerivation'], state)
