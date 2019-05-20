import { weiToEth, choiceEnum, bytes32Zero, shortenAddress } from '@/utils/data'

const eventWatchRetryTime = 5000
const blockWatchTime = 1e5

//
// start bank watcher related
//

export const watchBankEvents = context => {
  const { getters } = context
  const { bankWs } = getters
  const eventWatcher = bankWs.events
    .allEvents()
    .on('data', contractEvent => handleBankEvents(context, contractEvent))
    .on('error', async err => {
      /* eslint-disable no-console */
      console.error(err)
      console.log('retrying in 5 seconds...')
      eventWatcher.unsubscribe()
      console.log('unsubscribed from previous instance')
      setTimeout(async () => {
        console.log('setting up new ws web3...')
        await context.dispatch('setupWeb3Ws')
        console.log('new ws web3 setup')
        console.log('setting up new ws bank...')
        await context.dispatch('setupBankWs')
        console.log('retry setup complete. trying to watch events again...')
        watchBankEvents(context)
        /* eslint-enable no-console */
      }, eventWatchRetryTime)
    })
}

export const handleBankEvents = (context, bankEvent) => {
  const { event: eventName, returnValues } = bankEvent
  switch (eventName) {
    case 'FundsDeposited':
      return handleFundsDeposited(context, returnValues)
    case 'FundsAllocated':
      return handleFundsAllocated(context, returnValues)
    case 'FundsDeAllocated':
      return handleFundsDeAllocated(context, returnValues)
    case 'FundsTransferred':
      return handleFundsTransferred(context, returnValues)
    case 'FundsWithdrawn':
      return handleFundsWithdrawn(context, returnValues)
    case 'TokenUsageUpdated':
      return handleTokenUsageUpdated(context, returnValues)
  }
}

export const handleFundsDeposited = async (
  { getters, dispatch },
  { depositor, tokenAddress, value }
) => {
  const { coinbase, wethAddress } = getters
  if (coinbase === depositor) {
    await dispatch('getTokenDataOf', tokenAddress)

    if (tokenAddress === wethAddress) {
      await dispatch(
        'createNotification',
        `${weiToEth(value)} ether has been deposited and converted to weth.`
      )
    } else {
      const { tokenDataOf } = getters
      const symbol = tokenDataOf(tokenAddress).symbol
      await dispatch(
        'createNotification',
        `${weiToEth(value)} ${symbol} has been deposited in the bank.`
      )
    }
  }
}

export const handleFundsAllocated = async (
  { getters, dispatch },
  { fundsOwner, tokenAddress, value }
) => {
  const { coinbase } = getters
  if (coinbase === fundsOwner) {
    await dispatch('getTokenDataOf', tokenAddress)
    const { tokenDataOf } = getters
    const symbol = tokenDataOf(tokenAddress).symbol
    await dispatch(
      'createNotification',
      `${weiToEth(value)} ${symbol} has been allocated for a game.`
    )
  }
}

export const handleFundsDeAllocated = async (
  { getters, dispatch },
  { fundsOwner, tokenAddress, value }
) => {
  const { coinbase } = getters
  if (coinbase === fundsOwner) {
    await dispatch('getTokenDataOf', tokenAddress)
    const { tokenDataOf } = getters
    const symbol = tokenDataOf(tokenAddress).symbol
    await dispatch(
      'createNotification',
      `${weiToEth(value)} ${symbol} has been de-allocated from a game.`
    )
  }
}

export const handleFundsTransferred = async (
  { getters, dispatch },
  { from, to, tokenAddress, value }
) => {
  const { coinbase } = getters
  if (coinbase === from) {
    await dispatch('getTokenDataOf', tokenAddress)
    const { tokenDataOf } = getters
    const symbol = tokenDataOf(tokenAddress).symbol
    await dispatch(
      'createNotification',
      `${weiToEth(
        value
      )} ${symbol} has been transferred from you allocated balance.`
    )
  }

  if (coinbase === to) {
    await dispatch('getTokenDataOf', tokenAddress)
    const { tokenDataOf } = getters
    const symbol = tokenDataOf(tokenAddress).symbol
    await dispatch(
      'createNotification',
      `${weiToEth(value)} ${symbol} has been transferred to you.`
    )
  }
}

export const handleFundsWithdrawn = async (
  { getters, dispatch },
  { fundsOwner, tokenAddress, value }
) => {
  const { coinbase, wethAddress } = getters
  if (coinbase === fundsOwner) {
    await dispatch('getTokenDataOf', tokenAddress)

    if (tokenAddress === wethAddress) {
      await dispatch(
        'createNotification',
        `${weiToEth(
          value
        )} weth tokens have been exchanged for ether and sent to your address.`
      )
    } else {
      const { tokenDataOf } = getters
      const symbol = tokenDataOf(tokenAddress).symbol
      await dispatch(
        'createNotification',
        `${weiToEth(
          value
        )} ${symbol} has been withdrawn from the bank and sent to your address.`
      )
    }
  }
}

export const handleTokenUsageUpdated = (
  { getters, dispatch },
  { fundsOwner }
) => {
  const { coinbase } = getters
  if (coinbase === fundsOwner) {
    dispatch('getCoinbaseTokenUsage')
  }
}

//
// end bank watcher related
//

//
// start rps watcher related
//

export const watchRockPaperScissorsEvents = context => {
  const { getters } = context
  const { rockPaperScissorsWs } = getters
  const eventWatcher = rockPaperScissorsWs.events
    .allEvents()
    .on('data', contractEvent =>
      handleRockPaperScissorsEvents(context, contractEvent)
    )
    .on('error', async err => {
      /* eslint-disable no-console */
      console.error(err)
      console.log('retrying in 5 seconds...')
      eventWatcher.unsubscribe()
      console.log('unsubscribed from previous instance')
      setTimeout(async () => {
        console.log('setting up new ws web3...')
        await context.dispatch('setupWeb3Ws')
        console.log('new ws web3 setup')
        console.log('setting up new ws rockPaperScissors...')
        await context.dispatch('setupRockPaperScissorsWs')
        console.log('retry setup complete. trying to watch events again...')
        watchRockPaperScissorsEvents(context)
        /* eslint-enable no-console */
      }, eventWatchRetryTime)
    })
}

export const handleRockPaperScissorsEvents = (context, rpsEvent) => {
  const { event: eventName, returnValues } = rpsEvent
  switch (eventName) {
    case 'ProxyUpgraded':
      return handleProxyUpgraded(context, returnValues)
    case 'Paused':
      return handlePaused(context, returnValues)
    case 'Unpaused':
      return handleUnpaused(context, returnValues)
    case 'StageChanged':
      return handleStageChanged(context, returnValues)
    case 'GameCreated':
      return handleGameCreated(context, returnValues)
    case 'GameCancelled':
      return handleGameCancelled(context, returnValues)
    case 'GameJoined':
      return handleGameJoined(context, returnValues)
    case 'ChoiceCommitted':
      return handleChoiceCommitted(context, returnValues)
    case 'ChoiceRevealed':
      return handleChoiceRevealed(context, returnValues)
    case 'TimeoutStarted':
      return handleTimeoutStarted(context, returnValues)
    case 'TimedOut':
      return handleTimedOut(context, returnValues)
    case 'Tied':
      return handleTied(context, returnValues)
    case 'WinnerDecided':
      return handleWinnerDecided(context, returnValues)
    case 'BetSettled':
      return handleBetSettled(context, returnValues)
    case 'ReferralSet':
      return handleReferralSet(context, returnValues)
    case 'ReferralPaid':
      return handleReferralPaid(context, returnValues)
    case 'MinBetUpdated':
      return handleMinBetUpdated(context, returnValues)
    case 'TimeoutUpdated':
      return handleTimeoutUpdated(context, returnValues)
    case 'ReferralFeeUpdated':
      return handleReferralFeeUpdated(context, returnValues)
    case 'FeeUpdated':
      return handleFeeUpdated(context, returnValues)
  }
}

export const handleProxyUpgraded = async (
  { dispatch },
  { upgradedTo, upgradedFrom }
) => {
  await dispatch(
    'createNotification',
    `a new version of the RockPaperScissors contract has been deployed... be sure that you are using the correct version! old version: ${upgradedFrom} ${upgradedTo}`
  )
}

export const handlePaused = async ({ dispatch }) => {
  await dispatch('getPaused')
  await dispatch(
    'createNotification',
    'The game has been paused by the owner. Please check back later for the game to be unpaused.'
  )
}

export const handleUnpaused = async ({ dispatch }) => {
  await dispatch('getPaused')
  await dispatch(
    'createNotification',
    'The game has been unpaused by the owner. Good luck and have fun!'
  )
}

export const handleStageChanged = async ({ getters, dispatch }, { gameId }) => {
  const { coinbaseActiveGameIds, selectedGameId } = getters

  if (coinbaseActiveGameIds.includes(gameId)) {
    await dispatch('getGame', gameId)
  } else if (selectedGameId === gameId) {
    await dispatch('getGame', gameId)
  }
}

export const handleGameCreated = async (
  { getters, dispatch },
  { gameId, creator }
) => {
  const { coinbase } = getters

  if (coinbase == creator) {
    await dispatch('getCoinbaseActiveGameIds')
    await dispatch(
      'createNotification',
      `Your game (gameId: ${gameId}) has been created.`
    )
  }

  await dispatch('getJoinableGames')
}

export const handleGameCancelled = async (
  { getters, dispatch },
  { gameId, cancellor }
) => {
  const { coinbase } = getters

  if (coinbase == cancellor) {
    await dispatch('getCoinbaseActiveGameIds')
    await dispatch(
      'createNotification',
      `Your game (gameId: ${gameId}) has been cancelled.`
    )
  }

  await dispatch('getJoinableGames')
}

export const handleGameJoined = async (
  { getters, dispatch },
  { gameId, creator, joiner }
) => {
  const { coinbase } = getters

  if (coinbase == creator) {
    await dispatch(
      'createNotification',
      `Someone has joined your game! (gameId: ${gameId})`
    )
  }

  if (coinbase == joiner) {
    await dispatch('getCoinbaseActiveGameIds')
    await dispatch(
      'createNotification',
      `You have joined a new game! (gameId: ${gameId})`
    )
  }

  await dispatch('getJoinableGames')
}

export const handleChoiceCommitted = async (
  { getters, dispatch },
  { gameId, committer }
) => {
  const { coinbaseActiveGameIds } = getters
  if (coinbaseActiveGameIds.includes(gameId)) {
    await dispatch('getGame', gameId)

    const { coinbase, game } = getters

    const { choiceSecretP1, choiceSecretP2 } = game(gameId)

    if (coinbase === committer) {
      await dispatch(
        'createNotification',
        `You have locked in your secret choice for gameId ${gameId}`
      )
    } else {
      if (choiceSecretP1 === bytes32Zero || choiceSecretP2 === bytes32Zero) {
        dispatch(
          'createNotification',
          `Your opponent has has already committed! Make sure to commit before getting timed out! (gameId: ${gameId})`
        )
      }
    }
  }
}

export const handleChoiceRevealed = async (
  { getters, dispatch },
  { gameId, revealer }
) => {
  const { coinbaseActiveGameIds } = getters
  if (coinbaseActiveGameIds.includes(gameId)) {
    await dispatch('getGame', gameId)

    const { coinbase, game } = getters

    const { choiceP1, choiceP2 } = game(gameId)

    if (coinbase === revealer) {
      await dispatch(
        'createNotification',
        `You have revealed your choice for gameId ${gameId}`
      )
    } else {
      if (
        choiceEnum[choiceP1] === 'Undecided' ||
        choiceEnum[choiceP2] === 'Undecided'
      ) {
        dispatch(
          'createNotification',
          `Your opponent has has already revealed! Make sure to reveal before getting timed out! (gameId: ${gameId})`
        )
      }
    }
  }

  await dispatch('getTotalPlayCount')
}

export const handleTimeoutStarted = async (
  { getters, dispatch },
  { gameId, initiator, delayer }
) => {
  const { coinbase } = getters

  if (coinbase === initiator) {
    await dispatch(
      'createNotification',
      `You have successfully started a timeout for the game (gameId: ${gameId}).`
    )
  }

  if (coinbase === delayer) {
    await dispatch(
      'createNotification',
      `A game you are playing in has started a timeout! Hurry up and make a move before losing by default! (gameId: ${gameId})`
    )
  }
}

export const handleTimedOut = async (
  { getters, dispatch },
  { gameId, winner, loser }
) => {
  const { coinbase } = getters

  if (coinbase === winner) {
    await dispatch(
      'createNotification',
      `You have successfully timed out the game. You win by default! (gameId: ${gameId})`
    )
  }

  if (coinbase === loser) {
    await dispatch(
      'createNotification',
      `You took too long and lost by default! ${gameId}`
    )
  }

  await dispatch('getTotalWinCount')
}

export const handleTied = async (
  { getters, dispatch },
  { gameId, player1, player2 }
) => {
  const { coinbase } = getters

  if (coinbase === player1 || coinbase === player2) {
    await dispatch('createNotification', `You tied! (gameId: ${gameId})`)
  }

  await dispatch('getTotalWinCount')
}

export const handleWinnerDecided = async (
  { getters, dispatch },
  { gameId, winner, loser }
) => {
  const { coinbase } = getters

  if (coinbase === winner) {
    await dispatch('createNotification', `You won! ${gameId}`)
  }

  if (coinbase == loser) {
    await dispatch('createNotification', `You lost! ${gameId}`)
  }

  await dispatch('getTotalWinCount')
}

export const handleBetSettled = async (
  { getters, dispatch },
  { gameId, settler, winnings }
) => {
  const { coinbase } = getters

  if (coinbase === settler) {
    await dispatch(
      'createNotification',
      `Bet Settled. ${weiToEth(
        winnings
      )} has been credited to your account. (gameId: ${gameId})`
    )
  }

  await dispatch('getTotalWinVolume')
}

export const handleReferralSet = async (
  { getters, dispatch },
  { referrer, referree }
) => {
  const { coinbase } = getters

  if (coinbase === referrer) {
    await dispatch(
      'createNotification',
      `You have a new referral (address: ${referree}). Any future plays from this player will award you with referral fees.`
    )
  }
}

export const handleReferralPaid = async (
  { getters, dispatch },
  { referrer, referred, value }
) => {
  const { coinbase } = getters

  if (coinbase === referrer) {
    await dispatch(
      'createNotification',
      `You have received a referral payment of ${weiToEth(
        value
      )} from your referral of ${shortenAddress(referred)}`
    )
  }
}

export const handleMinBetUpdated = async (
  { dispatch },
  { oldMinBet, newMinBet }
) => {
  await dispatch('getMinBet')
  await dispatch(
    'createNotification',
    `Minimum bet has been updated from ${weiToEth(oldMinBet)} to ${weiToEth(
      newMinBet
    )}.`
  )
}

export const handleTimeoutUpdated = async (
  { dispatch },
  { oldTimeout, newTimeout }
) => {
  await dispatch('getTimeoutInSeconds')
  await dispatch(
    'createNotification',
    `timout has been updated from ${oldTimeout} to ${newTimeout}. This does not affect already timing out games.`
  )
}

// TODO: correctly set perMille as percent
export const handleReferralFeeUpdated = async (
  { dispatch },
  { oldReferralFee, newReferralFee }
) => {
  await dispatch('getReferralFeePerMille')
  await dispatch(
    'createNotification',
    `Referral Fee has been updated from ${oldReferralFee} to ${newReferralFee}.`
  )
}

// TODO: correctly set perMille as percent
export const handleFeeUpdated = async ({ dispatch }, { oldFee, newFee }) => {
  await dispatch('getFeePerMille')
  await dispatch(
    'createNotification',
    `Fee has been updated from ${oldFee} to ${newFee}`
  )
}

//
// end rps watcher related
//

//
// start rps retrieval related
//

export const getGameLogs = async ({ getters, commit }, gameId) => {
  const { rockPaperScissorsWs, currentBlock } = getters
  const fromBlock =
    currentBlock - blockWatchTime > 0 ? currentBlock - blockWatchTime : 0
  const toBlock = 'latest'
  const filter = { gameId }

  const options = {
    filter,
    fromBlock,
    toBlock
  }

  const stage = rockPaperScissorsWs.getPastEvents('StageChanged', options)
  const created = rockPaperScissorsWs.getPastEvents('GameCreated', options)
  const cancelled = rockPaperScissorsWs.getPastEvents('GameCancelled', options)
  const gameJoined = rockPaperScissorsWs.getPastEvents('GameJoined', options)
  const choiceCommitted = rockPaperScissorsWs.getPastEvents(
    'ChoiceCommitted',
    options
  )
  const choiceRevealed = rockPaperScissorsWs.getPastEvents(
    'ChoiceRevealed',
    options
  )
  const timeoutStarted = rockPaperScissorsWs.getPastEvents(
    'TimeoutStarted',
    options
  )
  const timedOut = rockPaperScissorsWs.getPastEvents('TimedOut', options)
  const tied = rockPaperScissorsWs.getPastEvents('Tied', options)
  const winnerDecided = rockPaperScissorsWs.getPastEvents(
    'WinnerDecided',
    options
  )
  const betSettled = rockPaperScissorsWs.getPastEvents('BetSettled', options)

  const [
    stageLogs,
    createdLogs,
    cancelledLogs,
    gameJoinedLogs,
    choiceCommittedLogs,
    choiceRevealedLogs,
    timeoutStartedLogs,
    timedOutLogs,
    tiedLogs,
    winnerDecidedLogs,
    betSettledLogs
  ] = await Promise.all([
    stage,
    created,
    cancelled,
    gameJoined,
    choiceCommitted,
    choiceRevealed,
    timeoutStarted,
    timedOut,
    tied,
    winnerDecided,
    betSettled
  ])

  const gameLogs = [
    ...stageLogs,
    ...createdLogs,
    ...cancelledLogs,
    ...gameJoinedLogs,
    ...choiceCommittedLogs,
    ...choiceRevealedLogs,
    ...timeoutStartedLogs,
    ...timedOutLogs,
    ...tiedLogs,
    ...winnerDecidedLogs,
    ...betSettledLogs
  ]

  commit('setGameLogs', { gameId, gameLogs })
}

export const getReferralPayments = async ({ getters, commit }) => {
  const { coinbase, rockPaperScissorsWs, currentBlock } = getters
  const fromBlock =
    currentBlock - blockWatchTime > 0 ? currentBlock - blockWatchTime : 0

  const events = await rockPaperScissorsWs.getPastEvents('ReferralPaid', {
    filter: { referrer: coinbase },
    fromBlock,
    toBlock: 'latest'
  })

  const referralPayments = events
    .sort((a, b) => a.blockNumber + a.logIndex - (b.blockNumber + b.logIndex))
    .map(e => {
      const {
        blockNumber,
        transactionIndex,
        returnValues: { referred, referrer, value, tokenAddress }
      } = e

      return {
        blockNumber,
        transactionIndex,
        referred,
        referrer,
        value,
        tokenAddress
      }
    })

  commit('setReferralPayments', referralPayments)
}

export const getBankActivity = async ({ getters, commit }) => {
  const { coinbase, bankWs, currentBlock } = getters
  const fromBlock =
    currentBlock - blockWatchTime > 0 ? currentBlock - blockWatchTime : 0
  const toBlock = 'latest'

  const fundsDeposited = bankWs.getPastEvents('FundsDeposited', {
    fromBlock,
    toBlock,
    filter: {
      depositor: coinbase
    }
  })
  const fundsAllocated = bankWs.getPastEvents('FundsAllocated', {
    fromBlock,
    toBlock,
    filter: {
      fundsOwner: coinbase
    }
  })
  const fundsDeAllocated = bankWs.getPastEvents('FundsDeAllocated', {
    fromBlock,
    toBlock,
    filter: {
      fundsOwner: coinbase
    }
  })
  const fundsTransferredFrom = bankWs.getPastEvents('FundsTransferred', {
    fromBlock,
    toBlock,
    filter: {
      from: coinbase
    }
  })
  const fundsTransferredTo = bankWs.getPastEvents('FundsTransferred', {
    fromBlock,
    toBlock,
    filter: {
      to: coinbase
    }
  })
  const fundsWithdrawn = bankWs.getPastEvents('FundsWithdrawn', {
    fromBlock,
    toBlock,
    filter: {
      fundsOwner: coinbase
    }
  })

  const [
    fundsDepositedLogs,
    fundsAllocatedLogs,
    fundsDeAllocatedLogs,
    fundsTransferredFromLogs,
    fundsTransferredToLogs,
    fundsWithdrawnLogs
  ] = await Promise.all([
    fundsDeposited,
    fundsAllocated,
    fundsDeAllocated,
    fundsTransferredFrom,
    fundsTransferredTo,
    fundsWithdrawn
  ])

  const bankActivity = [
    ...fundsDepositedLogs,
    ...fundsAllocatedLogs,
    ...fundsDeAllocatedLogs,
    ...fundsTransferredFromLogs,
    ...fundsTransferredToLogs,
    ...fundsWithdrawnLogs
  ]

  commit('setBankActivity', bankActivity)
}

//
// end rps retreiveal related
//
