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
    dispatch('mapUserToWedding', wedding)
    dispatch('createNotification', 'Your wedding has been created!')
  }
}

export const handleWeddingRemoved = ({ dispatch, rootGetters, commit }) => (
  wedding,
  partner1,
  partner2
) => {
  const { address } = rootGetters

  commit('removeWedding', wedding)

  if (address === partner1 || address === partner2) {
    dispatch('mapUserToWedding', wedding)
    dispatch('createNotification', 'Your wedding has been removed!')
  }
}

export const handleVowsUpdated = ({ dispatch, rootGetters }) => (
  wedding,
  partner
) => {
  const { address, userPartner } = rootGetters

  if (address === partner) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'Your wedding vows have been updated!')
  }

  if (address === userPartner) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch(
      'createNotification',
      "Your partner's wedding vows have been updated!"
    )
  }
}

export const handlePartnerAccepts = ({ rootGetters, dispatch }) => (
  wedding,
  partner
) => {
  const { address, userPartner } = rootGetters

  if (address === partner) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'You have said yes!')
  }

  if (address === userPartner) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'Your partner has said yes!')
  }
}

export const handleWeddingCancelled = ({ rootGetters, dispatch }) => (
  wedding,
  cancellor
) => {
  const { address, userPartner } = rootGetters

  if (address === cancellor) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'You have said no!')
  }

  if (address === userPartner) {
    dispatch('getCompleteWeddingData', wedding)
    dispatch('createNotification', 'Your partner has said no!')
  }
}

// TODO: implement handlers for event watchers
/* eslint-disable no-unused-vars */
export const handlePartnerDivorces = context => (wedding, partner) => {
  console.log('partner divorces', wedding, partner)
}

export const handleWeddingPhotoUpdated = context => (wedding, uri) => {
  console.log('wedding photo updated', wedding, uri)
}

export const handleMarried = context => (wedding, partner1, partner2) => {
  console.log('married', wedding, partner1, partner2)
}

export const handleDivorced = context => (wedding, partner1, partner2) => {
  console.log('divorced', wedding, partner1, partner2)
}

export const handleGiftReceived = context => (
  wedding,
  gifter,
  value,
  message
) => {
  console.log('gift received', wedding, gifter, value, message)
}

export const handleGiftClaimed = context => (wedding, claimer, value) => {
  console.log('gift claimed', wedding, claimer, value)
}

/* eslint-disable no-unused-vars */
