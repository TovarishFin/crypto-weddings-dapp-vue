import { addressZero } from '../../utils/data'

export default {
  coinbase: addressZero,
  currentBlock: 0,
  network: 'ropsten', // TODO: find a way to dynamically set this for testing and testnet and mainnet!
  networkId: 0,
  coinbaseReady: false,
  web3Ready: false,
  web3: null,
  web3Ws: null,
  ethReady: false,
  sentTransactions: {}
}
