const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

// Configure Passport to use a LocalStrategy for username/password authentication
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find user by username 
           // console.log(username,password)  
            //console.log(await User.findOne({ username }))
            const user = await User.findOne({ username });
          //console.log(user) 
            // If user not found or password is incorrect, return error
            if (!user || !user.isValidPassword(password)) { 
                //console.log(!user.isValidPassword(password))
                return done(null, false, { message: 'Invalid username or password' });
            }

            // If user found and password is correct, return user object 
           // console.log(done)
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Serialize user object into session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user object from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
