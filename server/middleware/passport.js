import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import * as dotenv from "dotenv";
import passport from "passport";
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(accessToken, refreshToken);
      done(null, profile);
    }
  )
);

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log("user info", username, password);
    return done(null, false);
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
  })
);
