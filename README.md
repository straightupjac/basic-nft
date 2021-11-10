# Basic NFT
## Prerequisites
1. Have access to the public and private key to your Ethereum account - make an account on Coinbase Wallet
2. Have an [alchemy](https://www.alchemy.com/) account set-up. You can sign up for free to start with.
3. Preload your account with testnet tokens - search up faucets for your chosen testnet

## Dependencies
Hardhat
```
npm install --save-dev hardhat
```

Dotenv
```
npm install dotenv --save
```

Ethers.js
```
npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

```
OpenZeppelin
```
npm install @openzeppelin/contracts
```
Alchemy web3
```
npm install @alch/alchemy-web3
```

## Setup
Copy the .sample-env file to .env
```
cp .sample-env .env
```
1. Fill out `PUBLIC_KEY` and `PRIVATE_KEY`. `.env` is already in `.gitignore` but it’s not a bad idea to double check because you should never commit your private keys anywhere.
2. Fill in your alchemy API key for `RINKEBY_API_URL` and/or `ROPSTEN_API_URL`
3. Contract address is the address for the deployed contract and will be filled in later after you deploy.
    - If you are <b>only minting</b> then you can put the address of an existing contract that you <b>own or have minting rights on</b> here and skip to the steps to mint section.

## Setting up Metadata and Media
You can host the images and metadata on IPFS or S3 or any other provider. I suggest using [pinata](https://www.pinata.cloud/).

The recommended schema for metadata is: (all fields are optional)
```
{
  “description”: “”,
  “external_url”: “”,
  “image”: “”,
  “name”: “”,
  “attributes”: [
      {
          “trait_type”: “”,
          “value”: “”
      }
  ]
}
```

The recommended schema for a collection is:
```
{
  “name”: “”,
  “description”: “”,
  “image”: “”,
  “external_link”: “”,
  “seller_fee_basis_points”: 0, # Indicates a 1% seller fee.
  “fee_recipient”: “” # Where seller fees will be paid to.
}
```

After setting up all your metadata, upload them to IPFS/S3 etc. and make sure you have the links handy.

Go to `contracts/CoinbaseNFT.sol` and edit the `setCollectionURI(“...“);` to be populated with the new collection metadata you created.

Compile the contract.
```
npx hardhat compile
```
If all is well after compiling, you should be ready to deploy.

## Steps to Deploy
1. Make a copy of `.sample-env` and fill it out
    ```
    cp .sample-env .env
    ```
2. Make any modifications the smart contract in `./contract` and deploy script in `./script/deploy.js`
3. Compile the contract
    ```
    npx hardhat compile
    ```
4. Deploy the contract
    ```
    npx hardhat run scripts/deploy.js --network rinkeby
    ```
    You should see something like `Contract deployed to address: 0x...`
    Go to the [Ropsten](https://ropsten.etherscan.io/) or [Rinkeby](https://rinkeby.etherscan.io/) etherscan to verify this (search up the address).

## Steps to Mint
1. Add the address of the contract you deployed to the `.env` file
    ```
    CONTRACT_ADDRESS=...
    ```
2. Modify `scripts/mint-nft.js` to contain the correct ABI. It will be the name of your smart contract that you compiled.
    ```
    const contract = require(“../artifacts/contracts/YOURCONTRACT.sol/YOURCONTRACT.json”)
    ```
3. Verify the API Key used for minting is the same network you deployed your smart contract on
    ```
    const API_URL = process.env.RINKEBY_API_URL // should be same as the network you deployed in
    ```
4. Copy `mint-queue/mint-data-example.json`
    ```
    cp mint-queue/mint-data-example.json mint-queue/mint-data.json
    ```
5. Populate `mint-queue/mint-data.json` with the recipient addresses and associated token URIs.

    It should look something like this.
    ```
    [
        {
            “tokenURI”: “”,
            “recipient”: “”
        }
    ]
    ```
6. Mint the tokens
    ```
    node scripts/mint-nft.js
    ```

      You should see something like `The hash of your transaction is: 0x...`

    Go to the [Ropsten](https://ropsten.etherscan.io/) or [Rinkeby](https://rinkeby.etherscan.io/) etherscan to verify this (search up the address). It can take a minute or two sometimes.

## Configuring Networks
You can edit network configs in `hardhat.config.js`.

It will be something like this.
```
YOUR_NETWORK_NAME: {
    url: YOUR_NETWORK_API_URL,
    accounts: [`0x${PRIVATE_KEY}`]
},
```