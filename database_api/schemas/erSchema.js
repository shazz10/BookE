const mongoose=require('mongoose');


const erSchema = new mongoose.Schema({
  driver_name : String,
  phone_number : String,
  location : String,
  er_id : String
});

const ers= mongoose.model('Er',erSchema);
module.exports=ers;
