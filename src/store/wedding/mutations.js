export const setWedding = (state, wedding) =>
  (state.weddings = {
    ...state.weddings,
    [wedding.address]: { ...state.weddings[wedding.address], ...wedding }
  })

export const removeWedding = (state, weddingAddress) => {
  const weddingsCopy = { ...state.weddings }
  delete weddingsCopy[weddingAddress]
  state.weddings = weddingsCopy
}

export const setWeddingCursor = (state, weddingCursor) =>
  (state.weddingCursor = weddingCursor)

export const setUserWeddingCursor = (state, userWeddingCursor) =>
  (state.userWeddingCursor = userWeddingCursor)
