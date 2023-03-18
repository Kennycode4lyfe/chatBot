const passport = require('passport');
const UserModel = require('../model/index').UserModel
const passportCustomStrategy = require('passport-custom').Strategy

//used passport custom-strategy to store user's username in database
passport.use(
    new passportCustomStrategy(
      async(req,done) => {
        try{
          console.log('passport auth started')
      
        const username = req.body.username
        console.log(username)
        const user = await UserModel.create({username:username})
        return done(null, user);
        }
        catch(err){
         done(err)
        }
    })
  );


//serialize and deserialize user details from passport

  passport.serializeUser((user, cb) => {
    console.log(`serializeUser ${user}`);
    cb(null, user);
  });
  
  passport.deserializeUser((user, cb) => {
    console.log(`deserializeUser ${user}`);
    cb(null, user);
  });