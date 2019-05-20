import Statistics from '@/../contractsBuild/IStatistics'

export const setupStatisticsWs = async ({ getters, commit }) => {
  const { web3Ws, networkId } = getters
  const statisticsWs = await new web3Ws.eth.Contract(
    Statistics.abi,
    Statistics.networks[networkId].address
  )

  commit('setStatisticsWs', statisticsWs)
}

export const getTotalPlayCount = async ({ getters, commit }) => {
  const { statisticsWs } = getters
  const totalPlayCount = await statisticsWs.methods.totalPlayCount().call()

  commit('setTotalPlayCount', totalPlayCount)
}

export const getTotalWinCount = async ({ getters, commit }) => {
  const { statisticsWs } = getters
  const totalWinCount = await statisticsWs.methods.totalWinCount().call()

  commit('setTotalWinCount', totalWinCount)
}

export const getTotalWinVolume = async ({ getters, commit }) => {
  const { statisticsWs } = getters
  const totalWinVolume = await statisticsWs.methods.totalWinVolume().call()

  commit('setTotalWinVolume', totalWinVolume)
}

export const getTotalReferralCount = async ({ getters, commit }) => {
  const { statisticsWs } = getters
  const totalReferralCount = await statisticsWs.methods
    .totalReferralCount()
    .call()

  commit('setTotalReferralCount', totalReferralCount)
}

export const getTotalReferralVolume = async ({ getters, commit }) => {
  const { statisticsWs } = getters
  const totalReferralVolume = await statisticsWs.methods
    .totalReferralVolume()
    .call()

  commit('setTotalReferralVolume', totalReferralVolume)
}
