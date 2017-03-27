const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const connectionString = "postgres://zacharyryanspringer@localhost/cornerstone";
const massiveInstance = massive.connectSync({connectionString});

const port = 3200;



const app = module.exports = express();
app.set('db', massiveInstance);
const db = app.get('db');
app.use(bodyParser.json());
const corsOptions = {
     origin: 'http://localhost:3000'
 };
app.use(cors(corsOptions))
app.use(express.static('./frontend'));
app.use(cors())


//Use these two lines of code when you are ready to start hoooking up server stuff with frontend...Will grab the two tables in the database

  // db.get_clients(function(err, clients) {
  //   console.log(clients)
  // })

// db.get_floor_plans(function(err, plans) {
//   console.log(plans)
// })

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
