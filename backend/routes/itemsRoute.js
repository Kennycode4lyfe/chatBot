const itemModel = require('../model/index').ItemModel
const express = require('express')
const itemRouter = express.Router()


itemRouter.post('/meal',async(req,res,next)=>{
    const item = req.body
try{
 const createdItem =  await itemModel.create(item)
    res.status(200).json(createdItem)
}
catch(err){
console.log(err)
next(err)
}
})


module.exports=itemRouter

