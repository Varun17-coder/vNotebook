
       //  User schema  //
const mongoose=require('mongoose');
// this is from mongoose Schema visit mongoose website
const {Schema}=mongoose;
const UserSchema = new Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    reqiured:true,
    unique:true 
   },
   password:{
    type:String,
    reqiured:true
   },
   date:{
    type:Date,
    default:Date.now
   }
  });

  module.exports=mongoose.model('user',UserSchema);