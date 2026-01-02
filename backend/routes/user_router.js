// server/routes/users.js
const express = require("express");
const { findUserByUsername, createUser } = require("../db/user_db");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

// POST /api/users/login - 로그인
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.json({ message: "로그인 실패" });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      return res.json({
        message: "로그인 성공",
        user: { id: user.id, username: user.username },
      });
    });
  })(req, res, next);
});

// GET /api/users/me - 로그인된 사용자 정보
router.get("/me", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  const { id, username, created_at } = req.session.user;

  return res.json({
    success: true,
    user: { id, username, created_at },
  });
});

// POST /api/users/join - 회원가입
router.post("/join", async (req, res) => {
  const { username, password } = req.body;
  // console.log("username", username);
  if (!username || !password) {
    return res.status(400).json({ error: "이메일과 비밀번호를 입력해주세요." });
  }
  try {
    const user = await findUserByUsername(username);
    if (user) {
      return res.status(401).json({ error: "이미 등록된 유저명 입니다." });
    }
    const hash = await bcrypt.hash(password, 12);
    // console.log(hash);
    await createUser(username, hash);
    return res.status(200).json({message:'회원가입 성공'});
  } catch (e) {
    console.error(e);
  }
});

// POST /api/users/logout - 로그아웃
router.post("/logout", (req, res) => {
  if (!req.session) {
    return res.json({ success: true, message: "이미 로그아웃 상태입니다." });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("세션 삭제 오류:", err);
      return res.status(500).json({ error: "로그아웃 실패" });
    }

    res.clearCookie("connect.sid"); // 기본 세션 쿠키 이름
    return res.json({ success: true, message: "로그아웃 되었습니다." });
  });
});

module.exports = router;
