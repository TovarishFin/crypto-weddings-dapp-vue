import { pathOr } from 'ramda'

export const weddingManager = state => pathOr(null, ['weddingManager'], state)

export const weddingsLength = state => pathOr(0, ['weddingsLength'], state)
