const passport = require('passport');
// const localStrategy = require('passport-local').Strategy
const UserModel = require('../model/index').UserModel
const passportCustomStrategy = require('passport-custom').Strategy
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

// const DUMMY_USER = {
//   id: 1,
//   username: "john",
// };



// passport.use('signup',
//   new localStrategy((username, password, done) => {
//     console.log('passport')
//     if (username === "john") {
//       console.log("authentication OK");
//       return done(null, DUMMY_USER);
//     } else {
//       console.log("wrong credentials");
//       return done(null, false);
//     }
//   })
// );



  passport.serializeUser((user, cb) => {
    console.log(`serializeUser ${user}`);
    cb(null, user);
  });
  
  passport.deserializeUser((user, cb) => {
    console.log(`deserializeUser ${user}`);
    cb(null, user);
  });