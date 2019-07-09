import router from '@/router'
import { ethers, utils } from 'ethers'
import { abi as wmrAbi } from 'crypto-weddings-contracts/build/WeddingManager'
import deployments from 'crypto-weddings-contracts/deployments'
import { abi as wngAbi } from 'crypto-weddings-contracts/build/Wedding'
import { shortenAddress } from '@/utils/data'

export const watchWeddingManagerEvents = context => {
  const { getters } = context
  const { weddingManager } = getters

  weddingManager.on('WeddingAdded', handleWeddingAdded(context))
  weddingManager.on('VowsUpdated', handleVowsUpdated(context))
  weddingManager.on('PartnerAccepts', handlePartnerAccepts(context))
  weddingManager.on('PartnerDivorces', handlePartnerDivorces(context))
  weddingManager.on('WeddingPhotoUpdated', handleWeddingPhotoUpdated(context))
  weddingManager.on('WeddingCancelled', handleWeddingCancelled(context))
  weddingManager.on('Married', handleMarried(context))
  weddingManager.on('Divorced', handleDivorced(context))
  weddingManager.on('GiftReceived', handleGiftReceived(context))
  weddingManager.on('GiftClaimed', handleGiftClaimed(context))
  weddingManager.on(
    'UserPermissionUpdated',
    handleUserPermissonUpdated(context)
  )
  weddingManager.on('MinGiftAmountUpdated', handleMinGiftAmountUpdated(context))
  weddingManager.on(
    'ShouldHideGiftEventsUpdated',
    handleShouldHideGiftEventsUpdated(context)
  )
  weddingManager.on('Paused', handlePaused(context))
  weddingManager.on('Unpaused', handleUnpaused(context))
}

export const unwatchWeddingManagerEvents = ({ getters }) => {
  const { weddingManager } = getters

  weddingManager.removeAllListeners('WeddingAdded')
  weddingManager.removeAllListeners('WeddingRemoved')
  weddingManager.removeAllListeners('VowsUpdated')
  weddingManager.removeAllListeners('PartnerAccepts')
  weddingManager.removeAllListeners('PartnerDivorces')
  weddingManager.removeAllListeners('WeddingPhotoUpdated')
  weddingManager.removeAllListeners('WeddingCancelled')
  weddingManager.removeAllListeners('Married')
  weddingManager.removeAllListeners('Divorced')
  weddingManager.removeAllListeners('GiftReceived')
  weddingManager.removeAllListeners('GiftClaimed')
  weddingManager.removeAllListeners('UserPermissionUpdated')
  weddingManager.removeAllListeners('MinGiftAmountUpdated')
  weddingManager.removeAllListeners('ShouldHideGiftEventsUpdated')
  weddingManager.removeAllListeners('Paused')
  weddingManager.removeAllListeners('Unpaused')
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

export const handleVowsUpdated = ({ dispatch, rootGetters }) => (
  wedding,
  partner
) => {
  const { weddingCursor, address, userPartner } = rootGetters

  if (partner === address) {
    dispatch('getVows', wedding)
    dispatch('createNotification', 'Your wedding vows have been updated!')
  } else if (partner === userPartner) {
    const { wedding: weddingGetter } = rootGetters
    const { partner1, p1Name, p2Name } = weddingGetter(wedding)
    const name = userPartner === partner1 ? p1Name : p2Name
    dispatch('getVows', wedding)
    dispatch('createNotification', `${name}'s wedding vows have been updated!`)
  } else if (wedding === weddingCursor) {
    const { wedding: weddingGetter } = rootGetters
    const { partner1, p1Name, p2Name } = weddingGetter(wedding)
    const name = partner === partner1 ? p1Name : p2Name
    dispatch('getVows', wedding)
    dispatch('createNotification', `${name}'s wedding vows have been updated!`)
  }
}

export const handlePartnerAccepts = ({ rootGetters, dispatch }) => (
  wedding,
  partner
) => {
  const { weddingCursor, address, userPartner } = rootGetters

  if (partner === address) {
    dispatch('getAnswers', wedding)
    dispatch('createNotification', 'You have said yes!')
  } else if (partner === userPartner) {
    const { wedding: weddingGetter } = rootGetters
    const { partner1, p1Name, p2Name } = weddingGetter(wedding)
    const name = userPartner === partner1 ? p1Name : p2Name
    dispatch('getAnswers', wedding)
    dispatch('createNotification', `${name} has said yes!`)
  } else if (weddingCursor === wedding) {
    const { wedding: weddingGetter } = rootGetters
    const { partner1, p1Name, p2Name } = weddingGetter(wedding)
    const name = partner === partner1 ? p1Name : p2Name
    dispatch('getAnswers', wedding)
    dispatch('createNotification', `${name} has said yes!`)
  }
}

export const handleWeddingCancelled = ({ rootGetters, dispatch, commit }) => (
  wedding,
  cancellor
) => {
  const { weddingCursor, address, userPartner } = rootGetters

  if (cancellor === address) {
    commit('removeWedding', wedding)
    dispatch('getCompleteWeddingData', wedding)
    dispatch('mapUserToWedding')
    dispatch('createNotification', 'You have said no!')
  } else if (cancellor === userPartner) {
    const { wedding: weddingGetter } = rootGetters
    const { partner1, p1Name, p2Name } = weddingGetter(wedding)
    const name = userPartner === partner1 ? p1Name : p2Name
    commit('removeWedding', wedding)
    dispatch('getCompleteWeddingData', wedding)
    dispatch('mapUserToWedding')
    dispatch(
      'createNotification',
      `${name} has said no and the wedding is cancelled!`
    )
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
    const { wedding: weddingGetter } = rootGetters
    const { p1Name, p2Name } = weddingGetter(wedding)
    const name = address === partner1 ? p2Name : p1Name
    dispatch('getMarried', wedding)
    dispatch(
      'createNotification',
      `You are now married to ${name} on the blockchain, congratulations!`
    )
  } else if (wedding === weddingCursor) {
    const { wedding: weddingGetter } = rootGetters
    const { p1Name, p2Name } = weddingGetter(wedding)
    dispatch('getMarried', wedding)
    dispatch(
      'createNotification',
      `${p1Name} and ${p2Name} are now married on the blockchain!`
    )
  }
}

export const handlePartnerDivorces = ({ rootGetters, dispatch }) => (
  wedding,
  partner
) => {
  const { weddingCursor, address, userPartner } = rootGetters

  if (partner === address) {
    dispatch('getAnswers', wedding)
    dispatch('createNotification', 'You have submitted a divorce.')
  } else if (partner === userPartner) {
    const { wedding: weddingGetter } = rootGetters
    const { partner1, p1Name, p2Name } = weddingGetter(wedding)
    const name = userPartner === partner1 ? p1Name : p2Name
    dispatch('getAnswers', wedding)
    dispatch('createNotification', `${name} has submitted a divorce.`)
  } else if (wedding === weddingCursor) {
    dispatch('getAnswers', wedding)
    dispatch('createNotification', 'one of the two has submited a divorce.')
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

export const handleDivorced = ({ commit, rootGetters, dispatch }) => (
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
    commit('removeWedding', wedding)
    dispatch('getCompleteWeddingData', wedding)
    dispatch('mapUserToWedding')
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'Divorce complete.')
  }
}

export const handleGiftReceived = ({ rootGetters, dispatch }) => (
  wedding,
  gifter
) => {
  const { weddingCursor, address } = rootGetters

  if (gifter === address) {
    dispatch('getGiftBalance', wedding)
    dispatch('createNotification', 'Your gift has been sent!')
  } else if (weddingCursor === wedding) {
    dispatch('getGiftBalance', wedding)
    dispatch('createNotification', 'a gift has been sent!')
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
    const { wedding: weddingGetter } = rootGetters
    const { partner1, p1Name, p2Name } = weddingGetter(wedding)
    const name = userPartner === partner1 ? p1Name : p2Name
    dispatch('getGiftBalance', wedding)
    dispatch('createNotification', `${name} has claimed the wedding gifts!`)
  }
}

export const handleUserPermissonUpdated = ({ rootGetters, dispatch }) => (
  wedding,
  user,
  banned
) => {
  const { weddingCursor, weddingAddressOfUser, address } = rootGetters

  if (address === user) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch(
      'createNotification',
      `You have been ${banned ? 'banned' : 'unbanned'}!`
    )
  } else if (weddingCursor === wedding) {
    dispatch('getCompleteWeddingData', wedding)
  } else if (weddingAddressOfUser === wedding) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch(
      'createNotification',
      `user with address of ${shortenAddress(user)} has been ${
        banned ? 'banned' : 'unbanned'
      }`
    )
  }

  // TODO: update event filtering using this information
}

export const handleMinGiftAmountUpdated = ({ rootGetters, dispatch }) => (
  wedding,
  newGiftAmount
) => {
  const { weddingCursor, weddingAddressOfUser } = rootGetters

  if (wedding === weddingAddressOfUser) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch(
      'createNotification',
      `Your wedding's Minimum wedding gift amount has been updated to ${utils
        .formatEther(newGiftAmount)
        .toString()}`
    )
  } else if (wedding === weddingCursor) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch(
      'createNotification',
      `Minimum wedding gift amount has been updated to ${utils
        .formatEther(newGiftAmount)
        .toString()}`
    )
  }

  // TODO: update minGiftAmount state once that is part of normal flow
}

export const handleShouldHideGiftEventsUpdated = ({
  rootGetters,
  dispatch
}) => (wedding, shouldHideGiftEvents) => {
  const { weddingCursor, weddingAddressOfUser } = rootGetters

  if (wedding === weddingAddressOfUser) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch(
      'createNotification',
      `${
        shouldHideGiftEvents
          ? 'wedding gift events now hidden'
          : 'wedding gift events now showing'
      }`
    )
  } else if (wedding === weddingCursor) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch(
      'createNotification',
      `${
        shouldHideGiftEvents
          ? 'wedding owners have hidden wedding gift messages'
          : 'wedding owners have enabled wedding gift messages'
      }`
    )
  }
}

export const handlePaused = ({ commit, dispatch }) => () => {
  commit('setPaused', true)
  dispatch(
    'createNotification',
    'Weddings have been paused. No new weddings can be created at this time.'
  )
}

export const handleUnpaused = ({ commit, dispatch }) => () => {
  commit('setPaused', false)
  dispatch(
    'createNotification',
    'Weddings have been unpaused. New weddings can be now be created.'
  )
}

export const getWeddingGiftEvents = async (
  { rootGetters, commit },
  weddingAddress
) => {
  await commit('clearWeddingGiftEvents', weddingAddress)
  const { network } = rootGetters
  const {
    [network]: { deploymentBlock, weddingManager: address }
  } = deployments
  // we need a fresh provider in order to not retrigger events
  const provider =
    network === 'private'
      ? new ethers.providers.JsonRpcProvider('http://localhost:8545')
      : new ethers.getDefaultProvider(network)

  const wmr = new ethers.Contract(address, wmrAbi, provider)
  const filter = wmr.filters.GiftReceived(weddingAddress, null, null, null)
  wmr.removeAllListeners(filter)
  wmr.removeAllListeners('GiftReceived')
  wmr.on(filter, async (wedding, gifter, bigValue, message) => {
    const wng = new ethers.Contract(wedding, wngAbi, provider)
    const banned = await wng.banned(gifter)
    const value = utils.formatEther(bigValue.toString())
    const sanitizedMessage = banned ? 'best wishes!' : message

    commit('addGiftEvent', {
      wedding,
      gifter,
      value,
      message: sanitizedMessage
    })
  })
  provider.resetEventsBlock(deploymentBlock)
}
