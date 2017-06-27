var db = require('./index.js').get('db')
var bcrypt = require('bcrypt')
module.exports = {
    getClientInfo: function(req, res) {
      db.get_clients_info(req.query.username, function(err, info) {
        // req.session.client.push(info)
        // res.json(req.session)
        res.json(info)
      })
    },
    getClientLogin: function(req, res) {
      db.check_client_login([req.query.username, req.query.password], function(err, logininfo) {

        res.json(logininfo)
      })
    },
    getFiles: function(req, res) {
      db.get_clients_files(req.query.clientid, function(err, files) {
        res.json(files)
      })
    },
    getInvoices: function(req, res) {
      db.get_clients_invoices(req.query.clientid, function(err, invoices) {
        res.json(invoices)
      })
    },
    authenticateGoogle: function(req, res) {
      let email = req.user.emails[0].value
      let displayName = req.user.displayName
      let client = false;
      db.get_clients(function(err, clients) {

        for(let i = 0; i < clients.length; i++ ) {
          if(clients[i].email === email && clients[i].name === displayName) {
            client = true
            req.user.client = true;
            res.redirect(`/#!/client/${clients[i].username}`)
          }
        }
        if(client === false) {

          db.google_admin_auth([displayName, email], function(err, admin) {
            if(admin.length === 0){
              res.redirect('/#!/portal')
            }
            else if(admin[0].admin_display_name === displayName && admin[0].admin_email === email) {
              req.user.admin = true;
              req.user.client = true;
              res.redirect('/#!/admin')
            } else {
              res.redirect('/#!/portal')
            }
          })
        }

      })


    },
    ////test function for google auth
    checkAdmin: function(req, res) {
      res.send(req.user)
    },
    ////
    checkClient: function(req, res) {
      res.send(req.user.client)
    },
    getClientName: function(req, res) {
      db.get_client_name(function(err, names) {
        res.json(names)
      })
    },
    newClient: function(req, res) {
      db.create_client([req.body.name, req.body.email], function(err, client) {
        res.json(200)
      })
    },
    getNewClient: function(req, res) {
      db.get_new_client(function(err, client) {
        res.json(client)
      })
    },
    newClientLogin: function(req, res) {
      db.create_client_login([req.body.username, req.body.password, req.body.client_id], function(err, login) {
        res.json(200)
      })
    },
    addFile: function(req, res) {
      db.add_file([req.body.filename, req.body.filelink, req.body.client_id], function(err, file) {
        res.json(200)
      })
    },
    addInvoice: function(req, res) {
      db.add_invoice([req.body.date, req.body.hours, req.body.client_id, req.body.price, req.body.total], function(err, file) {
        res.json(200)
      })
    },
    checkAdminLogin: function(req, res) {
      db.check_admin([req.query.username, req.query.password], function(err, admin) {
        res.json(admin)
      })
    },

    //Question/response endpoints
    newQuestion: function(req, res) {
      db.insert_question([req.body.question, req.body.email], function(err, question) {
        res.json(200)
      })
    },
    getQuestions: function(req, res) {
      db.grab_questions(function(err, questions) {
        res.json(questions)
      })
    },
    deleteQuestion: function(req, res) {
      db.delete_question(req.params.id, function(err, deleted) {
        res.json(200)
      })
    }
}
