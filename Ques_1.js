var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const fs = require('fs');

MongoClient.connect(url, function(err, db) {

  if (err) throw err;
  var dbo = db.db("mydb"); 

  //users data  
  let userData = JSON.parse(fs.readFileSync('User_data.json'));
  dbo.collection("Users").insert(userData, function(err, res) {
    if (err) throw err;
    console.log("User document inserted " + res.insertedCount);
    db.close();
  });

  //userprofile data 
  let userPData = JSON.parse(fs.readFileSync('User_profile_data.json'));
  dbo.collection("UsersProfile").insert(userPData, function(err, res) {
    if (err) throw err;
    console.log("User_Profile document inserted " + res.insertedCount);
    db.close();
  });
});