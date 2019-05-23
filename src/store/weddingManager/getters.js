import { pathOr } from 'ramda'

export const weddingManager = state => pathOr(null, ['weddingManager'], state)

export default weddingManager
