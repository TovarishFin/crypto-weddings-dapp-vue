export const setWeddingManager = (state, weddingManager) => {
  state.weddingManager = weddingManager
}

export const setWeddingsLength = (state, weddingsLength) => {
  state.weddingsLength = weddingsLength
}

export const setUserWeddingMap = (state, { userAddress, weddingAddress }) => {
  state.weddingOf = {
    ...state.weddingOf,
    [userAddress]: weddingAddress
  }
}

export const setWeddingExists = (state, existanceMap) => {
  state.weddingExists = {
    ...state.weddingExists,
    [existanceMap.weddingAddress]: existanceMap.exists
  }
}
