const express = require("express");
const router = express.Router();

const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  handleShort,
  getUrl,
  getAllUrl,
  deleteLink,
  checkUser,
  googleLogin,
  getInfo,
} = require("../controllers/authController");
// middleware

router.get("/", test);
router.post("/short", checkUser);

router.post("/getAllUrl", checkUser);
router.delete("/delete", checkUser);
router.post("/profile", checkUser);
router.post("/getAllUrl", getAllUrl);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/short", handleShort);
router.post("/profile", getProfile);
router.delete("/delete", deleteLink);
router.get("/:urlId", getUrl);
router.post("/googleLogin", googleLogin);
router.get("getInfo", checkUser);
router.get("/getInfo", getInfo);

module.exports = router;
