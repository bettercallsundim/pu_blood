import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "248477150437-qg9s1al78aq7pps5elqqb2qj7c36bh3u.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/user/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
// find session info using session id
passport.deserializeUser(async (user, done) => {
  done(null, user);
  // try {
  //   const user = await User.findById(id);
  //   done(null, user);
  // } catch (error) {
  //   done(error, false);
  // }
});
