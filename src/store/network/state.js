export default {
  network: 'mainnet',
  gasLimit: 5e6,
  customGasPrice: null,
  accountReady: false,
  providerReady: false,
  sentTransactions: {},
  useMetaMask: false,
  metaMaskPollingInterval: 2000,
  metaMaskPoller: null,
  skipConfirmations: false,
  blockingPendingTransactionHash: null
}
