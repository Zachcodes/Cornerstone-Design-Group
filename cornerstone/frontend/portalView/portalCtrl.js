angular.module('myApp').controller('portalCtrl', function($scope, $location, myService) {

    $scope.login = function(name, password) {
        myService.login().then(function(response) {
          let noMatch;
            let data = response.data;
            console.log(response.data)
            for(let i = 0; i < data.length; i++) {
              if(name === data[i].name && password === data[i].password) {
                noMatch = false
                $location.path(`/portal/${data[i].name}`)
                break;
              } else {
                noMatch = true;
              }
            }
            if (noMatch === true) {
              alert('Please try again')
            }
            $scope.username = '';
            $scope.password = '';



        })
    }





})
