import { pathOr, pathSatisfies } from 'ramda'
import { ethers } from 'ethers'
import deployments from 'crypto-weddings-contracts/deployments'

export const availableNetworks = () => Object.keys(deployments)

export const network = state => pathOr('ropsten', ['network'], state)

export const gasLimit = state => pathOr(5e6, ['gasLimit'], state)

export const customGasPrice = state => pathOr(null, ['customGasPrice'], state)

export const provider = (_, getters) => {
  const { network: currentNetwork, useMetaMask } = getters
  return useMetaMask
    ? new ethers.providers.Web3Provider(window.ethereum)
    : currentNetwork === 'private'
    ? new ethers.providers.JsonRpcProvider('http://localhost:8545')
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

export const blockingPendingTransactionHash = state =>
  pathOr(false, ['blockingPendingTransactionHash'], state)

export const hasBlockingPendingTransaction = state =>
  pathSatisfies(x => !!x, ['blockingPendingTransactionHash'], state)

export const blockingPendingTransaction = state =>
  pathOr(null, [blockingPendingTransactionHash(state), 'pendingTxs'], state)

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

export const metaMaskPollingInterval = state =>
  pathOr(2000, ['metaMaskPollingInterval'], state)

export const metaMaskPoller = state => pathOr(null, ['metaMaskPoller'], state)

export const skipConfirmations = state =>
  pathOr(false, ['skipConfirmations'], state)
