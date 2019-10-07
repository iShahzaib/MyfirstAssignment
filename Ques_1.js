var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const ud = require('./User_data.js');
const upd = require('./User_profile_data.js');

MongoClient.connect(url, function(err, db) {

  if (err) throw err;
  var dbo = db.db("mydb"); 

  //users data  
  dbo.collection("Users").insert(ud, function(err, res) {
    if (err) throw err;
    console.log("User document inserted " + res.insertedCount);
    db.close();
  });

  //userprofile data 
  dbo.collection("UsersProfile").insert(upd, function(err, res) {
    if (err) throw err;
    console.log("User_Profile document inserted " + res.insertedCount);
    db.close();
  });
});