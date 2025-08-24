// import mongoose from "mongoose";

// //Create User Model Schema
// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     fullName: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       reuired: true,
//       minLength: 6, // Make sure that the user has at least 6 characters long password
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     followers: [
//       {
//         type: mongoose.Schema.Types.ObjectId, // a follower will need to have this object type
//         ref: "User", // refferance to the User collection
//         default: [],
//       },
//     ],
//     following: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         default: [],
//       },
//     ],

//     profileImg: {
//       type: String,
//       default: "",
//     },

//     coverImg: {
//       type: String,
//       default: "",
//     },
//     //Optional
//     bio: {
//       type: String,
//       default: "",
//     },
//     link: {
//       type: String,
//       default: "",
//     },
//   ],
//   },
//   { timestamps: true } // it will give us some additional details from database sucha as 'createdAt, updatedAt'
// );

// // Create model based on this schema
// const User = mongoose.model("User", userSchema); // Mongoo will automatically onvert "User" -> "users"

// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    profileImg: {
      type: String,
      default: "",
    },
    coverImg: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "",
    },
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
