import { ethers } from 'ethers'
import { abi } from 'crypto-weddings-contracts/build/Wedding'

export const getBasicWeddingData = async ({ getters, commit }, address) => {
  const { provider } = getters

  try {
    const wedding = new ethers.Contract(address, abi, provider)

    const [p1Name, p2Name, partner1, partner2, stage] = await Promise.all([
      wedding.p1Name(),
      wedding.p2Name(),
      wedding.partner1(),
      wedding.partner2(),
      wedding.stage()
    ])

    commit('setWedding', {
      p1Name,
      p2Name,
      partner1,
      partner2,
      stage: parseInt(stage.toString()),
      address
    })
  } catch {
    commit('removeWedding', address)
  }
}

export const getCompleteWeddingData = async (
  { getters, commit, dispatch },
  address
) => {
  const { provider } = getters
  await dispatch('getWeddingExists', address)
  const { weddingExists } = getters
  if (!weddingExists(address)) {
    return
  }

  const wedding = new ethers.Contract(address, abi, provider)

  const [
    partner1,
    partner2,
    p1Name,
    p2Name,
    p1Vows,
    p2Vows,
    weddingPhoto,
    p1Answer,
    p2Answer,
    married,
    dateMarried,
    weddingType,
    stage
  ] = await Promise.all([
    wedding.partner1(),
    wedding.partner2(),
    wedding.p1Name(),
    wedding.p2Name(),
    wedding.p1Vows(),
    wedding.p2Vows(),
    wedding.weddingPhoto(),
    wedding.p1Answer(),
    wedding.p2Answer(),
    wedding.married(),
    wedding.dateMarried(),
    wedding.weddingType(),
    wedding.stage()
  ])

  commit('setWedding', {
    address,
    partner1,
    partner2,
    p1Name,
    p2Name,
    p1Vows,
    p2Vows,
    weddingPhoto,
    p1Answer,
    p2Answer,
    married,
    dateMarried,
    weddingType,
    stage: parseInt(stage.toString())
  })
}

export const updateVows = async ({ rootGetters, getters, dispatch }, vows) => {
  const { wallet, userWeddingCursor } = getters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)
  const { gasLimit } = rootGetters

  const tx = await wedding.updateVows(vows, { gasLimit })

  dispatch('watchPendingTx', { tx, description: 'vows updating' })
}

export const acceptProposal = async ({ rootGetters, getters, dispatch }) => {
  const { wallet, userWeddingCursor } = getters
  const { gasLimit } = rootGetters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)

  const tx = await wedding.acceptProposal({ gasLimit })

  dispatch('watchPendingTx', { tx, description: 'accept proposal' })
}

export const rejectProposal = async ({ rootGetters, getters, dispatch }) => {
  const { wallet, userWeddingCursor } = getters
  const { gasLimit } = rootGetters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)

  const tx = await wedding.rejectProposal({ gasLimit })

  dispatch('watchPendingTx', { tx, description: 'reject proposal' })
}
