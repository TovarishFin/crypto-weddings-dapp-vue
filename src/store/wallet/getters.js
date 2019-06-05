import { ethers } from 'ethers'
import { pathOr, pathSatisfies } from 'ramda'

export const encryptedMnemonic = state =>
  pathOr(null, ['encryptedMnemonic'], state)

export const encryptedMnemonicExists = state =>
  pathSatisfies(x => !!x, ['encryptedMnemonic'], state)

export const wallet = (_, getters, __, rootGetters) => {
  const { mnemonic, pathDerivation } = getters
  const { provider, useMetaMask } = rootGetters

  try {
    return useMetaMask
      ? provider.getSigner()
      : mnemonic
      ? new ethers.Wallet.fromMnemonic(mnemonic, pathDerivation).connect(
          provider
        )
      : null
  } catch (err) {
    return null
  }
}

export const address = (_, getters, __, rootGetters) => {
  const { wallet: currentWallet } = getters
  const { useMetaMask } = rootGetters
  return currentWallet
    ? useMetaMask
      ? window.ethereum.selectedAddress
      : currentWallet.address
    : null
}

export const mnemonic = state => pathOr(null, ['mnemonic'], state)

export const pathDerivation = state =>
  pathOr('m/44’/60’/0’/0/0', ['pathDerivation'], state)

export const pendingAction = state => pathOr(null, ['pendingAction'], state)

export const pendingActionDescription = state =>
  pathOr(null, ['pendingActionDescription'], state)

export const pendingPayload = state => pathOr(null, ['pendingPayload'], state)

export const userBalance = state => pathOr(0, ['userBalance'], state)

export const userHasGas = state => userBalance(state) >= 0.001

export const userQrCode = state => pathOr(null, ['userQrCode'], state)
