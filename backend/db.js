const mongoose=require('mongoose');

const mongoURL="mongodb+srv://vnotebook:Mongodb.1@newcluster.89okfna.mongodb.net/vNotebook";
// mongodb+srv://vnotebook:<password>@newcluster.89okfna.mongodb.net/test
const connectToMongo =()=>{
      mongoose.connect(mongoURL,()=>{
      console.log("Connected to Mongo Successfully");
    })
}

mongoose.set('strictQuery', false);
module.exports=connectToMongo;