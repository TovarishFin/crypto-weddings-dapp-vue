import { ethers } from 'ethers'
import { pathOr, pathSatisfies } from 'ramda'

export const encryptedMnemonic = state =>
  pathOr(null, ['encryptedMnemonic'], state)

export const encryptedMnemonicExists = state =>
  pathSatisfies(x => !!x, ['encryptedMnemonic'], state)

export const wallet = state => {
  const mnemonicValue = mnemonic(state)
  return mnemonicValue ? new ethers.Wallet.fromMnemonic(mnemonicValue) : null
}

export const mnemonic = state => pathOr(null, ['mnemonic'], state)

export const address = state => pathOr(null, ['address'], state)
