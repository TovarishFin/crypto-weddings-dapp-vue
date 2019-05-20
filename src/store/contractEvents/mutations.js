export const setGamesLogs = (state, gamesLogs) => {
  state.gamesLogs = gamesLogs
}

export const setGameLogs = (state, { gameId, gameLogs }) => {
  state.gamesLogs = { ...state.gamesLogs, [gameId]: gameLogs }
}

export const setReferralPayments = (state, referralPayments) => {
  state.referralPayments = referralPayments
}

export const setBankActivity = (state, bankActivity) => {
  state.bankActivity = bankActivity
}
