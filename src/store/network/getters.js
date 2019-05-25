import { pathOr } from 'ramda'

export const network = state => state.network

export const gasLimit = state => state.gasLimit

export const provider = state => state.provider

export const currentBlock = state => state.currentBlock

export const networkId = state => state.networkId

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
