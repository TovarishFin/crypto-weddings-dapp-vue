export const setWeddingManager = (state, weddingManager) => {
  state.weddingManager = weddingManager
}

export const setWeddingsLength = (state, weddingsLength) => {
  state.weddingsLength = weddingsLength
}

export const setUserWeddingMap = (state, userMap) => {
  state.weddingOf = {
    ...state.weddingOf,
    [userMap.userAddress]: userMap.weddingAddress
  }
}

export const setWeddingExists = (state, existanceMap) => {
  state.weddingExists = {
    ...state.weddingExists,
    [existanceMap.weddingAddress]: existanceMap.exists
  }
}
