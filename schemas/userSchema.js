const mongoose=require('mongoose');


const userSchema = new mongoose.Schema({
  name : String,
  email : String,
  imageUrl : String,
  gid : String,
  address : [{
    full_name : String,
    shop_name : String,
    house_no: String,
    locality: String,
    landmark : String,
    city: String,
    state : String,
    pincode : Number,
    phone_number : String
  }],
  casesheets : [{type:String}],
  orders : [{type:String}],
  appointments:[{type:String}],
  isPathologist : {type : Boolean, default : false },
  isDoctor : {type : Boolean, default : false },
  isRetailer : {type : Boolean, default : false },
  isWholesaler : {type : Boolean, default : false },
  isManufacturer : {type : Boolean, default : false },
  isSupplier : {type : Boolean, default : false }
});

const users= mongoose.model('User',userSchema);
module.exports=users;
