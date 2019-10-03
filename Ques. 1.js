var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//user data

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  const fs = require('fs');
  let cityData = fs.readFileSync('User_profile_data.json');  
  let myobj = JSON.parse(cityData);  
  dbo.collection("Users").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted " + res.insertedCount);
    db.close();
  });
});

//userprofile data

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  const fs = require('fs');
  let cityData = fs.readFileSync('User_profile_data.json');  
  let myobj = JSON.parse(cityData);  
  dbo.collection("UsersProfile").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted " + res.insertedCount);
    db.close();
  });
});