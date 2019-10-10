var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
       // Prepare output in JSON format  
       response = {  
        username : req.body.user_name,
        password : req.body.password,
        confirmpassword : req.body.confirm_password,
        email : req.body.email_id,
        firstname : req.body.first_name,
        lastname : req.body.last_name,
 
    }; 
    obj = JSON.stringify(response)
    console.log(obj);

 res.send('Account has been created');

});

module.exports = router;
