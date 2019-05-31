export const setMnemonic = (state, mnemonic) => {
  state.mnemonic = mnemonic
}

export const setAddress = (state, address) => {
  state.address = address
}

export const setEncryptedMnemonic = (state, encryptedMnemonic) => {
  state.encryptedMnemonic = encryptedMnemonic
}

export const setPathDerivation = (state, pathDerivation) => {
  state.pathDerivation = pathDerivation
}

export const setPendingAction = (state, action) => {
  state.pendingAction = action
}

export const setPendingActionDescription = (state, description) => {
  state.pendingActionDescription = description
}

export const setPendingPayload = (state, payload) => {
  state.pendingPayload = payload
}

export const setUserBalance = (state, userBalance) => {
  state.userBalance = userBalance
}

export const setUserQrCode = (state, userQrCode) => {
  state.userQrCode = userQrCode
}
