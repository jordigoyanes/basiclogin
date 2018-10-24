const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userModel = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    //email: String,
    //firstname: String,
    //lastname: String
})

userModel.pre('save', function(next){
    let user = this;
    this.hashPassword(user.password, function(err, hash){
        if(err){
            return next(err)
        }
        user.password = hash
        next()
    })
})

userModel.methods.hashPassword = function(pwdTohash, callback) {
    bcrypt.genSalt(1, function(err, salt){
        if(err){
            return callback(err);
        };
        bcrypt.hash( pwdTohash, salt, function(err, hash) {
            if(err){
                return callback(err)
            }
            return callback(null, hash)
        });
    })
}

userModel.methods.comparePassword = function(inputPass, hash, cb){
    bcrypt.compare(inputPass, hash, function(err, isMatch){
        if(err){
            return cb(err)
        }
        return cb(null, isMatch)
    })
}

const User = mongoose.model('user', userModel);
module.exports = User;