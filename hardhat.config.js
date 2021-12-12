require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
// require('@eth-optimism/plugins/hardhat/compiler')
// require('@eth-optimism/plugins/hardhat/ethers')

require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require( "hardhat-abi-exporter")
require("@nomiclabs/hardhat-solhint");
require( "hardhat-deploy")
require("hardhat-deploy-ethers")


module.exports = {
  abiExporter: {
    path: "./abi",
    clear: false,
    flat: true,
    // only: [],
    // except: []
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      // Default to 1
      default: 1,
      // dev address mainnet
      // 1: "",
    },
  },
  networks: {
    testnet: {
      url: process.env.NODE_URL,
    },
    rinkeby: {
      url: process.env.L1_NODE_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
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
            runs: 200
          }
        }
      },
    ]
  },
  etherscan: {
    apiKey: "VAQR1ZTXINETMQ7PGPFGSY6HZSZ93JBQDE"
  }
}
