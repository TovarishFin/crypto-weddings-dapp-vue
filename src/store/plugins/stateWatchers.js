const actionIdWatcher = store => {
  // eslint-disable-next-line no-unused-vars
  store.subscribe(async ({ type, payload }) => {
    switch (type) {
      case 'setAccountReady':
        store.dispatch('setupWeddingManager')
        break
      default:
        break
    }
  })
}

export default actionIdWatcher
