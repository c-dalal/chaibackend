import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
       
    },
    fullname: {
        type: String,
        require: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, // cloudnary URL
        required: true,
    },
    coverImage: {
        type: String, // cloudnary URL

    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required : [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    }

}, {timestamps : true});

userSchema.pre("save",async function(next){// yha 2nd parameter mein call back function ko () => {} nahi likhna hai proper function keyworjd se define krna hai
    if(!this.isModified("password")) return next(); // agar modified nahi hai toh next ka flag pass kr do. isModified mein string mein hi pass krna hota hai
    this.password = await bcrypt.hash(this.password,10)
    next()
})


userSchema.methods.isPasswordCorrect = async function (password) {
    await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
   return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return  jwt.sign(
        {
            _id: this._id,
           
        },
        process.env.REFRESH_ACCESS_TOKEN,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema);