require("dotenv").config()
const API_URL = process.env.API_URL
const FARMERS_PUBLIC_KEY = process.env.FARMERS_PUBLIC_KEY
const FARMERS_PRIVATE_KEY = process.env.FARMERS_PRIVATE_KEY

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(API_URL));

const contract = require("../artifacts/contracts/Farmers.sol/Farmers.json")
const contractAddress = "0xad3562c3868bbc3a560bff412b5d591d1807e5c4"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintFarmersNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(FARMERS_PUBLIC_KEY, "latest") //get latest nonce

    //the transaction
    const tx = {
        from: FARMERS_PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(FARMERS_PUBLIC_KEY, tokenURI).encodeABI(),
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, FARMERS_PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Infura pool to view the status of your transaction!"
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log("Promise failed:", err)
        })
}

mintFarmersNFT(
    "ipfs://QmNnWh8GtTpzqJNSFm3h9MQdoazuszPMR2YNhbZ6w4mhnF"
)
