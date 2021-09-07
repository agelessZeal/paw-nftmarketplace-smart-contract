require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  networks: {
    testnet: {
      url: process.env.NODE_URL,
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.5.16'
      },
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100
          }
        }
      },
    ]
  },
  etherscan: {
    apiKey: ""
  }
}
