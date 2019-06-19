const actionIdWatcher = store => {
  store.subscribe(async ({ type, payload }) => {
    switch (type) {
      case 'setAccountReady':
        if (payload) {
          await store.dispatch('setupWeddingManager')
          await store.dispatch('mapUserToWedding')
          await store.dispatch('getUserQrCode')

          store.dispatch('watchBalance')
          store.dispatch('checkConfirmableTransactions')
        }

        break

      case 'setUseMetaMask':
        store.dispatch('bootstrapEth')
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

      case 'setMetaMaskPollingInterval':
        clearInterval(store.getters.metaMaskPoller)
        store.dispatch('watchMetaMask')
        break

      default:
        break
    }
  })
}

export default actionIdWatcher
