const express=require('express');
const router=express.Router();
const User=require('../models/User')
const fetchuser=require('../middleware/fetchuser')// for middleware
const { body, validationResult } = require('express-validator');// express validator 
const { findOne } = require('../models/User');// it automatically get imported when we use findone function
const bcrypt = require('bcryptjs');// the bcryptjs is used to encrypt the password 

const jwt = require('jsonwebtoken');// this is a TOKEN system from jsonwebtoken(jwt node.js) for more info visit jwt.io

const JWT_SEC="mainhoondevil";// JWT secret


//ROUTE 1: Create a User using POST:"/api/auth/createuser" doesn't require auth ------ non login required
// array is for validating the user using express validator  
 router.post('/createuser', [
   body('name','Enter the valid name').isLength({ min: 3 }),
   body('password','password must be atleast 5 characters').isLength({min:6}),
   body('email','Enter the valid email').isEmail()
  
 ],async(req,res)=>{
  let success=false;
   // if their are errors, return bad request and errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   // --------check whether the user with this email exits already
   try {
   
   let user= await User.findOne({email:req.body.email});
   if(user){
      return res.status(400).json({success,error:"sorry user with this email already exists"});
   }

   // here the adding of salt and the hashing of password is performed using bcryptjs
   const salt= await bcrypt.genSalt(10);
   const Secpwd= await bcrypt.hash(req.body.password,salt);// ---------> it is to get the hash value of the password including salt 
   user= await User.create({
      name: req.body.name,
      password: Secpwd, 
      email: req.body.email
    })
   
    // this is a jwt authentication which generates the token 
    const data={
      user:{
         id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SEC);
    success=true;
    res.json({success,authToken})// returning token i.e. authData
   // res.json({user})
} catch (error) {
      console.error(error.message)
      res.status(500).send("Internal server error")
}
 })



 // ROUTE 2: -------Authenticating a user using POST:"/api/auth/login" doesn't require auth ------ non login required-------------
   // Creating login endpoint
 router.post('/login', [
  body('email','Enter the valid email').isEmail(),
  body('password','Password cannot be blank').exists()
],async(req,res)=>{

  let success=false;
  // if their are errors, return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}=req.body; // taking out email and password from database
  try { 
    
  // checking whether the user exists already or not
  let user= await User.findOne({email})
  if(!user){
    success=false;
    return res.status(400).json({success,error:"please enter the correct credentials"})
  }

  // checking whether the password exits in the database
  const  passwordCompare= await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    success=false;
    return res.status(400).json({success,error:"please enter the correct credentials"})

  }

  // if password exits
  const data={
    user:{
       id:user.id
    }
  }
  const authToken=jwt.sign(data,JWT_SEC);
  success=true;
  res.json({success,authToken})

}catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
}
})


//ROUTE 3: Get loggedin User Details using POST:"/api/auth/getuser" ---login required

router.post('/getuser',fetchuser,async(req,res)=>{
try {
  const userId=req.user.id;
  const user=await User.findById(userId).select("-password") // selecting everything eccept password
  res.send(user);// sending the user 
} catch (error) {
  console.error(error.message)
  res.status(500).send("Internal server error")
}
})

 module.exports=router




 // try-catch  block is very important to know any error happened in our code{spelling mistakes}