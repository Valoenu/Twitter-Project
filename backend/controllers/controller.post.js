import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

// create post like
export const postLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params; // rename id -> postId

    const post = await Post.findById(postId); // get post

    if (!post) {
      // if post is not found
      return res.status(404).json({ error: "Post not found" });
    }

    // if user like post
    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } }); // where user is already liked this post then unlike post
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      const updatedLikes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      res.status(200).json(updatedLikes);
    } else {
      // if user don't like this post yet

      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const notification = new Notification({
        // create nottification object
        from: userId,
        to: post.user,
        type: "like", // either like or follow
      });

      await notification.save(); // update nottification for the database

      const updatedLikes = post.likes;
      res.status(200).json(updatedLikes);
    }
  } catch (error) {
    console.log("Error occured in post like function ", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create post create function
export const postCreate = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!text && !img) {
      return res.status(400).json({ error: "Post must have text or image" });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error occured in createPost controller: ", error);
  }
};

// Create post delete function
export const postDelete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "You cannot delete this post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Successfully deleted post" });
  } catch (error) {
    console.log("deleted post controller error", error);
    res.status(500).json({ error: "Server error" });
  }
};

// crete postComment function
export const postComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = { user: userId, text };

    post.comments.push(comment);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log("Error occured in commentOnPost controller: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create user posts get in order to get all user posts
export const userPostsGet = async (req, res) => {
  try {
    const { username } = req.params; // grab username from params

    const user = await User.findOne({ username }); // find user
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ user: user._id }) // find post
      .sort({ createdAt: -1 }) // sort values
      .populate({
        // populate user
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(posts); // send a response with status 200
  } catch (error) {
    console.log("Error occured in users posts get function", error);
    res.status(500).json({ error: "Server error" });
  }
};

// create following Posts Get
export const followingPostsGet = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const following = user.following;

    const feedPosts = await Post.find({ user: { $in: following } }) // find posts from database
      .sort({ createdAt: -1 }) // sort values from database
      .populate({
        // populate the user
        path: "user",
        select: "-password",
      })
      .populate({
        // populate the comments
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(feedPosts); // send a response with status 200
  } catch (error) {
    console.log("Error occured in following posts get function ", error);
    res.status(500).json({ error: "Server error" });
  }
};

// create get al posts function
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        // populate function to remove password or any other sensitive information from user path endpoint
        path: "user",
        select: "-password",
      })
      .populate({
        // populate function to remove password
        path: "comments.user",
        select: "-password",
      });

    if (posts.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error occured in get all posts  ", error);
    res.status(500).json({ error: "Server error" });
  }
};

// create liked posts get function
export const likedPostsGet = async (req, res) => {
  const userId = req.params.id; // get users id from the params

  try {
    const user = await User.findById(userId); // find user by id
    if (!user) return res.status(404).json({ error: "User not found" }); // if there is no user

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } }) // find liked post  by id and use '$in' mongoose syntax
      .populate({
        // show the user and fullname without password
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(likedPosts); // send response with status 200
  } catch (error) {
    // catch error
    console.log("Error occured in liked posts get function", error);
    res.status(500).json({ error: "Server error" });
  }
};
