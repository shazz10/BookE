var express = require('express');
bodyParser = require('body-parser').json();
var router = express.Router();


var Er = require('../schemas/erSchema');

/* GET functions starts*/


/* GET function ends*/

/* POST function starts */

router.post('/',bodyParser,(req,res)=>{
  console.log(req.body);

  const er = new Er({
    driver_name : req.body.driver_name,
    phone_number : req.body.phone_number,
    er_id : req.body.er_id
  });
  er.save(function(err){
    if(err) throw err;
  });

  res.send(er);

});

/*POST function ends */

/*PUT function starts*/

router.put('/location_update/:er_id',function(req,res){
  Er.findOne({er_id:req.params.er_id},function(err,er){
    if(err) throw err;
    else if(er){
      er['location']=req.body.location;
      er.save();
      res.send(er);
    }
    else{
      res.status(404).send({message:"Record does not exist!"});
    }
  })

});


// /*PUT function ends */


module.exports = router;

