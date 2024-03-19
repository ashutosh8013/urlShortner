const User = require("../models/user");
const Url = require("../models/Url");
const {
  hashPassword,
  comparePassword,
  decimalToBase62,
  base62ToDecimal,
} = require("../helpers/auth");
const jwt = require("jsonwebtoken");
var uniqid = require("uniqid");

// test call
const test = (req, res) => {
  res.json("test is working");
};

// register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if name was entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    //   check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be at leat 6 in size",
      });
    }
    // check emaill
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }
    const hashedPassword = await hashPassword(password);
    // create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
// login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("in controller");
    // console.log(email, password);
    // check if user exists
    const user = await User.findOne({ email });
    // console.log("after user");
    // console.log(user);
    if (!user) {
      return res.json({
        error: "no user found",
      });
    }

    //check if password match
    const match = await comparePassword(password, user.password);

    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "passord don't match",
      });
    }
  } catch (error) {}
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

// handle short

const handleShort = async (req, res) => {
  const { origUrl, email, custom } = req.body;

  if (custom) {
    try {
      const url = await Url.findOne({ urlId: custom });
      if (url) {
        res.status(400).json("already exit");
      } else {
        const shortUrl = `http://localhost:8000/${custom}`;
        console.log("new url");
        const newUrl = new Url({
          origUrl,
          email,
          data: new Date(),
          urlId: custom,
          shortUrl,
        });
        await newUrl.save();
        res.json(newUrl);
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    let randomNumber = Math.floor(Math.random() * 1000000000000 + 1);
    let urlId = decimalToBase62(randomNumber);
    // base url
    // console.log("int the call");
    while (true) {
      // check if that urlId already exit in db or not
      let check = await Url.findOne({ urlId });
      if (!check) break;
      else {
        // if exist create a new urlId
        randomNumber = Math.floor(Math.random() * 1000000000000 + 1);
        urlId = decimalToBase62(randomNumber);
      }
    }

    const base = "http://localhost:8000";
    // const urlId = uniqid();
    // validate the original url left
    if (origUrl) {
      try {
        // if the same user have entered the same url
        let url = await Url.findOne({ origUrl, email });
        //  if different user have created the same url
        let url2 = await Url.findOne({ origUrl });
        if (url) {
          console.log("in if");
          res.json(url);
        } else if (url2) {
          // extracting necessary feilds from url2 and creating a new entery
          const shortUrl = url2.shortUrl;
          const urlId = url2.urlId;
          url = new Url({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
            email,
          });
          await url.save();
          res.json(url);
        } else {
          const shortUrl = `${base}/${urlId}`;
          console.log(shortUrl);
          url = new Url({
            origUrl,
            shortUrl,
            urlId,
            data: new Date(),
            email,
          });
          await url.save();
          res.json(url);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json("server error");
      }
    } else {
      res.status(400).json("invalid original url");
    }
  }
};

// handle get request for shortUrl
const getUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      await Url.updateOne(
        { urlId: req.params.urlId },
        {
          $inc: { clicks: 1 },
        }
      );
      return res.redirect(url.origUrl);
    } else {
      res.status(404).json("not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
};
// getting all urls that a specific user had created
const getAllUrl = async (req, res) => {
  console.log("in getAllUrl");
  try {
    const { token } = req.cookies;
    let temp;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) throw err;
        temp = user;
      });
    } else {
      res.json(null);
    }
    const allLinks = await Url.find({ email: temp.email });
    return res.json(allLinks);
  } catch (error) {
    console.log("error in fetting all links for user");
    return res.status(404).json(null);
  }
};
module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  handleShort,
  getUrl,
  getAllUrl,
};
