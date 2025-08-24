//This folder makes the code easier to understand

// import User from "../models/user.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

//Export signup function
export const signup = async (req, res) => {
  try {
    const { fullName, username, password } = req.body; // for get this data you must add a middlewere in server.js

    //Hashing Password Process -> bcrypt package
    const salt = await bcrypt.genSalt(8); // salt number -> bigger -> More secuer
    const hashedPassword = await bcrypt.hash(password, salt); // hash password

    // Create User
    const newUser = new User({
      fullName: fullName,
      username: username,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save(); // save user into the database

      res.status(200).json({
        // send as a response to the client
        // send a status 200
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      res.status(400).json({ error: "invalid user " }); // return 400 status code
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Check if the email is correct
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "The email format is incorrect" });
    }

    const existingEmail = await User.findOne({ email: email }); // create existing user, under the user table try to find this username
    if (existingEmail) {
      // if user exist
      return res
        .status(400)
        .json({ error: "The email might be already taken" });
    }

    const existingUser = await User.findOne({ username: username }); // create existing user, under the user table try to find this username
    if (existingUser) {
      // if user exist
      return res
        .status(400)
        .json({ error: "The username might be already taken" });
    }

    if (password.minLength < 6) {
      return res
        .status(400)
        .json({ error: "Password doesn't have at least 6 chracters " });
    }
  } catch (error) {
    res.status(500).json({ error: "The internal error has occur" });
    console.log("error in internal side");
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    ); // compare user password with databse

    if (!user || !isPasswordCorrect) {
      return req
        .status(400)
        .json({ error: "Invalid password and check username" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: newUser._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (error) {
    console.log("Login Controller error", error.message);
    res.status(500).json({ error: "Server Internal error " });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Successfully logged out " });
  } catch (error) {
    console.log("Logout Controller error", error.message);
    res.status(500).json({ error: "Server Internal error " });
  }
};

export const authCheck = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // find user
  } catch (error) {
    // catch error
    console.log("Auth check function error in controllers folder ");
    res.status(500).json({ error: "Server Internal Error " });
  }
};
