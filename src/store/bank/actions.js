import Bank from '@/../contractsBuild/Bank'
import TestToken from '@/../contractsBuild/TestToken'
import WrappedEther from '@/../contractsBuild/WrappedEther'
import IERC20Extended from '@/../contractsBuild/IERC20Extended'
import { toBN } from 'web3-utils'

//
// start setup related
//

export const setupBank = async ({ commit, getters }) => {
  const { web3, networkId } = getters
  const bank = new web3.eth.Contract(Bank.abi, Bank.networks[networkId].address)

  commit('setBank', bank)
}

export const setupBankWs = async ({ commit, getters }) => {
  const { web3Ws, networkId } = getters

  const bank = new web3Ws.eth.Contract(
    Bank.abi,
    Bank.networks[networkId].address
  )

  commit('setBankWs', bank)
}

export const setupWrappedEther = async ({ commit, getters }) => {
  const { web3, networkId } = getters
  const weth = new web3.eth.Contract(
    WrappedEther.abi,
    WrappedEther.networks[networkId].address
  )

  commit('setWrappedEther', weth)
}

export const setupWrappedEtherWs = async ({ commit, getters }) => {
  const { web3Ws, networkId } = getters

  const weth = new web3Ws.eth.Contract(
    WrappedEther.abi,
    WrappedEther.networks[networkId].address
  )

  commit('setWrappedEtherWs', weth)
}

export const setupTestToken = async ({ commit, getters }) => {
  const { web3, networkId } = getters
  const testToken = new web3.eth.Contract(
    TestToken.abi,
    TestToken.networks[networkId].address
  )

  commit('setTestToken', testToken)
}

export const setupTestTokenWs = async ({ commit, getters }) => {
  const { web3Ws, networkId } = getters

  const testToken = new web3Ws.eth.Contract(
    TestToken.abi,
    TestToken.networks[networkId].address
  )

  commit('setTestTokenWs', testToken)
}

//
// end setup related
//

//
// start contract getters
//

export const getWethAddress = async ({ commit, getters }) => {
  const { bankWs } = getters
  const wethAddress = await bankWs.methods.weth().call()
  commit('setWethAddress', wethAddress)
}

export const getCoinbaseTokenUsage = async ({ commit, getters }) => {
  const { bankWs, coinbase } = getters
  const usage = await bankWs.methods.getAllUsedTokens(coinbase).call()
  commit('setCoinbaseTokenUsage', usage)
}

export const getTokenDataOf = async (
  { commit, getters, dispatch },
  tokenAddress
) => {
  const { web3Ws, bankWs, coinbase } = getters
  try {
    const erc20 = new web3Ws.eth.Contract(IERC20Extended.abi, tokenAddress)
    const data = await Promise.all([
      erc20.methods.name().call(),
      erc20.methods.symbol().call(),
      erc20.methods.decimals().call(),
      erc20.methods.balanceOf(coinbase).call(),
      bankWs.methods.tokenBalanceOf(coinbase, tokenAddress).call(),
      bankWs.methods.allocatedTokensOf(coinbase, tokenAddress).call()
    ])
    const tokenData = {
      name: data[0],
      symbol: data[1],
      decimals: data[2],
      balance: data[3],
      depositedBalance: data[4],
      allocatedBalance: data[5],
      address: tokenAddress
    }

    commit('setTokenDataOf', tokenData)
  } catch (err) {
    dispatch(
      'createNotification',
      'that is NOT valid ERC20 token address which uses 18 decimals, has a name, and has a symbol.'
    )
  }
}

export const populateTokenData = async ({ dispatch, getters }) => {
  const { coinbaseTokenUsage } = getters
  const promises = []
  for (const tokenAddress of coinbaseTokenUsage) {
    promises.push(dispatch('getTokenDataOf', tokenAddress))
  }

  await Promise.all(promises)
}

//
// end contract getters
//

//
// start contract setters
//

export const depositEtherFor = async (
  { getters, dispatch },
  { userAddress, value }
) => {
  const { bank, coinbase } = getters
  const tx = bank.methods.depositEtherFor(userAddress).send({
    from: coinbase,
    value: value.toString()
  })

  dispatch('watchPendingTx', { tx, description: 'Deposit Ether For' })
}

export const depositEther = async ({ getters, dispatch }, value) => {
  const { bank, coinbase } = getters
  const tx = bank.methods.depositEther().send({
    from: coinbase,
    value: value.toString()
  })

  dispatch('watchPendingTx', { tx, description: 'Deposit Ether' })
}

export const withdrawEther = async ({ getters, dispatch }, value) => {
  const { bank, coinbase } = getters
  const tx = bank.methods.withdrawEther(value.toString()).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Withdraw Ether' })
}

export const depositTokens = async (
  { getters, dispatch },
  { tokenAddress, value }
) => {
  const { bank, coinbase } = getters
  const tx = bank.methods.depositTokens(tokenAddress, value.toString()).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Deposit Tokens' })
}

export const withdrawTokens = async (
  { getters, dispatch },
  { tokenAddress, value }
) => {
  const { bank, coinbase } = getters
  const tx = bank.methods.withdrawTokens(tokenAddress, value.toString()).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'Withdraw Tokens' })
}

export const batchDepositTokens = async (
  { getters, dispatch },
  { tokenAddress, value }
) => {
  const { web3, bank, coinbase } = getters
  const erc20 = new web3.eth.Contract(IERC20Extended.abi, tokenAddress)

  const approve = erc20.methods
    .approve(bank._address, value.toString())
    .send({ from: coinbase })
  const deposit = bank.methods
    .depositTokens(tokenAddress, value.toString())
    .send({ from: coinbase })

  dispatch('watchPendingTx', { tx: approve, description: 'Approve Tokens' })
  dispatch('watchPendingTx', { tx: deposit, description: 'Deposit Tokens' })
}

export const mintTestToken = async ({ getters, dispatch }) => {
  const { testToken, coinbase } = getters
  const tx = testToken.methods.mint(coinbase, toBN(5e18).toString()).send({
    from: coinbase
  })

  dispatch('watchPendingTx', { tx, description: 'mint test tokens' })
}

//
// end contract setters
//

//
// start local state setters
//

export const setSelectedTokenAddress = ({ commit }, tokenAddress) => {
  commit('setSelectedTokenAddress', tokenAddress)
}

export const deleteTokenData = ({ commit }) => {
  commit('setTokenData', {})
}

//
// end local state setters
//
