/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { RINKEBY_API_URL, ROPSTEN_API_URL, MAINNET_API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.0",
   defaultNetwork: "rinkeby",
   networks: {
      hardhat: {},
      rinkeby: {
         url: RINKEBY_API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      mainnet: {
        url: MAINNET_API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
     },
     ropsten: {
        url: ROPSTEN_API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
     }
   },
}
