import { pathOr } from 'ramda'

export const weddingManager = state => pathOr(null, ['weddingManager'], state)

export const weddingsLength = state => pathOr(0, ['weddingsLength'], state)

export const weddingAddressOfAddress = state => address =>
  pathOr(null, ['weddingOf', address], state)

export const weddingAddressOfUser = (state, _, __, { address }) =>
  pathOr(null, ['weddingOf', address], state)

export const weddingExists = state => weddingAddress =>
  pathOr(false, ['weddingExists', weddingAddress], state)
