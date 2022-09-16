const main = async () => {
  const PharmaSupplyChain = await hre.ethers.getContractFactory(
    "PharmaSupplyChain"
  );
  const pharmaSupplyChain = await PharmaSupplyChain.deploy();

  await pharmaSupplyChain.deployed();
  console.log("PharmaSupplyChain deployed to: ", pharmaSupplyChain.address);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runmain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runmain();
