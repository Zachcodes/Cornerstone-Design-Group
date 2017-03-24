angular.module('myApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');


    $stateProvider
      .state('home', {
        url: '/',
        controller: 'homeCtrl',
        templateUrl: 'homeView/home.html'
      })
      $stateProvider
        .state('about', {
          url: '/about',
          controller: 'aboutCtrl',
          templateUrl: 'aboutView/about.html'
        })
        $stateProvider
          .state('commercial', {
            url: '/projects/commercial',
            controller: 'commercialCtrl',
            templateUrl: 'commercialView/commercial.html'
          })
      $stateProvider
            .state('contacts', {
              url: '/contacts',
              controller: 'contactsCtrl',
              templateUrl: 'contactsView/contacts.html'
      })
      $stateProvider
            .state('institutional', {
              url: '/projects/institutional',
              controller: 'instCtrl',
              templateUrl: 'institutionalView/inst.html'
      })
      $stateProvider
            .state('mission', {
              url: '/mission',
              controller: 'missionCtrl',
              templateUrl: 'missionView/mission.html'
      })
      $stateProvider
            .state('portal', {
              url: '/portal',
              controller: 'portalCtrl',
              templateUrl: 'portalView/portal.html'
      })
      $stateProvider
            .state('projects', {
              url: '/projects',
              controller: 'projectCtrl',
              templateUrl: 'projectsView/project.html'
      })
      $stateProvider
            .state('residential', {
              url: '/projects/residential',
              controller: 'resCtrl',
              templateUrl: 'residentialView/res.html'
      })
  })

angular.module('myApp').controller('aboutCtrl', function($scope, $location) {

})

angular.module('myApp').controller('commercialCtrl', function($scope, $location) {

})

angular.module('myApp').controller('contactsCtrl', function($scope, $location) {

})

angular.module('myApp').controller('homeCtrl', function($scope, $location) {

})

angular.module('myApp').controller('instCtrl', function($scope, $location) {

})

angular.module('myApp').controller('missionCtrl', function($scope, $location) {

})

angular.module('myApp').controller('portalCtrl', function($scope, $location) {

})

angular.module('myApp').controller('projectCtrl', function($scope, $location) {

})

angular.module('myApp').controller('resCtrl', function($scope, $location) {

})
