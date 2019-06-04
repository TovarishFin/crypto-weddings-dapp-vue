const actionIdWatcher = store => {
  store.subscribe(async ({ type, payload }) => {
    switch (type) {
      case 'setAccountReady':
        if (payload) {
          store.dispatch('setupWeddingManager')
          store.dispatch('mapUserToWedding')
          store.dispatch('getUserQrCode')
          store.dispatch('watchBalance')
        }

        break

      case 'setWeddingCursor':
        store.dispatch('getCompleteWeddingData', payload)
        break

      case 'setPathDerivation':
        store.dispatch('bootstrapEth')
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
