import RockPaperScissors from '@/../contractsBuild/IRockPaperScissors'
import { soliditySha3 } from 'web3-utils'
import { addressZero } from '@/utils/data'

//
// start contract state setup functions
//

export const setupRockPaperScissors = async ({ getters, commit }) => {
  const { web3, networkId } = getters
  const rockPaperScissors = await new web3.eth.Contract(
    RockPaperScissors.abi,
    RockPaperScissors.networks[networkId].address
  )

  commit('setRockPaperScissors', rockPaperScissors)
}

export const setupRockPaperScissorsWs = async ({ getters, commit }) => {
  const { web3Ws, networkId } = getters
  const rockPaperScissorsWs = await new web3Ws.eth.Contract(
    RockPaperScissors.abi,
    RockPaperScissors.networks[networkId].address
  )

  commit('setRockPaperScissorsWs', rockPaperScissorsWs)
}

//
// end contract state setup functions
//

//
// start contract state getters
//

export const getPaused = async ({ getters, commit }) => {
  const { rockPaperScissorsWs } = getters
  const paused = await rockPaperScissorsWs.methods.paused().call()
  commit('setPaused', paused)
}

export const getMinBet = async ({ getters, commit }) => {
  const { rockPaperScissorsWs } = getters
  const paused = await rockPaperScissorsWs.methods.minBet().call()

  commit('setMinBet', paused)
}

export const getTimeoutInSeconds = async ({ getters, commit }) => {
  const { rockPaperScissorsWs } = getters
  const timeoutInSeconds = await rockPaperScissorsWs.methods
    .timeoutInSeconds()
    .call()

  commit('setTimeoutInSeconds', timeoutInSeconds)
}

export const getReferralFeePerMille = async ({ getters, commit }) => {
  const { rockPaperScissorsWs } = getters
  const referralFeePerMille = await rockPaperScissorsWs.methods
    .referralFeePerMille()
    .call()

  commit('setReferralFeePerMille', referralFeePerMille)
}

export const getFeePerMille = async ({ getters, commit }) => {
  const { rockPaperScissorsWs } = getters
  const feePerMille = await rockPaperScissorsWs.methods.feePerMille().call()

  commit('setFeePerMille', feePerMille)
}

export const getGame = async ({ getters, commit, dispatch }, gameId) => {
  const { rockPaperScissorsWs } = getters
  const game = await rockPaperScissorsWs.methods.games(gameId).call()
  game.gameId = gameId

  commit('setGame', { gameId, game })

  await dispatch('checkGameTimeout', gameId)
}

export const getJoinableGames = async ({ getters, commit }) => {
  const { rockPaperScissorsWs } = getters
  const openGameIds = await rockPaperScissorsWs.methods.allOpenGames().call()

  commit('setJoinableGames', openGameIds)
}

export const getCoinbaseActiveGameIds = async ({ getters, commit }) => {
  const { rockPaperScissorsWs, coinbase } = getters
  const activeGamesOf = await rockPaperScissorsWs.methods
    .allActiveGamesOf(coinbase)
    .call()

  commit('setCoinbaseActiveGameIds', activeGamesOf)
}

export const populateJoinableGames = async ({ getters, dispatch }) => {
  const { openGameIds } = getters
  const promises = []
  for (const gameId of openGameIds) {
    promises.push(dispatch('getGame', gameId))
  }

  await Promise.all(promises)
}

export const populateCoinbaseActiveGames = async ({ getters, dispatch }) => {
  const { coinbaseActiveGameIds } = getters
  const promises = []
  for (const gameId of coinbaseActiveGameIds) {
    promises.push(dispatch('getGame', gameId))
  }

  await Promise.all(promises)
}

export const checkGameTimeout = async ({ getters, commit }, gameId) => {
  const { rockPaperScissorsWs } = getters
  const timedOut = await rockPaperScissorsWs.methods
    .gameHasTimedOut(gameId)
    .call()
  commit('setGameTimedOut', { timedOut, gameId })
}

//
// end contract state getters
//

//
// start player contract state setters
//

export const createGame = async (
  { getters, dispatch },
  { tokenAddress, value }
) => {
  const { rockPaperScissors, coinbase, coinbaseReferrer } = getters
  const tx = rockPaperScissors.methods
    .createGame(coinbaseReferrer, tokenAddress, value)
    .send({
      from: coinbase
    })

  dispatch('watchPendingTx', { tx, description: 'Create Game' })

  // this does NOT prevent referrals from getting set again,
  // just prevents from setting the storage again on the smart contract
  if (coinbaseReferrer !== addressZero) {
    dispatch('setCoinbaseReferrer', addressZero)
  }
}

export const cancelGame = async ({ getters, dispatch }, gameId) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods.cancelGame(gameId).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Cancel Game' })
}

export const joinGame = async ({ getters, dispatch }, gameId) => {
  const { rockPaperScissors, coinbase, coinbaseReferrer } = getters
  const tx = rockPaperScissors.methods.joinGame(coinbaseReferrer, gameId).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Join Game' })

  // this does NOT prevent referrals from getting set again,
  // just prevents from setting the storage again on the smart contract
  if (coinbaseReferrer !== addressZero) {
    dispatch('setCoinbaseReferrer', addressZero)
  }
}

export const commitChoice = async (
  { getters, commit, dispatch },
  { gameId, choice }
) => {
  const { rockPaperScissors, coinbase, web3 } = getters
  const sigParams = await web3.eth.abi.encodeParameters(
    ['uint256', 'uint256'],
    [gameId.toString(), choice]
  )
  const sig = await web3.eth.personal.sign(sigParams, coinbase)
  const commitHash = soliditySha3(
    { t: 'uint256', v: gameId },
    { t: 'uint256', v: choice },
    { t: 'bytes', v: sig }
  )
  const tx = rockPaperScissors.methods.commitChoice(gameId, commitHash).send({
    from: coinbase
  })

  const choiceCommit = {
    gameId,
    choice,
    sigParams,
    sig,
    commitHash
  }

  commit('setCommit', { choiceCommit, gameId })

  dispatch('watchPendingTx', { tx, description: 'Commit Choice' })
}

export const revealChoice = async (
  { getters, dispatch },
  { gameId, choice, sig }
) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods.revealChoice(gameId, choice, sig).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Reveal Choice' })
}

export const rebuildAndRevealChoice = async (
  { getters, dispatch },
  { gameId, choice }
) => {
  const { coinbase, web3 } = getters
  const sigParams = await web3.eth.abi.encodeParameters(
    ['uint256', 'uint256'],
    [gameId.toString(), choice]
  )
  const sig = await web3.eth.personal.sign(sigParams, coinbase)

  await revealChoice({ getters, dispatch }, { gameId, choice, sig })
}

export const startGameTimeout = async ({ getters, dispatch }, gameId) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods.startGameTimeout(gameId).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Start Timeout' })
}

export const timeoutGame = async ({ getters, dispatch }, gameId) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods.timeoutGame(gameId).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Timeout Game' })
}

export const settleBet = async ({ getters, dispatch }, gameId) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods.settleBet(gameId).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Settle Bet' })
}

//
// end player contract state setters
//

//
// start owner contract state setters
//

export const pause = async ({ getters, dispatch }) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods.pause().send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Pause Game' })
}

export const unpause = async ({ getters, dispatch }) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods.unpause().send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Unpase Game' })
}

export const updateMinBet = async ({ getters, dispatch }, newMinBet) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods.newMinBet(newMinBet).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Update Min Bet' })
}

export const updateTimeout = async (
  { getters, dispatch },
  newTimeoutInSeconds
) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods
    .newTimeoutInSeconds(newTimeoutInSeconds)
    .send({
      from: coinbase
    })

  dispatch('watchPendingTx', { tx, description: 'Update Timeout' })
}

export const updateReferralFeePerMille = async (
  { getters, dispatch },
  newReferralFeePerMille
) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods
    .newReferralFeePerMille(newReferralFeePerMille)
    .send({
      from: coinbase
    })

  dispatch('watchPendingTx', { tx, description: 'Update Referral Fee' })
}

export const updateFeePerMille = async (
  { getters, dispatch },
  newFeePerMille
) => {
  const { rockPaperScissors, coinbase } = getters
  const tx = rockPaperScissors.methods.newFeePerMille(newFeePerMille).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Update New Fee' })
}

//
// end owner contract state setters
//

//
// start local state setters
//

export const setSelectedGameId = ({ commit }, gameId) => {
  commit('setSelectedGameId', gameId)
}

export const setCoinbaseReferrer = ({ commit }, referrer) => {
  commit('setCoinbaseReferrer', referrer)
}

//
// end local state setters
//
