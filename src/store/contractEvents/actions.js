import router from '@/router'

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
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'Your wedding vows have been updated!')
  } else if (address === userPartner) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch(
      'createNotification',
      "Your partner's wedding vows have been updated!"
    )
  } else if (weddingCursor === wedding) {
    dispatch('getCompleteWeddingData', wedding)
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
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'You have said yes!')
  } else if (address === userPartner) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'Your partner has said yes!')
  } else if (weddingCursor === wedding) {
    dispatch('getCompleteWeddingData', wedding)
    // TODO: retrieve name from already existing contract data and use in message
    dispatch('createNotification', 'one of them has said yes!')
  }
}

export const handleWeddingCancelled = ({ rootGetters, dispatch }) => (
  wedding,
  cancellor
) => {
  const { weddingCursor, address, userPartner } = rootGetters

  if (address === cancellor) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'You have said no!')
  } else if (address === userPartner) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'Your partner has said no!')
  } else if (wedding === weddingCursor) {
    dispatch('getCompleteWeddingData', wedding)
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
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'Your partner has said no!')
  } else if (wedding === weddingCursor) {
    dispatch('getCompleteWeddingData', wedding)
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
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'You have submitted your divorce!')
  } else if (address === userPartner) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'Your partner has submitted a divorce!')
  } else if (wedding === weddingCursor) {
    dispatch('getCompleteWeddingData', wedding)
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
    dispatch('getCompleteWeddingData', wedding)
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
    dispatch('createNotification', 'Your gift has been sent!')
  } else if (weddingCursor === wedding) {
    dispatch(
      'createNotification',
      `a gift has been sent! The message is: ${message}`
    )
  }
}

export const handleGiftClaimed = ({ rootGetters, dispatch }) => (
  _,
  claimer
) => {
  const { address, userPartner } = rootGetters

  if (address === claimer) {
    dispatch('createNotification', 'You have claimed the wedding gifts!')
  } else if (userPartner === claimer) {
    dispatch(
      'createNotification',
      'Your partner has claimed the wedding gifts!'
    )
  }
}
