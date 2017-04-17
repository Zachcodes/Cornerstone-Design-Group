angular.module('myApp').controller('portalCtrl', function($scope, $location, $q, myService, authService, adminAuth) {

    $scope.login = function(username, password) {
        password = password.toString()
        var exists = false;
        myService.checkLogin(username, password).then(function(response) {

          var checkAdminLogin = function() {
            myService.checkAdmin(username, password).then(function(response) {
              let data = response.data
              if(data.length === 0) {
                $scope.clientUsername = '';
                $scope.clientPassword = '';
                alert('Please try again')
              }
              else if(data[0].admin_username === username && data[0].admin_password === password) {
                exists = true;
                adminAuth.getPermission();
                $location.path(`/admin`)
              }
            })
          }//ends checkadminlogin
            let data = response.data
            if(data.length === 0) {
              checkAdminLogin()
            }
            else if (data[0].username === username && data[0].password === password) {
                exists = true;
                authService.getClientPermission();
                $location.path(`/client/${data[0].username}`)
            }



        }) //end myservice.checkLogin


    } //ends scope.login




    $scope.googleLogin = function() {
      console.log('Firing off function')
      myService.googleLogin().then(function(response) {
        console.log(response)
      });
    }


})
