const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
// const keys = require('./keys.js')
const connectionString = 'postgres://zacharyryanspringer@localhost/cornerstone';
const massiveInstance = massive.connectSync({connectionString});
const port = 3200;
const passport = require('passport');
const path = require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keyPublishable = 'pk_test_PJjAAE6rMoTASJ47tf9M2zxc';
//stripe maybe
// const keySecret = keys.keySecret;
const mandrill = require('mandrill-api/mandrill');
// const mandrill_client = new mandrill.Mandrill(keys.mandrillKey);


const app = module.exports = express();
app.use(session({
  secret: 'some-secret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());






app.set('db', massiveInstance);
const db = app.get('db');
app.use(express.static('./frontend'));
app.use(bodyParser.json());
const corsOptions = {
     origin: 'http://localhost:3200'
 };
app.use(cors())
const controller = require('./controller.js')

//Passport Strategies
passport.use(new GoogleStrategy({
    clientID: '10243963461-0o28oi1tcfn5n97840dhjurgc0tcqgnj.apps.googleusercontent.com',
    clientSecret: 'lwK5oWM_BG9BtbD5NKcunsb7',
    callbackURL: "http://localhost:3200/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile)
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(obj, done) {
  done(null, obj);
})


//Google Auth Callbacks
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/', successRedirect: '/authenticate/google' }));


//Authentication Middleware
function ensureAuthenticated(req, res, next) {
   if (req.isAuthenticated()) { return next(); }
   res.redirect('/portal')
}

function admin(req, res, next) {
  if(!req.user) {
    req.user = {};
  }
  if(!req.user.admin) {
    req.user.admin = false;

  }
  next()
}

function client(req, res, next) {
  if(!req.user) {
    req.user = {};
  }
  if(!req.user.client) {
    req.user.client = false;

  }
  next()
}

//Client Endpoints
app.get('/client/info', controller.getClientInfo)
app.get('/client/login', controller.getClientLogin)
app.get('/client/files', controller.getFiles)
app.get('/client/invoices', controller.getInvoices)
app.get('/client/name', controller.getClientName)


//Google Authentication
app.get('/authenticate/google', admin, client, controller.authenticateGoogle)
app.get('/api/check/admin', admin, client, controller.checkAdmin)


//Admin Endpoints
app.post('/new/client', controller.newClient)
app.get('/new/client/created', controller.getNewClient)
app.post('/new/client/login', controller.newClientLogin)
app.post('/add/file', controller.addFile)
app.post('/add/invoice', controller.addInvoice)
app.get('/admin/login', controller.checkAdminLogin)


//Contact Endpoints
app.post('/new/question', controller.newQuestion)
app.get('/get/questions', controller.getQuestions)
app.delete('/delete/question/:id', controller.deleteQuestion)


app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
