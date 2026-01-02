const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { findUserByUsername } = require("../db/user_db");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        console.log(username, password);
        try {
          const exUser = await findUserByUsername(username);
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (e) {
          console.error(e);
          done(e);
        }
      }
    )
  );
};
