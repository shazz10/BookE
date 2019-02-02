var express = require('express');
bodyParser = require('body-parser').json();
var router = express.Router();

var debug = require('debug')('apnaopd:server');

var User = require('../schemas/userSchema');
var Device = require('../schemas/deviceSchema');
var FCM = require('fcm-node');
var serverKey = 'AAAAeo9S14Q:APA91bH5u0xZBGo7JDTKx1j7TpmwIs5e-kHFkqhG7SIOK055MfDU9wZwk3gFQSL3jWLmZFLkKpT_4EiJlxjUuxCXpg3Ja5Mv5gDnTmaz5h2RSunUHVmeXuRBdHkl2VEkuX8ga7lc0G7H';//put server key here
var fcm = new FCM(serverKey);
//const fcm = require('node-fcm');

/* GET functions starts*/

router.get('/', function(req,res) {
  User.find({}, function (err,user) {
    if(err) throw err;
    res.send(user);
  });
});


//Get user details
router.get('/:gid', function(req,res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err) throw err;
    else if(user){
      var u={
        name : user.name,
        email : user.email,
        imageUrl : user.imageUrl,
        gid : user.gid,
        isPathologist : user.isPathologist,
        isDoctor : user.isDoctor,
        isRetailer : user.isRetailer,
        isWholesaler : user.isWholesaler,
        isManufacturer : user.isManufacturer,
        isSupplier : user.isSupplier
      }
      console.log(u);
      res.send(u);
    }
    else{
      res.send(null);
    }
  });
});


//send address of a unique gid
router.get('/address/:gid', function(req,res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err) throw err;
    else if(user)
    {
      console.log(user.address);
      res.send(user.address);
    }
    else
      res.send(null);
  });
});


/* GET function ends*/

/* POST function starts */

router.post('/',bodyParser,(req,res)=>{
  console.log(req.body);

  const user = new User({
    name : req.body.name,
    email : req.body.email,
    imageUrl : req.body.imageUrl,
    gid : req.body.gid,
  });
  user.save(function(err){
    if(err) throw err;
  });

  res.send(user);

});

/*POST function ends */

/*PUT function starts*/

//update the user after it becomes something
router.put('/is/:gid',function(req,res){
  User.findOne({gid:req.params.gid}, function(err,user){
    if(err) throw err;
    else if(user){
      if(req.body.isPathologist){
        user['isPathologist'] = req.body.isPathologist;
        // put token here which user you have to send push notification
        // Device.findOne({gid:req.params.gid},function(err,device){
        //   if(device){
        //     var token = device.deviceId;
        //     var message = {
        //       to: token,
        //       collapse_key: 'Nopes',
        //       notification: {title: 'You are now Pathologist', body: 'Add your profile'}
        //       //ata: {my_key: 'You are now Pathologist', contents: "Add your profile"}
        //     };
        //     fcm.send(message, function(err, response){
        //       if (err) {
        //           console.log("Something has gone wrong!");
        //       } else {
        //           console.log("Successfully sent with response: ", response);
        //       }
        //   });

        //   }
        // });
      }
      
      if(req.body.isDoctor){
        user['isDoctor'] = req.body.isDoctor;

    //     Device.findOne({gid:req.params.gid},function(err,device){
    //       if(device){
    //         var token = device.deviceId;
    //         var message = {
    //           to: token,
    //           collapse_key: 'Nopes',
    //           notification: {title: 'You are now Doctor', body: 'Add your profile'}
    //           //ata: {my_key: 'You are now Pathologist', contents: "Add your profile"}
    //         };
    //         fcm.send(message, function(err, response){
    //     if (err) {
    //         console.log("Something has gone wrong!");
    //     } else {
    //         console.log("Successfully sent with response: ", response);
    //     }
    // });
    //         console.log("Notification for doctor sent");
    //       }
    //     });
      }
      
      if(req.body.isRetailer){
        user['isRetailer'] = req.body.isRetailer;

    //     Device.findOne({gid:req.params.gid},function(err,device){
    //       if(device){
    //         var token = device.deviceId;
    //         var message = {
    //           to: token,
    //           collapse_key: 'Nopes',
    //           notification: {title: 'You are now Retailer', body: 'Add your profile'}
    //           //ata: {my_key: 'You are now Pathologist', contents: "Add your profile"}
    //         };
    //         fcm.send(message, function(err, response){
    //     if (err) {
    //         console.log("Something has gone wrong!");
    //     } else {
    //         console.log("Successfully sent with response: ", response);
    //     }
    // });
    //         console.log("Notification for retailer sent");
    //       }
    //     });
      }
      user.save();
      res.send(user);
    }
    else{
      res.status(404).send({message:"Record doesnt exist!"});
    }
  });
});

//unshift new address
router.put('/address/new/:gid',function(req, res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err)
    {
      throw err;
    }
    else if(user){
      user.address.unshift(req.body.address);
      user.save();
      res.send(user);
    }
    else {
      res.status(404).send({message:"Record does not exist!"});
    }
  });
});

//edit existing address
router.put('/address/edit/:gid/:address_id',function(req, res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err)
    {
      throw err;
    }
    else if(user){
      var flag=0;
      for (var i = user.address.length - 1; i >= 0; i--) {
        if(user.address[i]._id==req.params.address_id){
          user.address.splice(i,1);
          user.address.splice(i,0,req.body.address);
          user.save();
          flag=1;
          break;
        }
      }
      if(flag==1){
        res.send({message:"Address updated"});
      }
      else{
        res.status(404).send({message:"No such address found"});
      }
    }
    else {
      res.status(404).send({message:"Record does not exist!"});
    }
  });
});


//delete address by _id
router.put('/address/delete/:gid/:address_id',function(req, res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err)
    {
      throw err;
    }
    else if(user){
      for (var i = user.address.length - 1; i >= 0; i--) {
        if(user.address[i]._id == req.params.address_id){
          user.address.splice(i,1);
          user.save();
          break;
        }
      }
      res.send(user);

    }
    else {
      res.status(404).send({message:"Record does not exist!"});
    }
  });
});

/*PUT function ends */


module.exports = router;
