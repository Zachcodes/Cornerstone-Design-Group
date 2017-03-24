'use strict';

angular.module('myApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    controller: 'homeCtrl',
    templateUrl: '../frontend/homeView/home.html'
  });
  $stateProvider.state('about', {
    url: '/about',
    controller: 'aboutCtrl',
    templateUrl: '../frontend/aboutView/about.html'
  });
  $stateProvider.state('commercial', {
    url: '/projects/commercial',
    controller: 'commercialCtrl',
    templateUrl: '../frontend/commercialView/commercial.html'
  });
  $stateProvider.state('contacts', {
    url: '/contacts',
    controller: 'contactsCtrl',
    templateUrl: '../frontend/contactsView/contacts.html'
  });
  $stateProvider.state('institutional', {
    url: '/projects/institutional',
    controller: 'instCtrl',
    templateUrl: '../frontend/institutionalView/inst.html'
  });
  $stateProvider.state('mission', {
    url: '/mission',
    controller: 'missionCtrl',
    templateUrl: '../frontend/missionView/mission.html'
  });
  $stateProvider.state('portal', {
    url: '/portal',
    controller: 'portalCtrl',
    templateUrl: '../frontend/portalView/portal.html'
  });
  $stateProvider.state('projects', {
    url: '/projects',
    controller: 'projectCtrl',
    templateUrl: '../frontend/projectsView/project.html'
  });
  $stateProvider.state('residential', {
    url: '/projects/residential',
    controller: 'resCtrl',
    templateUrl: '../frontend/residentialView/res.html'
  });
});
'use strict';

angular.module('myApp').controller('contactsCtrl', function ($scope, $location) {});
'use strict';

angular.module('myApp').controller('aboutCtrl', function ($scope, $location) {});
'use strict';

angular.module('myApp').controller('commercialCtrl', function ($scope, $location) {});
'use strict';

angular.module('myApp').controller('instCtrl', function ($scope, $location) {});
'use strict';

angular.module('myApp').controller('missionCtrl', function ($scope, $location) {});
'use strict';

angular.module('myApp').controller('portalCtrl', function ($scope, $location) {});
'use strict';

angular.module('myApp').controller('resCtrl', function ($scope, $location) {});
'use strict';

angular.module('myApp').controller('projectCtrl', function ($scope, $location) {});
'use strict';

angular.module('myApp').controller('homeCtrl', function ($scope, $location) {});