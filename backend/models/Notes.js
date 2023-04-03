//           First letter capital because its a model
// in this folder(models) the schema is made using mongoose schema 


       //  User schema   //
       const mongoose=require('mongoose');
       const {Schema}=mongoose;
       const NotesSchema = new Schema({
         user:{
            // user keeping the object id of other model(linking the particular user){foreign key}
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
         },
          title:{
           type:String,
           required:true
          },
          description:{
           type:String,
           reqiured:true
          },
          tag:{
           type:String,
           default:'General'
          },
          date:{
           type:Date,
           default:Date.now
          }
         });
       
         module.exports=mongoose.model('notes',NotesSchema);