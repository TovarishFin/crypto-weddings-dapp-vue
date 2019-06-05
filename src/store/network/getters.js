import { pathOr } from 'ramda'
import { ethers } from 'ethers'
import deployments from 'crypto-weddings-contracts/deployments'

export const availableNetworks = () => Object.keys(deployments)

export const network = state => pathOr('ropsten', ['network'], state)

export const gasLimit = state => pathOr(5e6, ['gasLimit'], state)

export const provider = (_, getters) => {
  const { network: currentNetwork, useMetaMask: currentUseMetaMask } = getters
  return currentNetwork === 'private'
    ? new ethers.providers.JsonRpcProvider('http://localhost:8545')
    : currentUseMetaMask
    ? new ethers.providers.Web3Provider(window.web3.currentProvider)
    : new ethers.getDefaultProvider(currentNetwork)
}

export const currentBlock = state => state.currentBlock

export const accountReady = state => state.accountReady

export const providerReady = state => state.providerReady

export const sentTxs = state =>
  Object.values(pathOr({}, ['sentTransactions'], state))

export const pendingTxs = state =>
  Object.values(pathOr({}, ['sentTransactions'], state)).filter(
    tx => tx.status === 'pending'
  )

export const completeTxs = state =>
  Object.values(pathOr({}, ['sentTransactions'], state)).filter(
    tx => tx.status === 'complete'
  )

export const erroredTxs = state =>
  Object.values(pathOr({}, ['sentTransactions'], state)).filter(
    tx => tx.status === 'error'
  )

export const hasPendingTxs = state => pendingTxs(state).length > 0

export const useMetaMask = state => pathOr(false, ['useMetaMask'], state)
