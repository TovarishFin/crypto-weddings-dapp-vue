export const setRockPaperScissors = (state, rockPaperScissors) => {
  state.rockPaperScissors = rockPaperScissors
}

export const setRockPaperScissorsWs = (state, rockPaperScissorsWs) => {
  state.rockPaperScissorsWs = rockPaperScissorsWs
}

export const setPaused = (state, paused) => {
  state.paused = paused
}

export const setMinBet = (state, minBet) => {
  state.minBet = minBet
}

export const setTimeoutInSeconds = (state, timeoutInSeconds) => {
  state.timeoutInSeconds = timeoutInSeconds
}

export const setReferralFeePerMille = (state, referralFeePerMille) => {
  state.referralFeePerMille = referralFeePerMille
}

export const setFeePerMille = (state, feePerMille) => {
  state.feePerMille = feePerMille
}

export const setGame = (state, { gameId, game }) => {
  state.games = { ...state.games, [gameId]: game }
}

export const setJoinableGames = (state, openGameIds) => {
  state.openGameIds = openGameIds
}

export const setSelectedGameId = (state, selectedGameId) => {
  state.selectedGameId = selectedGameId
}

export const setCommits = (state, choiceCommits) => {
  state.choiceCommits = choiceCommits
}

export const setCommit = (state, { choiceCommit, gameId }) => {
  state.choiceCommits = { ...state.choiceCommits, [gameId]: choiceCommit }
}

export const setGameTimedOut = (state, { timedOut, gameId }) => {
  state.games[gameId] = { ...state.games[gameId], timedOut }
}

export const setCoinbaseActiveGameIds = (state, coinbaseActiveGameIds) => {
  state.coinbaseActiveGameIds = coinbaseActiveGameIds
}

export const setCoinbaseReferrer = (state, coinbaseReferrer) => {
  state.coinbaseReferrer = coinbaseReferrer
}
