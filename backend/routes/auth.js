const express = require("express");
const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middlewares/fetchusers");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "ddskfnf";

// endpoint 1 = "/api/auth/createuser" create
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must have a minimum of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // IF ERROR FOUND using validation
    let success = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      // check if the user with the same email already exists
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ errors: "The user with this email already exists" });
      }
      // CREATE User

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          data: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      // to give Error instead of crashing
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

// endpoint 2 = "/api/auth/login" check password and email and Login
router.post(
  "/login",
  [
    body("email", "Enter a valid information").isEmail(),
    body("password", "Enter a valid information").exists(),
  ],
  async (req, res) => {
    // IF ERROR FOUND using validation
    let success = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success,errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: "Enter correct Information" });
      }

      const passCheck = await bcrypt.compare(password, user.password);

      if (!passCheck) {
        success = false;
        return res.status(400).json({ success,errors: "Enter correct Information" });
      }

      const data = {
        user: {
          data: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      // to give Error instead of crashing
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

// endpoint 2 = "/api/auth/getuser" get details of user from database
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.body.user;
    const user = await User.findById(userId.data).select("-password");
    res.send(user);
  } catch (error) {
    // to give Error instead of crashing
    console.log(error.message);
    res.status(500).send("Some Error Occured");
  }
});

module.exports = router;
