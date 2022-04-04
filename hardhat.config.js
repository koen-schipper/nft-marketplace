require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "MQmFfJnpqKfvKV8zBWAZKBVf0QKTCOW0";

const RINKEBY_PRIVATE_KEY = "052d8c6d1a295e5ec054e739c564de1600f3a1910482305fbe8907abaa3d58a8";

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    }
  }
};