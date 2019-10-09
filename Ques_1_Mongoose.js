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
    dob: Date,
    Mobile_no: String,
},  {
    strict: false,
    collection: 'Users'
});

var Users = conn.model('Users', Users_schema);

const usersdata = require('./User_data.json');

console.log(Object.keys(usersdata).length);

// insert data into users and userprofile collection.

async.eachSeries(usersdata, insertUserData, function (err) {
    if (err) {
        console.log('OOPS! How is this possible?');
    }
});

function insertUserData(usersdata, callback) {
    (async function(row) {
            var new_post = await new Users(usersdata);
            console.log(new_post._id);
            new_post.save(function(err, row) {
                if (err) {
                    console.log(err);
                }
                else {
                    callback();
                }
            });
    })(usersdata);
}