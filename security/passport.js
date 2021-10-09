const User = require("./../model/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id).then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
