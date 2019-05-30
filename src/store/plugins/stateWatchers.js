const actionIdWatcher = store => {
  store.subscribe(async ({ type, payload }) => {
    switch (type) {
      case 'setAccountReady':
        if (payload) store.dispatch('setupWeddingManager')

        break

      case 'setAddress':
        store.dispatch('mapUserToWedding', payload)
        break

      case 'setPathDerivation':
        store.dispatch('bootstrapEth')
        break

      case 'setWeddingCursor':
        store.dispatch('getCompleteWeddingData', payload)
        break

      case 'setNetwork':
        store.dispatch('bootstrapEth')
        break

      default:
        break
    }
  })
}

export default actionIdWatcher
