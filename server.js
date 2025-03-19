const express=require('express');
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const mongoURL=process.env.URL
const connection=mongoose.connect(mongoURL)
const schema=require('./models/schema')
const app=express()
app.use(express.json())


app.post('/signup',async(req,res)=>{
    try{
        const {username,email,password}=req.body
        console.log(req.body)
        const user=await schema.create({
            username,
            email,
            password
        })
        if(user){
            return res.status(200).json({message:"User created",user})
        }
    }catch(err){
        return res.status(500).json(err.message)
    }
})
app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email ){
            return res.status(400).json({message:"Email cannot be empty"})
        }
        if(!password ){
            return res.status(400).json({message:"Password cannot be empty"})
        }
        const found=await schema.findOne({email})
        if(!found){
            return res.status(400).json({message:"Email doesn't exists, Signup please"})
        }
        return res.status(200).json({message:"Login Successfull",found})
        
        
    }catch(err){
        return res.status(500).json(err.message)
    }
})


const PORT=8989
app.listen(PORT,async()=>{
    try{
        await connection
        console.log("connected")
    }catch(err){
        console.log("error",err)
    }
    console.log(`listening on http://localhost:${PORT}`)
})