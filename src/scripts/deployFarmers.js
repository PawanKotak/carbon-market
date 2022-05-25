async function main() {
    const Farmers = await ethers.getContractFactory("Farmers")

    // Start deployment, returning a promise that resolves to a contract object
    const farmers = await Farmers.deploy()
    await farmers.deployed()
    console.log("Contract deployed to address:", farmers.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
