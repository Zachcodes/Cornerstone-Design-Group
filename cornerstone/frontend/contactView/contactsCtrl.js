angular.module('myApp').controller('contactsCtrl', function($scope, $location, myService) {

  $scope.submitQuestion = function(question, email) {


    myService.newQuestion(question, email)
    $scope.question = ''
    $scope.email = ''
  }





})
