var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var async = require('async');

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  //Find the first document in the users collection:
  dbo.collection("UsersProfile").find({}).toArray(function(err, result) {
    if (err) throw err;
    function calculate_age(dob) { 
      var diff_ms = Date.now() - dob.getTime();
      var age_dt = new Date(diff_ms); 
    
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    var sum=0;
    for(var i=0; i<result.length; i++){
      var x = calculate_age(new Date(result[i].dob));
      console.log(x);
      sum=sum+x;
    }
    console.log("\nAverage age of all users : " + sum/result.length);
    db.close();
  });
});