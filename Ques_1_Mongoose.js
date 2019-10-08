var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://127.0.0.1/mydb');
var async = require('async');
var md5 = require('md5');
const Schema = mongoose.Schema;

var Users_schema = mongoose.Schema({
    firstname: String,
    email: String,
    lastname: String,
    password: Number,
},  {
    strict: false,
    collection: 'Users'
});
var UsersProfile_schema = mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
    dob: Date,
    Mobile_no: String, 
}, {
    strict: false,
    collection: 'UsersProfile'
});
var Users = conn.model('Users', Users_schema);
var UsersProfile = conn.model('UsersProfile', UsersProfile_schema);

const usersdata = require('./User_data.json');
const usersprofiledata = require('./User_profile_data.json');

// insert data into users collection.

async.eachSeries(usersdata, insertUserData, function (err) {
    if (err) {
        console.log('OOPS! How is this possible?');
    }
});

function insertUserData(usersdata, callback) {
    var inserted = 0;
    (function(row) {
            var new_post = new Users(usersdata);
            new_post.save(function(err, row) {
                if (err) {
                    console.log(err);
                }
                else {
                    inserted++;
                    if (inserted == usersdata.length) {
                        callback();
                    }
                }
            });
    })(usersdata);
    callback(null);
}

// insert data into userprofile collection.

async.eachSeries(usersprofiledata, insertUserProfileData, function (err) {
    if (err) {
        console.log('OOPS! How is this possible?');
    }
});
 
function insertUserProfileData(usersprofiledata, callback) {
    var inserted = 0;
    (function(row) {
        var new_post = new UsersProfile(usersprofiledata);
        new_post.save(function(err, row) {
            if (err) {
                console.log(err);
            }
            else {
                inserted++;
                if (inserted == usersprofiledata.length) {
                    callback();
                }
            }
        });
    })(usersprofiledata);
    callback(null);
}