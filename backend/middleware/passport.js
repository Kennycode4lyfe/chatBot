const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const UserModel = require('../model/index').UserModel

passport.use('signup',
    new localStrategy( {
        usernameField: 'username',
        passwordField: 'password'
    },async (username, password, done) => {
        try{
        const user = await UserModel.create({ username, password })
        return done(null, user);
        }
        catch(err){
            done(err)
        }
    })
  );