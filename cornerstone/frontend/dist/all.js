'use strict';

angular.module('myApp', ['ui.router', 'ngTouch']).config(function ($stateProvider, $urlRouterProvider) {
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
  $stateProvider.state('contact', {
    url: '/contact',
    controller: 'contactsCtrl',
    templateUrl: './contactView/contact.html'
  });
  $stateProvider.state('design', {
    url: '/design',
    controller: 'designCtrl',
    templateUrl: './designView/design.html'
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
  $stateProvider.state('client', {
    url: '/client/:client',
    controller: 'clientCtrl',
    templateUrl: './clientView/client.html',
    resolve: {
      check: function check(authService, myService, $location, $q, $state) {
        var deferred = $q.defer();
        if (authService.checkClientPermission()) {
          deferred.resolve();
        }
        myService.googleLogin().then(function (response) {

          var client = response.data.client;
          if (client === true) {
            authService.getClientPermission();
          }

          if (authService.checkClientPermission()) {
            deferred.resolve();
          } else {
            $state.go('portal');
            deferred.reject();
            alert("You don't have access here");
          }
        });
        return deferred.promise;
      } //ends check function
    }
  });
  $stateProvider.state('admin', {
    url: '/admin',
    controller: 'adminCtrl',
    templateUrl: './adminView/admin.html',
    resolve: {
      check: function check(authService, myService, $location, $q, $state, adminAuth) {
        var deferred = $q.defer();
        if (adminAuth.checkPermission()) {
          deferred.resolve();
        }
        myService.googleLogin().then(function (response) {
          var data = response.data.admin;
          if (data === true) {

            adminAuth.getPermission();
          }

          if (adminAuth.checkPermission()) {
            deferred.resolve();
          } else {
            $state.go('portal');
            deferred.reject();
            alert("You don't have access here");
          }
        });
        return deferred.promise;
      } //ends check function
    }
  });
});

angular.module('myApp').service('myService', function ($http, authService) {
  //client service calls
  this.getClient = function (username) {
    return $http({
      method: 'GET',
      url: '/client/info?username=' + username
    });
  }, this.checkLogin = function (username, password) {
    return $http({
      method: 'GET',
      url: '/client/login?username=' + username + '&password=' + password

    });
  }, this.getFiles = function (clientid) {
    return $http({
      method: 'GET',
      url: '/client/files?clientid=' + clientid

    });
  }, this.getInvoices = function (clientid) {
    return $http.get('/client/invoices?clientid=' + clientid);
  };
  this.getClientName = function () {
    return $http.get('/client/name');
  },

  //Admin Service calls
  this.newClient = function (name, email) {
    return $http({
      method: 'POST',
      url: '/new/client',

      data: {
        name: name,
        email: email
      }
    });
  }, this.getNewClient = function (name, email) {
    return $http.get('/new/client/created');
  }, this.newClientLogin = function (username, password, client_id) {
    return $http({
      method: 'POST',
      url: '/new/client/login',

      data: {
        username: username,
        password: password,
        client_id: client_id
      }
    });
  }, this.addFile = function (filename, filelink, client_id) {
    return $http({
      method: 'POST',
      url: '/add/file',
      data: {
        filename: filename,
        filelink: filelink,
        client_id: client_id
      }
    });
  }, this.addInvoice = function (date, hours, client_id, price, total) {
    return $http({
      method: 'POST',
      url: '/add/invoice',

      data: {
        date: date,
        hours: hours,
        client_id: client_id,
        price: price,
        total: total
      }
    });
  },

  //Authentication service calls
  this.checkAdmin = function (username, password) {
    return $http({
      method: 'GET',
      url: '/admin/login?username=' + username + '&password=' + password

    });
  }, this.googleLogin = function () {
    return $http({
      method: 'GET',
      url: '/api/check/admin'
    });
  },

  //Question service calls
  this.newQuestion = function (question, email) {
    return $http({
      method: 'POST',
      url: '/new/question',
      data: {
        question: question,
        email: email
      }
    });
  }, this.grabQuestions = function () {
    return $http({
      method: 'GET',
      url: '/get/questions'
    });
  }, this.deleteQuestion = function (id) {
    console.log(id);
    return $http({
      method: 'DELETE',
      url: '/delete/question/' + id
    });
  };
});

angular.module('myApp').controller('aboutCtrl', function ($scope, $location) {});

angular.module('myApp').controller('adminCtrl', function ($scope, $location, myService) {

  var getQuestions = function getQuestions() {
    myService.grabQuestions().then(function (response) {
      var data = response.data;
      $scope.questions = data;
    });
  };
  getQuestions();

  $scope.clientNames = function () {

    myService.getClientName().then(function (response) {
      var data = response.data;
      $scope.names = data;
    });
  };
  $scope.clientNames();

  $scope.newClient = function (name, email, username, password, client_id) {
    myService.newClient(name, email).then(function () {
      myService.getNewClient().then(function (response) {
        client_id = response.data[0].id;
        myService.newClientLogin(username, password, client_id).then(function () {
          myService.getClientName().then(function (response) {
            var data = response.data;
            $scope.names = data;
          });
          $scope.name = '';
          $scope.email = '';
          $scope.username = '';
          $scope.password = '';
        });
      });
    });
  };

  $scope.selectClientFile = function (name) {
    $scope.clientFile = name;
  };

  $scope.selectClientInvoice = function (name) {
    $scope.clientInvoice = name;
  };

  $scope.addFile = function (filename, filelink, client_id) {
    myService.addFile(filename, filelink, client_id);
    $scope.filename = '';
    $scope.filelink = '';
    $scope.clientFile = '';
  };

  $scope.addInvoice = function (date, hours, client_id, price, total) {
    myService.addInvoice(date, hours, client_id, price, total);
    $scope.date = '';
    $scope.hours = '';
    $scope.clientInvoice = '';
    $scope.price_per_hour = '';
    $scope.total_price = '';
  };

  this.reply = false;
  $scope.response = false;
  $scope.response_email;
  $scope.replying = function () {

    if (this.reply) {
      $scope.response = false;
      this.reply = false;
    } else {
      $scope.response_email = this.question;

      $scope.response = true;
      this.reply = true;
    }
  };

  $scope.replied = function (id) {
    id = Number(id);
    $scope.response = false;
    myService.deleteQuestion(id).then(function () {
      getQuestions();
    });
  };
});

angular.module('myApp').controller('clientCtrl', function ($scope, $location, myService) {

  var user = $location.$$path.slice(8);

  $scope.getInfo = function (username) {
    myService.getClient(username).then(function (response) {
      // let data = response.data
      // for (let i = 0; i < data.length; i++) {
      //     if (`/portal/${data[i].name}` === $location.$$path) {
      //         $scope.client = data[i];
      //         break;
      //     }
      // }
      var data = response.data;
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        $scope.client = data[i];
        myService.getFiles($scope.client.id).then(function (response) {
          $scope.files = response.data;
        });
        myService.getInvoices($scope.client.id).then(function (response) {
          $scope.theNumbers = [];
          $scope.invoices = response.data;
          // var theNumbers = $scope.invoices.forEach(function(element) {
          //   Number(element.total_price.replace(/[^0-9\.]+/g,""))
          // })
          for (var _i = 0; _i < $scope.invoices.length; _i++) {
            $scope.theNumbers.push(Number($scope.invoices[_i].total_price.replace(/[^0-9\.]+/g, "")));
          }
          $scope.sum = $scope.theNumbers.reduce(function (a, b) {
            return a + b;
          }, 0);
          $scope.amount = $scope.sum * 100;

          // for(let i = 0; i < $scope.theNumbers.length; i++) {
          //   $scope.theNumbers[i]
          // }
          // var theNumbers = $scope.invoices.map(function(element) {
          //   Number(element.total_price.replace(/[^0-9\.]+/g,""))
          // })
        });
      }
    });
  };
  $scope.getInfo(user);

  var handler = StripeCheckout.configure({
    key: 'pk_test_PJjAAE6rMoTASJ47tf9M2zxc',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function token(_token) {
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.
    }
  });

  document.getElementById('customButton').addEventListener('click', function (e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Architecture Design Firm',
      description: 'Payment For Services Rendered',
      amount: $scope.amount
    });
    // data-zip-code="true"
    e.preventDefault();
  });
  window.addEventListener('popstate', function () {
    handler.close();
  });

  // $scope.getFiles = function() {
  //   console.log($scope.client)
  // }
  // $scope.getFiles()

});

angular.module('myApp').controller('contactsCtrl', function ($scope, $location, myService) {

  $scope.submitQuestion = function (question, email) {

    myService.newQuestion(question, email);
    $scope.question = '';
    $scope.email = '';
  };
});

angular.module('myApp').controller('designCtrl', function ($scope, $location) {});

angular.module('myApp').controller('homeCtrl', function ($scope, $location) {});

angular.module('myApp').controller('projectCtrl', function ($scope, $location) {});

angular.module('myApp').controller('portalCtrl', function ($scope, $location, $q, myService, authService, adminAuth) {

  $scope.login = function (username, password) {
    password = password.toString();
    var exists = false;
    myService.checkLogin(username, password).then(function (response) {

      var checkAdminLogin = function checkAdminLogin() {
        myService.checkAdmin(username, password).then(function (response) {
          var data = response.data;
          if (data.length === 0) {
            $scope.clientUsername = '';
            $scope.clientPassword = '';
            alert('Please try again');
          } else if (data[0].admin_username === username && data[0].admin_password === password) {
            exists = true;
            adminAuth.getPermission();
            $location.path('/admin');
          }
        });
      }; //ends checkadminlogin
      var data = response.data;
      if (data.length === 0) {
        checkAdminLogin();
      } else if (data[0].username === username && data[0].password === password) {
        exists = true;
        authService.getClientPermission();
        $location.path('/client/' + data[0].username);
      }
    }); //end myservice.checkLogin

  }; //ends scope.login


  $scope.googleLogin = function () {
    console.log('Firing off function');
    myService.googleLogin().then(function (response) {
      console.log(response);
    });
  };
});

angular.module('myApp').factory('adminAuth', function () {

  var obj = {};
  this.access = false;
  obj.getPermission = function () {
    this.access = true;
  };
  obj.checkPermission = function () {
    return this.access;
  };
  return obj;
});

angular.module('myApp').factory('authService', function () {

  var obj = {};
  this.access = false;
  obj.getClientPermission = function () {
    this.access = true;
  };
  obj.checkClientPermission = function () {
    return this.access;
  };
  return obj;
});