const express    = require('express');  
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/dashboard', function(req, res) {
  if(!req.session.user){
    return res.status(401).send({"message":"User not authenticated"})
  }
  return res.status(200).send("Bienvenido al dashboard!")
});

router.get('/logout', function(req, res, next) {
  if(req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        console.log(err)
        return next(err);
      } else {
        res.status(200).send({"message":"User logged out succesfully!"})
        //return res.redirect('/');
      }
    });
  }
});
router.get('/:username', function(req, res) {
    User.findOne({username: req.params.username}, function(err, user){
        if(err){
            return res.status(500).send()
        }
        if(!user){
            return res.status(404).send()
        }
        return res.status(200).send(user)
    })
});

router.post('/register', function(req, res) {
  let newuser = new User();
  newuser.username = req.body.username;
  newuser.password = req.body.password;
  newuser.email = req.body.email;
  newuser.firstname = req.body.firstname;
  newuser.lastname = req.body.lastname;

  newuser.save(function(err, savedUser){
      if(err){
        console.log(err)
        return res.status(500).send()
      }
    return res.status(200).send({"message": "User registered succesfully!"});
  })
});
router.post('/login', function(req, res) {
    User.findOne({username: req.body.username}, function(err, user){
      if(err){
          console.log(err)
          return res.status(500).send()
      }
      if(!user){
          return res.status(404).send({"message": "Username not found."})
      }
      user.comparePassword(req.body.password, user.password, function(err, isMatch){
        if(err){
          return res.status(500).send({"message": "Server error verifying password."})
        }
        if(!isMatch){
          console.log("passwords don't match")
          return res.status(401).send({"message": "Incorrect password."})
        }
        // if everything is correct, store new user session:
        req.session.user = user
        return res.status(200).send({"message": "You have succesfully logged in!"})
      })
  })
});


module.exports = router;