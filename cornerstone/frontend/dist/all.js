'use strict';

angular.module('myApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    controller: 'homeCtrl',
    templateUrl: './homeView/home.html'
  });
  $stateProvider.state('about', {
    url: '/about',
    controller: 'aboutCtrl',
    templateUrl: './aboutView/about.html'
  });
  $stateProvider.state('commercial', {
    url: '/projects/commercial',
    controller: 'commercialCtrl',
    templateUrl: './commercialView/commercial.html'
  });
  $stateProvider.state('contacts', {
    url: '/contacts',
    controller: 'contactsCtrl',
    templateUrl: './contactsView/contacts.html'
  });
  $stateProvider.state('institutional', {
    url: '/projects/institutional',
    controller: 'instCtrl',
    templateUrl: './institutionalView/inst.html'
  });
  $stateProvider.state('mission', {
    url: '/mission',
    controller: 'missionCtrl',
    templateUrl: './missionView/mission.html'
  });
  $stateProvider.state('portal', {
    url: '/portal',
    controller: 'portalCtrl',
    templateUrl: './portalView/portal.html'
  });
  $stateProvider.state('projects', {
    url: '/projects',
    controller: 'projectCtrl',
    templateUrl: './projectsView/project.html'
  });
  $stateProvider.state('residential', {
    url: '/projects/residential',
    controller: 'resCtrl',
    templateUrl: './residentialView/res.html'
  });
  $stateProvider.state('client', {
    url: '/portal/:client',
    controller: 'clientCtrl',
    templateUrl: './clientView/client.html'
  });
  $stateProvider.state('cart', {
    url: '/cart/?client',
    controller: 'storeCtrl',
    templateUrl: './storeView/store.html'
  });
  $stateProvider.state('checkout', {
    url: '/checkout/?client',
    controller: 'checkoutCtrl',
    templateUrl: './checkoutView/checkout.html'
  });
});

angular.module('myApp').service('myService', function ($http) {
  this.login = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:3200/clients/login'
    });
  }, this.getPlans = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:3200/floorplans'
    });
  }, this.getClient = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:3200/clientinfo'
    });
  }, this.getCart = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:3200/clientcart'
    });
  }, this.getJoined = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:3200/joinedclient'
    });
  }, this.updateCart = function (order_id, product_id) {
    return $http({
      method: 'POST',
      url: 'http://localhost:3200/addproduct',
      data: {
        order_id: order_id,
        product_id: product_id
      }
    });
  }, this.grabTotal = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:3200/total'
    });
  }, this.updateProduct = function (count, orderid, productid) {
    return $http({
      method: 'PUT',
      url: 'http://localhost:3200/updateproduct',
      data: {
        count: count,
        orderid: orderid,
        productid: productid
      }
    });
  };
});

angular.module('myApp').controller('aboutCtrl', function ($scope, $location) {});

angular.module('myApp').controller('clientCtrl', function ($scope, $location, myService) {

  $scope.plans = function () {
    myService.getPlans().then(function (response) {
      var plans = response.data;
      $scope.allPlans = plans;
    });
  };
  $scope.plans();

  $scope.getInfo = function () {
    myService.getClient().then(function (response) {
      var data = response.data;
      for (var i = 0; i < data.length; i++) {
        if ('/portal/' + data[i].name === $location.$$path) {
          $scope.client = data[i];
          break;
        }
      }
    });
  };
  $scope.getInfo();

  // $scope.addToCart = function(count, orderid, productid) {
  //   myService.updateProduct(count, orderid, productid).then(function(response) {
  //     console.log(response)
  //   })
  // }
  // $scope.addToCart(100, 2, 1)

  //If Id's match, update the count of the product. If the id's do not match meaning that the product is not in the orders_products table, it will create a new row that contains the id of the order and the product id
  // $scope.addToCart = function(count, order_id, product_id) {
  //
  //     myService.getCart().then(function(response) {
  //         let data = response.data
  //         var plans = $scope.allPlans
  //         console.log(data)
  //         console.log(plans)
  //         var found = false;
  //         if(data.length) {
  //
  //           data.forEach(function(product){
  //             var foundPlan = plans.find(function(plan) {
  //               return (product.product_id === product_id && product.clientid === order_id)
  //             })
  //
  //             if (foundPlan && !found) {
  //               found = true;
  //               myService.updateProduct(count, order_id, product_id).then(function(response){
  //                 // console.log('IT works')
  //               })
  //               console.log('IT works')
  //             } else if (!found ){
  //               myService.updateCart(order_id, product_id).then(function(response) {
  //                 console.log(response)
  //               })
  //             }
  //           })
  //         } else {
  //           myService.updateCart(order_id, product_id).then(function(response) {
  //             console.log(response)
  //           })
  //         }
  //
  //
  //
  //     })
  // }
  // $scope.addToCart(20, 2, 2)

});

angular.module('myApp').controller('commercialCtrl', function ($scope, $location) {});

angular.module('myApp').controller('contactsCtrl', function ($scope, $location) {});

angular.module('myApp').controller('homeCtrl', function ($scope, $location) {});

angular.module('myApp').controller('instCtrl', function ($scope, $location) {});

angular.module('myApp').controller('missionCtrl', function ($scope, $location) {});

angular.module('myApp').controller('portalCtrl', function ($scope, $location, myService) {

  $scope.login = function (name, password) {
    myService.login().then(function (response) {
      var noMatch = void 0;
      var data = response.data;
      console.log(response.data);
      for (var i = 0; i < data.length; i++) {
        if (name === data[i].name && password === data[i].password) {
          noMatch = false;
          $location.path('/portal/' + data[i].name);
          break;
        } else {
          noMatch = true;
        }
      }
      if (noMatch === true) {
        alert('Please try again');
      }
      $scope.username = '';
      $scope.password = '';
    });
  };
});

angular.module('myApp').controller('projectCtrl', function ($scope, $location) {});

angular.module('myApp').controller('resCtrl', function ($scope, $location) {});

angular.module('myApp').controller('storeCtrl', function ($scope, $location, myService) {

  $scope.plans = function () {

    myService.getJoined().then(function (response) {
      var data = response.data;
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === $location.$$search.client) {
          $scope.client = data[i];
          break;
        }
      }
    });

    myService.getCart().then(function (response) {
      var data = response.data;
      $scope.myCart = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].clientid === $scope.client.client_id) {
          $scope.myCart.push(data[i]);
        }
      }
      console.log($scope.myCart);
    }).then(function () {
      myService.grabTotal().then(function (response) {
        var data = response.data;
        $scope.total = data[0];
      });
    });
  };

  $scope.plans();

  $scope.addProduct = function (order_id, product_id) {
    myService.updateCart(order_id, product_id).then(function (response) {
      console.log(response);
    });
  };
});