import { pathOr } from 'ramda'

export const statisticsWs = state => pathOr(null, ['statisticsWs'], state)

export const totalPlayCount = state => pathOr(0, ['totalPlayCount'], state)

export const totalWinCount = state => pathOr(0, ['totalWinCount'], state)

export const totalWinVolume = state => pathOr(0, ['totalWinVolume'], state)

export const totalReferralCount = state =>
  pathOr(0, ['totalReferralCount'], state)

export const totalReferralVolume = state =>
  pathOr(0, ['totalReferralVolume'], state)
