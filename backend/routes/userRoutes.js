const express = require('express')
const authRouter = express.Router()
const passport= require('passport')
const path = require('path')
const process = require('process')
 
const filepath = path.join('/Users','HP','Desktop','chatBot','frontend')
const productionFilePath = process.env.FILEPATH

authRouter.get('/', (req,res) =>{
console.log(req.user)
const isAuthenticated = !!req.user
console.log(isAuthenticated)
if(isAuthenticated){
    console.log('user is entered restaurant')
}
 else {
    console.log("unknown user");
  }
  res.sendFile(isAuthenticated ? "home.html" : "index.html", { root:productionFilePath||filepath });
}
)

authRouter.post('/login',passport.authenticate("custom",{
    successRedirect:'/',
    failureRedirect: '/'
}))



module.exports = authRouter