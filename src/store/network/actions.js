import Web3 from 'web3'
import ZeroClientProvider from 'web3-provider-engine/zero'
import { addressZero } from '../../utils/data'

const accountPollingDelay = 3000
const networkPollingDelay = 15000

// TODO: handle no metamask
export const setupWeb3Permissioned = async ({ commit }) => {
  let web3
  switch (true) {
    case !!window.ethereum:
      web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.enable()
        break
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }

      break

    case !!window.web3:
      web3 = new Web3(window.web3.currentProvider)
      break

    default:
      // TODO: change to mainnet when ready to go
      web3 = new Web3(
        ZeroClientProvider({
          static: {
            eth_syncing: false,
            web3_clientVersion: 'ZeroClientProvider'
          },
          getAccounts: cb => cb(null, []),
          rpcUrl: 'https://rinkeby.infura.io'
        })
      )
      break
  }

  commit('setWeb3', web3)
  return web3
}

export const setupWeb3 = ({ commit }) =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      let web3
      switch (true) {
        case !!window.ethereum:
          web3 = new Web3(window.ethereum)
          try {
            await window.ethereum.enable()
            break
          } catch (err) {
            reject(err)
          }

          break

        case !!window.web3:
          web3 = new Web3(window.web3.currentProvider)
          break

        default:
          // TODO: change to mainnet when ready to go
          web3 = new Web3(
            ZeroClientProvider({
              static: {
                eth_syncing: false,
                web3_clientVersion: 'ZeroClientProvider'
              },
              getAccounts: cb => cb(null, []),
              rpcUrl: 'https://rinkeby.infura.io'
            })
          )
          break
      }

      commit('setWeb3', web3)
      resolve(web3)
    })
  })

export const setupWeb3Ws = async ({ commit, getters }) => {
  const { network } = getters
  let web3Ws

  if (network === 'private') {
    web3Ws = new Web3('ws://localhost:8545')
  } else {
    web3Ws = new Web3(`wss://${network}.infura.io/ws`)
  }

  commit('setWeb3Ws', web3Ws)
  commit('setWeb3Ready', true)
}

export const getCoinbase = async ({ commit, getters }) => {
  const { web3 } = getters
  const accounts = await web3.eth.getAccounts()
  const coinbase = accounts[0]

  commit('setCoinbase', coinbase)
  commit('setCoinbaseReady', coinbase === addressZero ? false : true)
}

export const watchCoinbase = async ({ getters, commit }) => {
  const { coinbase: oldCoinbase, web3 } = getters

  try {
    const accounts = await web3.eth.getAccounts()
    const coinbase = accounts[0]

    if (coinbase !== oldCoinbase) {
      commit('setCoinbase', coinbase)
      commit('setCoinbaseReady', coinbase === addressZero ? false : true)
    }
  } catch (err) {
    commit('setCoinbaseReady', false)
    // eslint-disable-next-line no-console
    console.error(err)
  }

  setTimeout(
    async () => await watchCoinbase({ getters, commit }),
    accountPollingDelay
  )
}

export const getNetworkData = async ({ commit, getters }) => {
  const { web3Ws } = getters
  const network = await web3Ws.eth.net.getNetworkType()
  const networkId = await web3Ws.eth.net.getId()
  const currentBlock = await web3Ws.eth.getBlockNumber()
  commit('setNetworkData', {
    network,
    networkId,
    currentBlock
  })
}

export const watchNetwork = async ({ getters, commit }) => {
  const { network: oldNetwork, currentBlock: oldCurrentBlock, web3Ws } = getters
  try {
    const network = await web3Ws.eth.net.getNetworkType()
    const networkId = await web3Ws.eth.net.getId()
    const currentBlock = await web3Ws.eth.getBlockNumber()

    if (network !== oldNetwork || currentBlock !== oldCurrentBlock) {
      commit('setNetworkData', {
        network,
        networkId,
        currentBlock
      })
    }
  } catch (err) {
    commit('setCoinbaseReady', false)
    commit('setWeb3Ready', false)
    // eslint-disable-next-line no-console
    console.error(err)
  }

  setTimeout(
    async () => await watchNetwork({ getters, commit }),
    networkPollingDelay
  )
}

export const getWeb3Access = async ({ dispatch }) => {
  await dispatch('setupWeb3Permissioned')
  await dispatch('getCoinbase')
  await Promise.all([
    dispatch('setupRockPaperScissors'),
    dispatch('setupBank'),
    dispatch('setupWrappedEther'),
    dispatch('setupTestToken')
  ])
  await Promise.all([
    dispatch('getCoinbaseTokenUsage'),
    dispatch('getCoinbaseActiveGameIds')
  ])
  dispatch('watchCoinbase')
  dispatch('setHasGrantedWeb3Access', true)
}

export const bootstrapEth = async ({ dispatch, commit, getters }) => {
  await dispatch('setupWeb3Ws')
  await dispatch('getNetworkData')
  await Promise.all([
    dispatch('setupBankWs'),
    dispatch('setupRockPaperScissorsWs'),
    dispatch('setupWrappedEtherWs'),
    dispatch('setupTestTokenWs'),
    dispatch('setupStatisticsWs')
  ])
  await Promise.all([
    dispatch('getPaused'),
    dispatch('getTimeoutInSeconds'),
    dispatch('getReferralFeePerMille'),
    dispatch('getFeePerMille'),
    dispatch('getTotalPlayCount'),
    dispatch('getTotalWinCount'),
    dispatch('getTotalWinVolume'),
    dispatch('getTotalReferralVolume'),
    dispatch('getJoinableGames'),
    dispatch('getWethAddress')
  ])

  await commit('setEthReady', true)
  const { hasGrantedWeb3Access } = getters

  if (hasGrantedWeb3Access) {
    dispatch('getWeb3Access')
  } else {
    dispatch('setWeb3RequestOpen', true)
  }

  dispatch('watchNetwork')
  dispatch('watchBankEvents')
  dispatch('watchRockPaperScissorsEvents')
}

export const watchPendingTx = async ({ commit }, { tx, description }) => {
  tx.once('transactionHash', transactionHash =>
    commit('setSentTransaction', {
      transactionHash,
      status: 'pending',
      description
    })
  ).once('receipt', receipt =>
    commit('setSentTransaction', {
      ...receipt,
      status: 'complete',
      description
    })
  )
}
