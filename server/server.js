// server.js
const express      = require('express');
const app          = express();
const path         = require('path');
const session      = require('express-session')
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose     = require('mongoose');
const authRoutes   = require('./routes/auth');

mongoose.connect(
process.env.MONGO_URL, 
{
  auth:{
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PW
  },
  useNewUrlParser: true
})

// configure app to use bodyParser()
// this will let us get the data from a POST
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/views')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// setting up a session for logged users:

app.use(session(
  {
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie:{
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  }
))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-eControl-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//routes:
app.use("/users", authRoutes);

app.get('/', function (req, res) {
  res.render('index');
});


// server port
const port = process.env.PORT || 5000;   
app.listen(port);
console.log('Simple Login API working at port: ' + port);