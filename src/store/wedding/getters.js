import { pathOr } from 'ramda'
import { weddingZero } from '@/utils/data'

export const weddings = state => pathOr({}, ['weddings'], state)

export const wedding = state => weddingAddress =>
  pathOr(weddingZero, ['weddings', weddingAddress], state)

export const weddingList = state =>
  Object.keys(pathOr({}, ['weddings'], state)).map(address => ({
    ...pathOr({}, ['weddings', address], state),
    address
  }))

export const weddingCursor = state => pathOr(null, ['weddingCursor'], state)

export const userWeddingCursor = state =>
  pathOr(null, ['userWeddingCursor'], state)

export const selectedWedding = state => wedding(state)(weddingCursor(state))

export const userWedding = state => wedding(state)(userWeddingCursor(state))

export const userWeddingStage = state =>
  pathOr(0, ['stage'], userWedding(state))

export const userPartner1 = state =>
  pathOr(null, ['partner1'], userWedding(state))

export const userPartner2 = state =>
  pathOr(null, ['partner2'], userWedding(state))

export const userPartner = (state, _, __, { address }) => {
  if (address) {
    return address === userPartner1(state)
      ? userPartner2(state)
      : userPartner1(state)
  } else {
    return null
  }
}
