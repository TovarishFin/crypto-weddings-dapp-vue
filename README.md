# CryptoWeddings Dapp
This the new vue based Dapp to go with the CryptoWeddings smart contracts which recently rewritten.

## Stack
* Ethers
* Vue
* Vuex
* Vue Router
* Vuetify
* crypto-weddings-contracts

## Notable Features
* Marry on Blockchain
* Watch Wedding Live
* Send Wedding Gifts with Messages
* Set Wedding Photo
* Divorce (if needed)
* Integrated Wallet using Ethers
* Live Contract Events
* QR Code Scanning for ease of address use
* Voice API (chrome only) to say "I do" or "I don't" 

## Development

To develop locally, first pull the crypto-weddings repository and follow the README instructions.

Once setup, start a local blockchain in the contracts repo:
```
yarn start:blockchain
```

Then run (still in the contracts repo) to deploy the contracts locally:
```
yarn deploy:private
```

Last thing that needs to be done in the contracts repo is to link the contracts repo so that contract updates are immediately reflected instead of needing to reinstall smart contracts repo:
```
yarn link
```

In this repo you can then install dependencies:
```
yarn
```

Then link the smart contract repo:
```
yarn link crypto-weddings-contracts
```

To run a development server run:
```
yarn serve:dev
```

You should be ready to go at this point. You can seed the local instance with weddings using the smart contract repo. See other repo for more information.

## Building for Production
```
yarn build
```

## Deploying (to aws s3)
Everything is currently handled via Amazon aws... super duper decentralized... I know... sorry...

You will need to do the following steps in addtion to the below command:
* create cloudfront distribution with needed CNAME records
* request an ssl certicate using ACM
* point dns to route 53

The s3 bucket is created/updated automatically via deploy command. Cloudfront distributions are invalidated automatically as well. Make sure that DistributionId is set in `vue.config`

```
yarn deploy
```
