var db = require('./index.js').get('db')
module.exports = {
    getClients: function(req, res) {
        db.get_clients(function(err, clients) {
            res.json(clients)
        })
    },
    getFloorPlans: function(req, res) {
        db.get_floor_plans(function(err, plans) {
            res.json(plans)
        })
    },
    getClientInfo: function(req, res) {
      db.get_clients_info(function(err, info) {
        res.json(info)
      })
    },
    getCart: function(req, res) {
      db.get_cart(function(err, cart){
        res.json(cart)
      })
    },
    joinClient: function(req, res) {
      db.get_clients_info(function(err, joined) {
        res.json(joined)
      })
    },
    addProduct: function(req, res, next) {
      db.add_item_cart([req.body.order_id, req.body.product_id], function(err, cart) {
        res.json(req.body)
      })
    },
    updateProduct: function(req, res, next) {
      db.update_product([req.body.count, req.body.orderid, req.body.productid], function(err, updated){res.json(updated)

      })

    },
    getTotal: function(req, res) {
      db.sum_order(function(err, total) {
        res.json(total)
      })
    }

}
