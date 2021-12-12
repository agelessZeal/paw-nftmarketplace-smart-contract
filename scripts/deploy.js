const hre = require('hardhat')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

async function main () {
  const ethers = hre.ethers

  const {parseEther, formatEther} = ethers.utils;

  console.log('network:', await ethers.provider.getNetwork())

  const signer = (await ethers.getSigners())[0]
  console.log('signer:', await signer.getAddress())

  const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.provider)

  console.log('deployer:',deployer.address, formatEther(await deployer.getBalance()));

  const VXLToken = await ethers.getContractFactory("VXLToken", deployer);

  const vxlerc = await VXLToken.deploy();
  await vxlerc.deployed();

  console.log("vxl erc token Contract deployed to ", vxlerc.address)


  const SAT = '0x2d97A45D32669bC5a043eC8D33C40fF7858D3607'
  const fee = '0x98911a83795099e63608600788bBE777D7e71E0A'

  /**
   *  Deploy Altura Faucet
   */
  const VXLNFT = await ethers.getContractFactory('VXLNFT', deployer)


  const contract = await VXLNFT.deploy(vxlerc.address, SAT, fee);
  await contract.deployed()

  console.log('contract deployed to:', contract.address)
  
  await sleep(60);
  await hre.run("verify:verify", {
    address: contract.address,
    contract: "contracts/VXLNFT.sol:VXLNFT",
    constructorArguments: [vxlerc.address, SAT, fee],
  })

  console.log('contract verified')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
