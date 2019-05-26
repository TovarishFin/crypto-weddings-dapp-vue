const actionIdWatcher = store => {
  store.subscribe(async ({ type, payload }) => {
    switch (type) {
      case 'setAccountReady':
        store.dispatch('setupWeddingManager')
        break

      case 'setAddress':
        store.dispatch('mapUserToWedding', payload)
        break

      case 'setWeddingCursor':
        store.dispatch('getCompleteWeddingData', payload)
        break

      default:
        break
    }
  })
}

export default actionIdWatcher
