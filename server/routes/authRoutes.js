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
} = require("../controllers/authController");
// middleware
router.use(cors({ credentials: true, origin: `http://localhost:5173` }));
router.get("/", test);
router.get("/getAllUrl", getAllUrl);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/short", handleShort);
router.get("/profile", getProfile);
router.delete("/delete",deleteLink);
router.get("/:urlId", getUrl);

module.exports = router;
