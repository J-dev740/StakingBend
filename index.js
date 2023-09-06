import express from "express"
import Moralis from "moralis"
import dotenv from "dotenv"
import cors from 'cors'
const { EvmChain }=require("@moralisweb3/common-evm-utils");

const app= express()
const port=5001
dotenv.config()

app.use(cors())
app.use(express.json())
const MORALIS_API_KEY= process.env.MORALIS_API_KEY


//our endpoint
app.get("/getwalletBalance",async(req,res)=>{

    try {
        const {query}=req
        const response=await Moralis.EvmApi.balance.getNativeBalance({
            chain:EvmChain.SEPOLIA,
            address:query.address

        })
        return res.status(200).json(response)
    } catch (error) {
        console.log('something went wrong')
        console.log({msg:error})
        return res.status(400).json()
    }

})



Moralis.start({
    apiKey:MORALIS_API_KEY
}).then(()=>{
    app.listen(port,()=>{
        console.log("listening for APi calls ")
    })
})