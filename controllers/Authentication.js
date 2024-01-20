const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config();
let newRefreshTokens = [];
const Authentication = {
  //registerFunction
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
  
      if (!req.body.username || !req.body.password || !req.body.email) {
        console.log(req.body.username, req.body.password, req.body.email);
        return res.status(400).json({ error: "Missing something?" });
      }
      // Check for duplicate email address
      const existingUser = await User.findOne({ email: req.body.email });
      
      if (existingUser) {
        return res.status(400).json({ error: "Email address already exists" });
      }  
      //check for duplicate UserName
      const existingUserName = await User.findOne({username: req.body.username})
      if(existingUserName){
        return res.status(400).json({error: "UserName already exists"})
      }

      // Create new user if email is unique
      const newUser = await new User({
        username: req.body.username,
        password: hashed,
        email: req.body.email,
      });
      const user = await newUser.save();
     return res.status(200).json(user);
     
    } catch (err) {
       res.status(500).json(err);
      console.log(err);
    }
  },

  //generate access token
  generateAccessToken : (user) =>{
    return jwt.sign({
      id: user.id,
      isAdmin : user.isAdmin,
    },
    process.env.ACCESS_TOKEN,
    {expiresIn: "365d"}
    );
  },

  generateRefreshToken : (user) =>{
    return jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin, 
    }, process.env.REFRESH_TOKEN,{
      expiresIn: "365d"
    }
    )
  },
  //Login function 
  loginFunction: async (req,res)=>{
    try {
      if(!req.body.username){
       return res.status(404).json("Tên người dùng không được xác định");
      }
      const user = await User.findOne({
        username:req.body.username,
      })
      
      if(!user){
       return res.status(404).json("invalid user")
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if ( !validPassword) {
        // Mật khẩu không chính xác
       return res.status(404).json("Mật khẩu không chính xác");
      }if(user &&  validPassword){
        const accessToken = Authentication.generateAccessToken(user);
        const refreshToken = Authentication.generateRefreshToken(user);
        newRefreshTokens.push(refreshToken)
        res.cookie("refreshToken", refreshToken,{
          httpOnly: true,
          secure: false,
          path:"/",
          sameSite:"strict",
        })
        
        const{password, ...others} = user._doc
        
       res.status(200).json({...others, accessToken})
      }
      
    } catch (error) {
      
      console.log(error);
    }
  },

  // changePassword: async (req, res) => {
  //  const {email} = req.query
  //  if(!email) throw new Error("Missing Email")
  //  const user = await User.findOne({email})
  // if(!user) throw new Error('User Not Found')
  // // const resetToken
  // },
//lưu refresh token vào redish


  requestRefreshToken: async(req,res) =>{
    const refreshToken = req.cookies.refreshToken
    
    if(!refreshToken){
      return res.status(401).json("You are not authenticated")
    }
    if(!newRefreshTokens.includes(refreshToken)){
      return res.status(403).json("Refresh token is wrong");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, user) =>{
      if(error){
        console.log(error);
        return res.status(401).json("Invalid refresh token");
      }
      newRefreshTokens = newRefreshTokens.filter((token) => token !==  refreshToken)
      const newAccessToken = Authentication.generateAccessToken(user)
      const newRefreshToken = Authentication.generateRefreshToken(user);
      newRefreshTokens.push(newRefreshToken)
      res.cookie("refreshToken", newRefreshToken,{
        httpOnly: true,
        secure: false ,
        path:"/",
        sameSite:"strict",

      })
  res.status(200).json({accessToken: newAccessToken});
    })
  },
  userLogout: async(req,res) =>{
   
  //  let newRefreshTokens = []
  newRefreshTokens = newRefreshTokens.filter(token => token !== req.cookies.refreshToken);
  res.clearCookie("refreshToken");
  res.status(200).json("Logged out successfully");
  }

  }
module.exports = Authentication;