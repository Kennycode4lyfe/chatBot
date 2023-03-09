const express = require('express')
const authRouter = express.Router()
const passport= require('passport')

authRouter.post('/signup',passport.authenticate('signup'),(req,res,next)=>{
    console.log('user created')
   
    res.status(200).json({message:"user created successfully"})
    next()
})



module.exports = authRouter