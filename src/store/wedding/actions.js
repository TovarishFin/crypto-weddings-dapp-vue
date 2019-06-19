import { ethers, utils } from 'ethers'
import { abi } from 'crypto-weddings-contracts/build/Wedding'
import moment from 'moment'

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
  weddingAddress
) => {
  const { provider } = getters
  await dispatch('getWeddingExists', weddingAddress)
  dispatch('getWeddingGiftEvents', weddingAddress)
  const { weddingExists } = getters
  if (!weddingExists(weddingAddress)) {
    return
  }

  const wedding = new ethers.Contract(weddingAddress, abi, provider)

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
    stage,
    balance
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
    wedding.stage(),
    provider.getBalance(weddingAddress)
  ])

  commit('setWedding', {
    address: weddingAddress,
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
    dateMarried: moment(parseInt(dateMarried.toString()) * 1000).format(
      'dddd, MMMM, Do YYYY'
    ),
    stage: parseInt(stage.toString()),
    balance: utils.formatEther(balance.toString())
  })
}

export const getVows = async ({ getters, commit }, weddingAddress) => {
  const { provider } = getters

  const wedding = new ethers.Contract(weddingAddress, abi, provider)

  const [p1Vows, p2Vows] = await Promise.all([
    wedding.p1Vows(),
    wedding.p2Vows()
  ])

  commit('setWedding', {
    address: weddingAddress,
    p1Vows,
    p2Vows
  })
}

export const getAnswers = async ({ getters, commit }, weddingAddress) => {
  const { provider } = getters

  const wedding = new ethers.Contract(weddingAddress, abi, provider)

  const [p1Answer, p2Answer] = await Promise.all([
    wedding.p1Answer(),
    wedding.p2Answer()
  ])

  commit('setWedding', {
    address: weddingAddress,
    p1Answer,
    p2Answer
  })
}

export const getMarried = async ({ getters, commit }, weddingAddress) => {
  const { provider } = getters

  const wedding = new ethers.Contract(weddingAddress, abi, provider)

  const [married, dateMarried, stage] = await Promise.all([
    wedding.married(),
    wedding.dateMarried(),
    wedding.stage()
  ])

  commit('setWedding', {
    address: weddingAddress,
    married,
    dateMarried: moment(parseInt(dateMarried.toString()) * 1000).format(
      'dddd, MMMM, Do YYYY'
    ),
    stage: parseInt(stage.toString())
  })
}

export const getWeddingPhoto = async ({ getters, commit }, weddingAddress) => {
  const { provider } = getters

  const wedding = new ethers.Contract(weddingAddress, abi, provider)

  const weddingPhoto = await wedding.weddingPhoto()

  commit('setWedding', {
    address: weddingAddress,
    weddingPhoto
  })
}

export const getGiftBalance = async ({ getters, commit }, weddingAddress) => {
  const { provider } = getters

  const balance = await provider.getBalance(weddingAddress)

  commit('setWedding', {
    address: weddingAddress,
    balance: utils.formatEther(balance.toString())
  })
}

export const updateVows = async ({ rootGetters, getters, dispatch }, vows) => {
  const { wallet, userWeddingCursor } = getters
  const { gasLimit, customGasPrice } = rootGetters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)
  const config = parseInt(customGasPrice)
    ? { gasLimit, gasPrice: utils.parseUnits(customGasPrice, 'gwei') }
    : { gasLimit }

  const tx = await wedding.updateVows(vows, config)
  dispatch('watchPendingTx', { tx, description: 'update vows' })
}

export const acceptProposal = async ({ rootGetters, getters, dispatch }) => {
  const { wallet, userWeddingCursor } = getters
  const { gasLimit, customGasPrice } = rootGetters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)
  const config = parseInt(customGasPrice)
    ? { gasLimit, gasPrice: utils.parseUnits(customGasPrice, 'gwei') }
    : { gasLimit }

  const tx = await wedding.acceptProposal(config)

  dispatch('watchPendingTx', { tx, description: 'accept proposal' })
}

export const rejectProposal = async ({ rootGetters, getters, dispatch }) => {
  const { wallet, userWeddingCursor } = getters
  const { gasLimit, customGasPrice } = rootGetters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)
  const config = parseInt(customGasPrice)
    ? { gasLimit, gasPrice: utils.parseUnits(customGasPrice, 'gwei') }
    : { gasLimit }

  const tx = await wedding.rejectProposal(config)

  dispatch('watchPendingTx', { tx, description: 'reject proposal' })
}

export const updateWeddingPhoto = async (
  { rootGetters, getters, dispatch },
  weddingPhoto
) => {
  const { wallet, userWeddingCursor } = getters
  const { gasLimit, customGasPrice } = rootGetters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)
  const config = parseInt(customGasPrice)
    ? { gasLimit, gasPrice: utils.parseUnits(customGasPrice, 'gwei') }
    : { gasLimit }

  const tx = await wedding.updateWeddingPhoto(weddingPhoto, config)

  dispatch('watchPendingTx', { tx, description: 'update wedding photo' })
}

export const claimWeddingGifts = async ({ rootGetters, getters, dispatch }) => {
  const { wallet, userWeddingCursor } = getters
  const { gasLimit, customGasPrice } = rootGetters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)
  const config = parseInt(customGasPrice)
    ? { gasLimit, gasPrice: utils.parseUnits(customGasPrice, 'gwei') }
    : { gasLimit }

  const tx = await wedding.claimWeddingGifts(config)

  dispatch('watchPendingTx', { tx, description: 'claim wedding gifts' })
}

export const sendWeddingGift = async (
  { rootGetters, getters, dispatch },
  { message, smallValue }
) => {
  const { wallet, weddingCursor } = getters
  const { gasLimit, customGasPrice } = rootGetters
  const wedding = new ethers.Contract(weddingCursor, abi, wallet)
  const value = utils.parseEther(smallValue.toString(), 'wei')
  const config = parseInt(customGasPrice)
    ? { value, gasLimit, gasPrice: utils.parseUnits(customGasPrice, 'gwei') }
    : { value, gasLimit }

  const tx = await wedding.sendWeddingGift(message, config)

  dispatch('watchPendingTx', { tx, description: 'send wedding gift' })
}

export const divorce = async ({ rootGetters, getters, dispatch }) => {
  const { wallet, userWeddingCursor } = getters
  const { gasLimit, customGasPrice } = rootGetters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)
  const config = parseInt(customGasPrice)
    ? { gasLimit, gasPrice: utils.parseUnits(customGasPrice, 'gwei') }
    : { gasLimit }

  const tx = await wedding.divorce(config)

  dispatch('watchPendingTx', { tx, description: 'divorce' })
}

export const updateMinGiftAmount = async (
  { rootGetters, getters, dispatch },
  minGiftAmount
) => {
  const { wallet, userWeddingCursor } = getters
  const { gasLimit, customGasPrice } = rootGetters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)
  const config = parseInt(customGasPrice)
    ? { gasLimit, gasPrice: utils.parseUnits(customGasPrice, 'gwei') }
    : { gasLimit }

  const tx = await wedding.updateMinGiftAmount(
    utils.parseEther(minGiftAmount.toString(), 'wei'),
    config
  )

  dispatch('watchPendingTx', { tx, description: 'update minimum gift amount' })
}

export const updateUserPermissions = async (
  { rootGetters, getters, dispatch },
  { user, banned }
) => {
  const { wallet, userWeddingCursor } = getters
  const { gasLimit, customGasPrice } = rootGetters
  const wedding = new ethers.Contract(userWeddingCursor, abi, wallet)
  const config = parseInt(customGasPrice)
    ? { gasLimit, gasPrice: utils.parseUnits(customGasPrice, 'gwei') }
    : { gasLimit }

  const tx = await wedding.updateUserPermissions(user, banned, config)

  dispatch('watchPendingTx', {
    tx,
    description: `${banned ? 'ban' : 'unban'} user`
  })
}
