var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://127.0.0.1/mydb');
var post_schema1 = mongoose.Schema({}, {
    strict: false,
    collection: 'Users'
});
var post_schema2 = mongoose.Schema({ user_id : Number, dob : Date }, {
    strict: false,
    collection: 'UsersProfile'
});
var post1 = conn.model('Users', post_schema1);
var post2 = conn.model('UsersProfile', post_schema2);

const ud = require('./User_data.js');
const upd = require('./User_profile_data.js');

// insert data into users and userprofile collection.

insertAndNotify1(ud, function(err) {
    if (err) {
        console.log(err);
        process.exit();
    }
});
 
function insertAndNotify1(ud, callback) {
 
    var inserted = 0;
    for (var i = 0; i < ud.length; i++) {
        (function(row) {
            //anonymouse function for scope
            var new_post = new post1(ud[i]);
            new_post.save(function(err, row) {

                if (err) {
                    console.log(err);
                }
                else {
                    inserted++;
                    if (inserted == ud.length) {
                        callback();
                    }
                }
            });
        })(ud[i]);
    }
}

insertAndNotify2(upd, function(err) {
    if (err) {
        console.log(err);
        process.exit();
    }
    process.exit();
});
 
function insertAndNotify2(upd, callback) {
 
    var inserted = 0;
    for (var i = 0; i < upd.length; i++) {
        (function(row) {
            //anonymouse function for scope
            var new_post = new post2(upd[i]);
            new_post.save(function(err, row) {

                if (err) {
                    console.log(err);
                }
                else {
                    inserted++;
                    if (inserted == upd.length) {
                        callback();
                    }
                }
            });
        })(upd[i]);
    }
}

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// Average age of all users

post2.find({}, function(error, comments) {
    comment = JSON.parse(JSON.stringify(comments));
    var sum=0;
    console.log('\n');
    for(var i=0; i<comments.length; i++){
      var x = calculate_age(new Date(comment[i].dob));
      console.log(x);
      sum=sum+x;
    }
    console.log("\nAverage age of all users : " + sum/comments.length);
});

// Delete users who’s age is more than 25yrs

post2.deleteMany({ dob : { $lt : new Date("01/01/1994")}}, function(error, comments){
    console.log(comments);
});