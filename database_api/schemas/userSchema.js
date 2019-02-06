const mongoose=require('mongoose');


const userSchema = new mongoose.Schema({
  name : String,
  email : String,
  gid : String,
  phone_number : String,
  location : String,
  history : [{
    start: String,
    end: String,
    erid: String,
    price : String,
    time : {type:Date,default:new Date()},
  }]
  
});

const users= mongoose.model('User',userSchema);
module.exports=users;
