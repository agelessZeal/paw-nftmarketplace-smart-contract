const hre = require('hardhat')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

async function main () {
  const ethers = hre.ethers

  console.log('network:', await ethers.provider.getNetwork())

  const signer = (await ethers.getSigners())[0]
  console.log('signer:', await signer.getAddress())


  const v1NFT = '0x4686D37c7e074bf85A3A1715652aD9D18Ab8c527'
  const SAT = '0x5492F627492f65c81C63353D774eAf6CE8514C29'
  const fee = '0xc2A79DdAF7e95C141C20aa1B10F3411540562FF7'

  /**
   *  Deploy Altura Faucet
   */
  const pawNFT = await ethers.getContractFactory('pawNFT', {
    signer: (await ethers.getSigners())[0]
  })

  const contract = await pawNFT.deploy(v1NFT, SAT, fee);
  await contract.deployed()

  console.log('contract deployed to:', contract.address)
  
  await sleep(20);
  await hre.run("verify:verify", {
    address: contract.address,
    contract: "contracts/pawNFT.sol:pawNFT",
    constructorArguments: [v1NFT, SAT, fee],
  })

  console.log('contract verified')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
