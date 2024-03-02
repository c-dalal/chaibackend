import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user alreay exist: username and email
    // check for images and avatar
    // upload them to cloudinary
    //create user object - create entry in db
    // remove password and refresh token fileld from response
    //check for user creation
    //return res
    const {fullname,email,username,password} = req.body;
    console.log(fullname);

    if([fullname,email,username,password].some((field) => 
        field?.trim()  === "")){
        throw new ApiError(400, "All Fields is required")
    }
  const existedUser =  User.findOne({
    $or: [{email}, {username}]
   })

   if(existedUser){
    throw  new ApiError(409,"User with username/email alreay exist")
   }
   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

   if(!avatar){
    throw new ApiError(400, "Avatar file is required")
   }

   const user = User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })


   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500,"Something went wrong while")
   }
   return res.status(201).json(
    new ApiResponse(200)
   )
} )


export {
    registerUser,
}