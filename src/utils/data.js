import { toBN, toWei, fromWei } from 'web3-utils'
import sha3 from 'crypto-js/sha3'

export const isClient = () => typeof window === 'object' && window.document

export const addressZero = '0x' + '0'.repeat(40)

export const bytes32Zero = '0x' + '0'.repeat(64)

export const tokenZero = {
  name: 'Not Found',
  symbol: 'N/A',
  address: addressZero,
  balance: 0,
  depositedBalance: 0,
  allocatedBalance: 0
}

export const gameZero = {
  addressP1: addressZero,
  addressP2: addressZero,
  winner: addressZero,
  tokenAddress: addressZero,
  bet: 0,
  choiceP1: 0,
  choiceP2: 0,
  choiceSecretP1: bytes32Zero,
  choiceSecretP2: bytes32Zero,
  stage: 0,
  gameId: 0
}

export const stageEnum = {
  '0': 'Uninitialized',
  '1': 'Created',
  '2': 'Cancelled',
  '3': 'Ready',
  '4': 'Committed',
  '5': 'Timing Out',
  '6': 'Timed Out',
  '7': 'Tied',
  '8': 'Winner Decided',
  '9': 'Paid'
}

export const choiceEnum = {
  '0': 'Undecided',
  '1': 'Rock',
  '2': 'Paper',
  '3': 'Scissors'
}

export const decimals18 = toBN(10).pow(toBN(18))

export const decimalsAccuracy = toBN(10).pow(toBN(5))

export const ethToWei = eth => {
  return toWei(eth)
}

export const weiToEth = wei => {
  return fromWei(wei)
}

export const networkIdToName = id => {
  switch (id) {
    case 3:
      return 'ropsten'
    case 4:
      return 'rinkeby'
    case 42:
      return 'kovan'
    case 1:
      return 'mainnet'
    default:
      return 'mainnet'
  }
}

export const shortenAddress = address =>
  `${address.toLowerCase().slice(0, 6)}...${address.toLowerCase().slice(-6)}`

const isChecksumAddress = function(address) {
  // Check each case
  address = address.replace('0x', '')
  const addressHash = sha3(address.toLowerCase())
  for (let i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
    ) {
      return false
    }
  }

  return true
}

export const isAddress = function(address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    // If it's all small caps or all all caps, return true
    return true
  } else {
    // Otherwise check each case
    return isChecksumAddress(address)
  }
}
