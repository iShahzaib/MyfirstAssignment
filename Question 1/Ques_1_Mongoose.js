var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://127.0.0.1/mydb');
var async = require('async');
var md5 = require('md5');

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
    dob: Date,
    Mobile_no: String, 
}, {
    strict: false,
    collection: 'UsersProfile'
});

var Users = conn.model('Users', Users_schema);
var UsersProfile = conn.model('UsersProfile', UsersProfile_schema);

const usersdata = require('./User_data.json');

// insert data into users and userprofile collection.

async.eachSeries(usersdata, insertUserData, function (err) {
    if (err) {
        console.log('OOPS! How is this possible?');
    }
});

function insertUserData(usersdata, callback) {
    (async function(row) {
        let userData = {
            "firstname": usersdata.firstname,
            "email": usersdata.email,
            "lastname": usersdata.lastname,
            "password": usersdata.password
        }
        var save_user = await new Users(userData);

        let userProfileData = {
            "user_id" : save_user._id,        
            "dob": usersdata.dob,
            "mobile_no": usersdata.Mobile_no
        }
        var save_userprofile = await new UsersProfile(userProfileData);

        save_user.save(function(err, row) {
            if (err) {
                console.log(err);
            } else {
                save_userprofile.save(function(err, row) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback();
                    }
                });
            }
        });
    })(usersdata);
}