var express = require('express');  
var app = express(); 
var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
  
app.post('/register', urlencodedParser, function (req, res) {  
   // Prepare output in JSON format  
    response = {  
       username : req.body.user_name,
       password : req.body.password,
       confirmpassword : req.body.confirm_password,
       email : req.body.email_id,
       firstname : req.body.first_name,
       lastname : req.body.last_name,

   };  
   console.log(response);  
   res.send("Account has been created");
   console.log(JSON.stringify(response));
})  
var server = app.listen(8000, function () {  
  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
  
})  