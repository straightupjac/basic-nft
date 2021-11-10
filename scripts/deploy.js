async function main() {
  const CoinbaseNFT = await ethers.getContractFactory("CoinbaseNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const coinbaseNFT = await CoinbaseNFT.deploy()
  console.log("Contract deployed to address:", coinbaseNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
