angular.module('myApp', ['ui.router', 'ngTouch'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');


        $stateProvider
            .state('home', {
                url: '/',
                controller: 'homeCtrl',
                templateUrl: './homeView/home.html'
            })
        $stateProvider
            .state('about', {
                url: '/about',
                controller: 'aboutCtrl',
                templateUrl: './aboutView/about.html'
            })
        $stateProvider
            .state('contact', {
                url: '/contact',
                controller: 'contactsCtrl',
                templateUrl: './contactView/contact.html'
            })
        $stateProvider
            .state('design', {
                url: '/design',
                controller: 'designCtrl',
                templateUrl: './designView/design.html'
            })
        $stateProvider
            .state('portal', {
                url: '/portal',
                controller: 'portalCtrl',
                templateUrl: './portalView/portal.html'
            })
        $stateProvider
            .state('projects', {
                url: '/projects',
                controller: 'projectCtrl',
                templateUrl: './projectsView/project.html'
            })
        $stateProvider
            .state('client', {
                url: '/client/:client',
                controller: 'clientCtrl',
                templateUrl: './clientView/client.html',
                resolve: {
                  check: function(authService, myService, $location, $q, $state) {
                    var deferred = $q.defer();
                    if(authService.checkClientPermission()) {
                      deferred.resolve()
                    }
                    myService.googleLogin().then(function(response) {

                      let client = response.data.client
                        if(client === true) {
                          authService.getClientPermission()
                        }

                      if(authService.checkClientPermission()) {
                        deferred.resolve()
                      }
                      else {
                        $state.go('portal')
                        deferred.reject()
                        alert("You don't have access here")
                      }
                    })
                    return deferred.promise
                  }//ends check function
                }
            })
          $stateProvider
            .state('admin', {
                url: '/admin',
                controller: 'adminCtrl',
                templateUrl: './adminView/admin.html',
                resolve: {
                  check: function(authService, myService, $location, $q, $state, adminAuth) {
                    var deferred = $q.defer();
                    if(adminAuth.checkPermission()) {
                      deferred.resolve()
                    }
                    myService.googleLogin().then(function(response) {
                      let data = response.data.admin
                        if(data === true) {

                          adminAuth.getPermission()
                        }

                      if(adminAuth.checkPermission()) {
                        deferred.resolve()
                      }
                      else {
                        $state.go('portal')
                        deferred.reject()
                        alert("You don't have access here")
                      }
                    })
                    return deferred.promise
                  }//ends check function
                }
            })

    })
