const express = require('express')
const authRouter = express.Router()
const passport= require('passport')
const path = require('path')
 
const filepath = path.join('/Users','HP','Desktop','chatBot','frontend')
// authRouter.get('/signup_page',(req,res,next)=>{
//     res.sendFile('index.html',{root:filepath},(err)=>{
//         if(err){
//             next(err)
//         }
//         else{console.log('file sent')}
//     })
//     // next()
// })

// authRouter.get('/',(req,res,next)=>{
//     res.sendFile('home.html',{root:filepath},(err)=>{
//         if(err){
//             next(err)
//         }
//         else{console.log('file sent')}
//     })
//     // next()
// })


// authRouter.post('/signup',passport.authenticate('signup'),(req,res,next)=>{
//     console.log('user created')

   
//     res.status(200).json({message:"user created successfully"})
//     next()
// })

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
  res.sendFile(isAuthenticated ? "home.html" : "index.html", { root: filepath });
}
)

authRouter.post('/login',passport.authenticate("custom",{
    successRedirect:'/',
    failureRedirect: '/'
}))



module.exports = authRouter