var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
/* GET functions starts*/


/* GET function ends*/

/* POST function starts */



/*POST function ends */

/*PUT function starts*/

router.put('/location/:er_id',function(req,res){
  io.emit(req.body);
  res.send(req+" is emitted");
});


// /*PUT function ends */


module.exports = router;

