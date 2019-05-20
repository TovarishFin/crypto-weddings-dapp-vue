import { pathOr } from 'ramda'
import { toBN } from 'web3-utils'

export const gamesLogs = state => pathOr({}, ['gamesLogs'], state)

export const gameLogs = state => gameId =>
  pathOr([], ['gamesLogs', gameId], state)

export const referralPayments = state => pathOr([], ['referralPayments'], state)

export const referralPaymentTotal = state =>
  referralPayments(state)
    .reduce((total, payment) => total.add(toBN(payment.value)), toBN(0))
    .toString()

export const bankActivity = state => pathOr([], ['bankActivity'], state)
