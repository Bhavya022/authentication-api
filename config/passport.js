// Facebook Strategy 
const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user || !user.comparePassword(password)) {
            return done(null, false, { message: 'Incorrect email or password' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Add other strategies here (Google, Facebook, Twitter, GitHub, etc.)
};

const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'emails', 'displayName']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ facebookId: profile.id });
  
          if (!user) {
            user = new User({
              facebookId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName
            });
            await user.save();
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  // Twitter Strategy
  const TwitterStrategy = require('passport-twitter').Strategy;
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: '/auth/twitter/callback'
      },
      async (token, tokenSecret, profile, done) => {
        try {
          let user = await User.findOne({ twitterId: profile.id });
  
          if (!user) {
            user = new User({
              twitterId: profile.id,
              name: profile.displayName
            });
            await user.save();
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  // GitHub Strategy
  const GitHubStrategy = require('passport-github')
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ githubId: profile.id });
  
          if (!user) {
            user = new User({
              githubId: profile.id,
              email: profile.emails ? profile.emails[0].value : null,
              name: profile.displayName || profile.username
            });
            await user.save();
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  