const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const connectionString = "postgres://zacharyryanspringer@localhost/cornerstone";
const massiveInstance = massive.connectSync({connectionString});
const port = 3200;



const app = module.exports = express();
app.use(session({
  secret: "some secret",
  saveUninitialized: true,
  resave: true
}));
app.set('db', massiveInstance);
const db = app.get('db');
app.use(express.static('./frontend'));
app.use(bodyParser.json());
const corsOptions = {
     origin: 'http://localhost:3200'
 };
app.use(cors(corsOptions))
const controller = require('./controller.js')

function cart(req, res, next) {

    if(!req.session.cart) {
      req.session.cart = []
    }
    req.session.cart.push(req.body);
    res.json(req.session.cart)
    next()
}


app.get('/clients/login', controller.getClients)
app.get('/floorplans', controller.getFloorPlans)
app.get('/clientinfo', controller.getClientInfo)
app.get('/clientcart', controller.getCart)
app.get('/joinedclient', controller.joinClient)
app.post('/product', controller.addProduct)
app.put('/updateproduct', controller.updateProduct)
app.get('/total', controller.getTotal)
// app.post('/orders', controller.addOrder)

// app.post('/cart', function(req, res, next) {
  //
  // if(!req.session.cart) {
  //   req.session.cart = []
  // }
  // req.session.cart.push(req.body);
//   res.status(200).json(req.session.cart)
//
// })
app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
