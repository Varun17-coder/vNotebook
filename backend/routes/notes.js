const express=require('express');
const router=express.Router();
const Notes=require('../models/Notes')
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');// for addnotes endpoint

// ROUTE 1: Get all the notes using POST:"/api/notes/createuser"--- login required 
 router.get('/fetchallnotes',fetchuser,async(req,res)=>{
   try {

   // this is to get the notes of the particular user by sending id of that user 
   const notes=await Notes.find({user:req.user.id})
    res.json(notes);
   }catch (error) {
      console.error(error.message)
      res.status(500).send("Internal server error")
}
 }) 




 // ROUTE 2: Adding a new Note using POST:"/api/notes/addnotes" ----login required
 router.post('/addnotes',fetchuser,[
   [
      body('title','Enter the title ').isLength({ min: 3 }),
      body('description','description must be atleast 5 characters').isLength({min:6})
    ]
 ],async(req,res)=>{
   try {
      
 
   // if their are errors, return bad request and errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const {title,description,tag}=req.body;// destructuring concept- taking title,description and tag from request
   const note=new Notes({
      title,description,tag,user:req.user.id
   })
   const savedNote= await note.save();
   res.json(savedNote)

}catch (error) {
      console.error(error.message)
      res.status(500).send("Internal server error")
}
 })




 // ROUTE 3: Updating an existing Note using PUT:"/api/notes/updatenote" ----login required

 router.put('/updatenote/:id',fetchuser,async(req,res)=>{
   const {title,description,tag}=req.body;
   try {
    
  
   // Creating a new note object 
   const Newnote={};
   if(title){Newnote.title=title}
   if(description){Newnote.description=description}
   if(tag){Newnote.tag=tag}

   // Find the note to be updated and update it
   let note= await Notes.findById(req.params.id)
   if(!note){return res.status(404).send("Not Found")}
   
   if(note.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed")
   }
    
   note=await Notes.findByIdAndUpdate(req.params.id,{$set:Newnote},{new:true}) 
  
   res.json({note})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
}
  
  }) 
  
  
  
  
  // ROUTE 4: Delete a existing Note using PUT:"/api/notes/deletenote" ----login required

 router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
   const {title,description,tag}=req.body;
   
   try {
    
   
   // Find the note to be updated and update it
   let note= await Notes.findById(req.params.id)
   if(!note){return res.status(404).send("Not Found")}
   
   // Allow deletion only if user owns this Note
   if(note.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed")
   }
    
   note=await Notes.findByIdAndDelete(req.params.id) 
  
   res.json({"Success":"Deleted Successfully",note:note})
  }
   catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
}
  
  })



 module.exports=router