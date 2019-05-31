import router from '@/router'
import { ethers } from 'ethers'
import { abi } from 'crypto-weddings-contracts/build/WeddingManager'
import deployments from 'crypto-weddings-contracts/deployments'

export const watchWeddingManagerEvents = context => {
  const { getters } = context
  const { weddingManager } = getters

  weddingManager.on('WeddingAdded', handleWeddingAdded(context))
  weddingManager.on('WeddingRemoved', handleWeddingRemoved(context))
  weddingManager.on('VowsUpdated', handleVowsUpdated(context))
  weddingManager.on('PartnerAccepts', handlePartnerAccepts(context))
  weddingManager.on('PartnerDivorces', handlePartnerDivorces(context))
  weddingManager.on('WeddingPhotoUpdated', handleWeddingPhotoUpdated(context))
  weddingManager.on('WeddingCancelled', handleWeddingCancelled(context))
  weddingManager.on('Married', handleMarried(context))
  weddingManager.on('Divorced', handleDivorced(context))
  weddingManager.on('GiftReceived', handleGiftReceived(context))
  weddingManager.on('GiftClaimed', handleGiftClaimed(context))
}

export const handleWeddingAdded = ({ dispatch, rootGetters }) => (
  wedding,
  partner1,
  partner2
) => {
  const { address } = rootGetters

  dispatch('getBasicWeddingData', wedding)

  if (address === partner1 || address === partner2) {
    dispatch('mapUserToWedding')
    dispatch('createNotification', 'Your wedding has been created!')
    router.push(`/wedding/${wedding}`)
  }
}

export const handleWeddingRemoved = ({ dispatch, rootGetters, commit }) => (
  wedding,
  partner1,
  partner2
) => {
  const { weddingCursor, address } = rootGetters

  commit('removeWedding', wedding)

  if (address === partner1 || address === partner2) {
    dispatch('mapUserToWedding')
    dispatch('createNotification', 'Your wedding has been removed!')
  } else if (wedding === weddingCursor) {
    dispatch('createNotification', 'The wedding has been removed!')
  }
}

export const handleVowsUpdated = ({ dispatch, rootGetters }) => (
  wedding,
  partner
) => {
  const { weddingCursor, address, userPartner } = rootGetters

  if (address === partner) {
    dispatch('getVows', wedding)
    dispatch('createNotification', 'Your wedding vows have been updated!')
  } else if (address === userPartner) {
    dispatch('getVows', wedding)
    dispatch(
      'createNotification',
      "Your partner's wedding vows have been updated!"
    )
  } else if (weddingCursor === wedding) {
    dispatch('getVows', wedding)
    // TODO: retrieve name from already existing contract data and use in message
    dispatch('createNotification', 'one of them has updated their vows!')
  }
}

export const handlePartnerAccepts = ({ rootGetters, dispatch }) => (
  wedding,
  partner
) => {
  const { weddingCursor, address, userPartner } = rootGetters

  if (address === partner) {
    dispatch('getAnswers', wedding)
    dispatch('createNotification', 'You have said yes!')
  } else if (address === userPartner) {
    dispatch('getAnswers', wedding)
    dispatch('createNotification', 'Your partner has said yes!')
  } else if (weddingCursor === wedding) {
    dispatch('getAnswers', wedding)
    // TODO: retrieve name from already existing contract data and use in message
    dispatch('createNotification', 'one of them has said yes!')
  }
}

export const handleWeddingCancelled = ({ rootGetters, dispatch, commit }) => (
  wedding,
  cancellor
) => {
  const { weddingCursor, address, userPartner } = rootGetters

  if (address === cancellor) {
    commit('removeWedding', wedding)
    dispatch('createNotification', 'You have said no!')
  } else if (address === userPartner) {
    commit('removeWedding', wedding)
    dispatch('createNotification', 'Your partner has said no!')
  } else if (wedding === weddingCursor) {
    commit('removeWedding', wedding)
    dispatch('createNotification', 'The wedding has been cancelled!')
  }
}

export const handleMarried = ({ rootGetters, dispatch }) => (
  wedding,
  partner1,
  partner2
) => {
  const { address, weddingCursor } = rootGetters

  if (address === partner1 || address === partner2) {
    dispatch('getMarried', wedding)
    dispatch('createNotification', 'Your partner has said no!')
  } else if (wedding === weddingCursor) {
    dispatch('getMarried', wedding)
    // TODO: get names and use in the notification...
    dispatch('createNotification', 'they are married!')
  }
}

export const handlePartnerDivorces = ({ rootGetters, dispatch }) => (
  wedding,
  partner
) => {
  const { weddingCursor, address, userPartner } = rootGetters

  if (address === partner) {
    dispatch('getAnswers', wedding)
    dispatch('createNotification', 'You have submitted your divorce!')
  } else if (address === userPartner) {
    dispatch('getAnswers', wedding)
    dispatch('createNotification', 'Your partner has submitted a divorce!')
  } else if (wedding === weddingCursor) {
    dispatch('getAnswers', wedding)
    // TODO: get names and use them here...
    dispatch('createNotification', 'one of them has filed for divorce...')
  }
}

export const handleWeddingPhotoUpdated = ({
  rootGetters,
  dispatch
}) => wedding => {
  const { weddingCursor } = rootGetters

  if (wedding === weddingCursor) {
    dispatch('getWeddingPhoto', wedding)
  }
}

export const handleDivorced = ({ rootGetters, dispatch }) => (
  wedding,
  partner1,
  partner2
) => {
  const { weddingCursor, address } = rootGetters

  if (
    address === partner1 ||
    address === partner2 ||
    weddingCursor === wedding
  ) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'Divorce complete.')
  }
}

export const handleGiftReceived = ({ rootGetters, dispatch }) => (
  wedding,
  gifter,
  _,
  message
) => {
  // TODO: make a setting which will dictate whether or not messages are shown...
  const { weddingCursor, address } = rootGetters

  // TODO: will need to do something else here as well in order to record events and display them...
  if (gifter === address) {
    dispatch('getGiftBalance', wedding)
    dispatch('createNotification', 'Your gift has been sent!')
  } else if (weddingCursor === wedding) {
    dispatch('getGiftBalance', wedding)
    dispatch(
      'createNotification',
      `a gift has been sent! The message is: ${message}`
    )
  }
}

export const handleGiftClaimed = ({ rootGetters, dispatch }) => (
  wedding,
  claimer
) => {
  const { address, userPartner } = rootGetters

  if (address === claimer) {
    dispatch('getGiftBalance', wedding)
    dispatch('createNotification', 'You have claimed the wedding gifts!')
  } else if (userPartner === claimer) {
    dispatch('getGiftBalance', wedding)
    dispatch(
      'createNotification',
      'Your partner has claimed the wedding gifts!'
    )
  }
}

export const getWeddingGiftEvents = async (
  { rootGetters, commit },
  weddingAddress
) => {
  const { network } = rootGetters
  const {
    [network]: { weddingManager: address }
  } = deployments
  // we need a fresh provider in order to not retrigger events
  const provider =
    network === 'private'
      ? new ethers.providers.JsonRpcProvider('http://localhost:8545')
      : new ethers.getDefaultProvider(network)

  const wmr = new ethers.Contract(address, abi, provider)
  const filter = wmr.filters.GiftReceived(weddingAddress, null, null, null)
  wmr.on(filter, (_, gifter, __, message) => {
    commit('addGiftEvent', { weddingAddress, gifter, message })
  })

  // TODO: change this to a more reasonable number...
  provider.resetEventsBlock(0)
}
