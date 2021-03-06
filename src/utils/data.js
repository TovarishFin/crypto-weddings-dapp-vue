import sha3 from 'crypto-js/sha3'

export const addressZero = '0x' + '0'.repeat(40)

export const bytes32Zero = '0x' + '0'.repeat(64)

export const weddingZero = {
  address: addressZero,
  married: false,
  p1Answer: false,
  p1Name: '',
  p1Vows: '',
  p2Answer: false,
  p2Name: '',
  p2Vows: '',
  partner1: addressZero,
  partner2: addressZero,
  weddingPhoto: '',
  stage: 0
}

export const networkIdToName = id => {
  const idInt = parseInt(id)
  switch (idInt) {
    case 3:
      return 'ropsten'
    case 4:
      return 'rinkeby'
    case 42:
      return 'kovan'
    case 1:
      return 'mainnet'
    default:
      return 'private'
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
