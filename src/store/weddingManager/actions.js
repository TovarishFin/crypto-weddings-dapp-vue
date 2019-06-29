import { ethers, utils } from 'ethers'
import deployments from 'crypto-weddings-contracts/deployments'
import { abi } from 'crypto-weddings-contracts/build/WeddingManager'

export const setupWeddingManager = ({ commit, rootGetters }) => {
  const { provider, network, wallet } = rootGetters
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
  { name1, name2, partner2 }
) => {
  const { weddingManager } = getters
  const { gasLimit, customGasPrice } = rootGetters
  const config = parseInt(customGasPrice)
    ? { gasLimit, gasPrice: utils.parseUnits(customGasPrice, 'gwei') }
    : { gasLimit }

  const tx = await weddingManager.startWedding(name1, partner2, name2, config)

  dispatch('watchPendingTx', {
    tx,
    description: 'start wedding',
    blocking: true
  })
}

export const getWeddingsLength = async ({ getters, commit }) => {
  const { weddingManager } = getters

  const weddingsLength = await weddingManager.weddingsLength()

  commit('setWeddingsLength', weddingsLength.toString())
}

export const getWeddings = async ({ getters, dispatch }) => {
  const { weddingManager, weddingsLength: wedLenStr } = getters

  const weddingsLength = parseInt(wedLenStr)
  const start = weddingsLength >= 10 ? weddingsLength - 10 : 0
  const end = weddingsLength

  for (let i = start; i < end; i++) {
    const wedding = await weddingManager.weddings(i)
    dispatch('getBasicWeddingData', wedding)
  }
}

export const mapUserToWedding = async ({ getters, commit, rootGetters }) => {
  const { weddingManager } = getters
  const { address: userAddress } = rootGetters
  const weddingAddress = await weddingManager.weddingOf(userAddress)

  commit('setUserWeddingMap', { userAddress, weddingAddress })
  commit('setUserWeddingCursor', weddingAddress)
}

export const getWeddingExists = async ({ getters, commit }, weddingAddress) => {
  const { weddingManager } = getters

  try {
    const exists = await weddingManager.weddingExists(weddingAddress)
    commit('setWeddingExists', { weddingAddress, exists })
  } catch {
    commit('setWeddingExists', { weddingAddress, exists: false })
  }
}
