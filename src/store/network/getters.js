import { pathOr } from 'ramda'

export const coinbase = state => state.coinbase

export const currentBlock = state => state.currentBlock

export const network = state => state.network

export const networkId = state => state.networkId

export const coinbaseReady = state => state.coinbaseReady

export const web3Ready = state => state.web3Ready

export const web3 = state => state.web3

export const web3Ws = state => state.web3Ws

export const ethReady = state => state.ethReady

export const pendingTxs = state =>
  Object.values(pathOr([], ['sentTransactions'], state)).filter(
    tx => tx.status === 'pending'
  )

export const completeTxs = state =>
  Object.values(pathOr([], ['sentTransactions'], state)).filter(
    tx => tx.status === 'complete'
  )

export const hasPendingTxs = state => pendingTxs(state).length > 0
