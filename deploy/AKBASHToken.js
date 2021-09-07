const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000))

module.exports = async function (hre) {

  const { ethers,getChainId,deployments, getNamedAccounts } = hre

  const { deploy } = deployments;

  const namedAccounts = await getNamedAccounts();
  const {deployer} = namedAccounts;

  console.log('deployer:',deployer)

  const AKBashToken  = await deploy("AKBASH", {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
  });
  console.log('AKBashToken deployed:',AKBashToken.address)

};

module.exports.tags = ["AKBASH"];
