//https://eth-goerli.g.alchemy.com/v2/Pmxb-y4tAF99znxrskHT6U-3PCtbRKQW

// require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/nCWvCRw2JSxbAM8zidmtZcAN_5xD8-Ee",
      accounts: [
        "42ec15acfb13970ac0eaf21d32ff31971c23fdfc7c05a5cdd23bb67fea6c5aaf",
      ],
    },
  },
};
