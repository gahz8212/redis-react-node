require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const boardRouter = require("./routes/board_router");
const userRouter = require("./routes/user_router");
const uploadRouter = require("./routes/upload_router");
const passportConfig = require("./passport");
const { RedisStore } = require("connect-redis");
const { createClient } = require("redis");
const redisClient = createClient();
redisClient.connect().catch(console.error);

// sequelize로 데이터베이스와 연결
const { sequelize } = require("./models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((e) => {
    console.error(e);
  });

  
// app.js 또는 server.js

const app = express();
app.use(
  cors({
    origin: "http://192.168.45.76:8081", // 앱 개발 시 사용하는 주소 (또는 true)
    // origin: 'http://192.168.10.56:8081', // 앱 개발 시 사용하는 주소 (또는 true)
    credentials: true, // 쿠키/세션 통신 허용
  })
);
passportConfig();

app.set("port", process.env.PORT || 5000);

// ★★★ 여기서 세션 미들웨어 등록 (라우터보다 먼저!) ★★★
const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient, prefix: "sess:" }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 30,
    httpOnly: true,
    secure: false,
  },
});

// 필수 미들웨어들
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
// 라우터 등록 (세션 설정 이후에!)
// 게시판 라우터 연결
app.use("/api/posts", boardRouter);
// 사용자 라우터 연결
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);

// 기본 라우트
app.get("/api", (req, res) => {
  res.send("🚀 /api간단 게시판 API 서버 실행 중");
});

// 기본 라우트
app.get("/", (req, res) => {
  res.send("🚀 /간단 게시판 API 서버 실행 중");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
