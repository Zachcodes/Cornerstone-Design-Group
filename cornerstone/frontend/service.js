angular.module('myApp')
  .service('myService', function($http) {
    this.login = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3200/clients/login'
      })
    },
    this.getPlans = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3200/floorplans'
      })
    },
    this.getClient = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3200/clientinfo'
      })
    },
    this.getCart = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3200/clientcart'
      })
    },
    this.getJoined = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3200/joinedclient'
      })
    },
    this.updateCart = function(order_id, product_id) {
      return $http({
        method: 'POST',
        url: 'http://localhost:3200/addproduct',
        data: {
          order_id,
          product_id
        }
      })
    },
    this.grabTotal = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3200/total'
      })
    },
    this.updateProduct = function(count, orderid, productid) {
      return $http({
        method: 'PUT',
        url: 'http://localhost:3200/updateproduct',
        data: {
          count,
          orderid,
          productid
        }
      })
    }
  })
