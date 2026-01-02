const passport = require("passport");
const local = require("./LocalStrategy");
const { findUserById } = require("../db/user_db");
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findUserById(id);
      done(null, user);
    } catch (e) {
      console.error(e);
    }
  });

  local();
};
