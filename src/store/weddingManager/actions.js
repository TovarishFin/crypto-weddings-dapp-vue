import { ethers } from 'ethers'
import deployments from 'crypto-weddings-contracts/deployments'
import { abi } from 'crypto-weddings-contracts/build/WeddingManager'

export const setupWeddingManager = ({ commit, getters }) => {
  const { provider, network } = getters
  const {
    [network]: { weddingManager: address }
  } = deployments

  const weddingManager = new ethers.Contract(address, abi, provider)
  commit('setWeddingManager', weddingManager)
}

export default setupWeddingManager
