import { ethers } from 'ethers'
import deployments from 'crypto-weddings-contracts/deployments'
import { abi } from 'crypto-weddings-contracts/build/WeddingManager'

export const setupWeddingManager = ({ commit, getters }) => {
  const { provider, network, wallet } = getters
  const {
    [network]: { weddingManager: address }
  } = deployments

  const weddingManager =
    wallet && wallet.provider
      ? new ethers.Contract(address, abi, wallet)
      : new ethers.Contract(address, abi, provider)

  commit('setWeddingManager', weddingManager)
}

export const startWedding = async (
  { getters, dispatch, rootGetters },
  { name1, name2, partner2, weddingType }
) => {
  const { weddingManager } = getters
  const { gasLimit } = rootGetters
  const tx = await weddingManager.startWedding(
    name1,
    partner2,
    name2,
    weddingType,
    {
      gasLimit
    }
  )

  dispatch('watchPendingTx', { tx, description: 'start wedding' })
}

export const getWeddingsLength = async ({ getters, commit }) => {
  const { weddingManager } = getters

  const weddingsLength = await weddingManager.weddingsLength()

  commit('setWeddingsLength', weddingsLength.toString())
}
