export const setWedding = (state, wedding) =>
  (state.weddings = {
    ...state.weddings,
    [wedding.address]: { ...state.weddings[wedding.address], ...wedding }
  })

export const clearWeddingGiftEvents = (state, weddingAddress) => {
  state.weddings = {
    ...state.weddings,
    [weddingAddress]: { ...state.weddings[weddingAddress], giftEvents: [] }
  }
}

export const removeWedding = (state, weddingAddress) => {
  const weddingsCopy = { ...state.weddings }
  delete weddingsCopy[weddingAddress]
  state.weddings = weddingsCopy
}

export const setWeddingCursor = (state, weddingCursor) =>
  (state.weddingCursor = weddingCursor)

export const setUserWeddingCursor = (state, userWeddingCursor) =>
  (state.userWeddingCursor = userWeddingCursor)

export const addGiftEvent = (state, { wedding, gifter, value, message }) =>
  (state.weddings = {
    ...state.weddings,
    [wedding]: {
      ...state.weddings[wedding],
      giftEvents: state.weddings[wedding].giftEvents
        ? [...state.weddings[wedding].giftEvents, { gifter, value, message }]
        : [{ gifter, value, message }]
    }
  })
