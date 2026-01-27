const express = require("express");
const upload = require("../middlewares/multer_config.js");
const router = express.Router();
const albumService = require("../db/upload_db.js");
router.post("/", upload.single("image"), async (req, res) => {
  const { tripId } = req.body;
  console.log("파일 수신 완료:", req.file.filename);
  const result = await albumService.uploadProcess(
    req.user.id,
    tripId,
    req.file.filename,
  );
  res.json({ message: "서버 저장 성공!", fileName: req.file.filename });
});
module.exports = router;
