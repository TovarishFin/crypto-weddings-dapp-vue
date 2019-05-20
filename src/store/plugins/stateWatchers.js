import { isAddress, addressZero } from '@/utils/data'

const actionIdWatcher = store => {
  store.subscribe(async ({ type, payload }) => {
    switch (type) {
      case 'setCoinbase':
        store.dispatch('getCoinbaseActiveGameIds')
        store.dispatch('getCoinbaseTokenUsage')
        break
      case 'setCoinbaseTokenUsage':
        await store.dispatch('deleteTokenData')
        store.dispatch('populateTokenData')
        break

      case 'setSelectedTokenAddress':
        if (isAddress(payload) && payload !== addressZero) {
          store.dispatch('getTokenDataOf', payload)
        }

        break

      case 'setJoinableGames':
        await store.dispatch('populateJoinableGames')

        break

      case 'setCoinbaseActiveGameIds':
        await store.dispatch('populateCoinbaseActiveGames')
        break

      case 'setSelectedGameId':
        await store.dispatch('getGame', payload)
        break

      case 'setGame':
        if (
          isAddress(payload.game.tokenAddress) &&
          payload.game.tokenAddress !== addressZero
        ) {
          store.dispatch('getTokenDataOf', payload.game.tokenAddress)
        }

        break

      default:
        break
    }
  })
}

export default actionIdWatcher
