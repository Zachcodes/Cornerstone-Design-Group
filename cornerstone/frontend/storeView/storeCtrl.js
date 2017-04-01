angular.module('myApp').controller('storeCtrl', function($scope, $location, myService) {




    $scope.plans = function() {

        myService.getJoined().then(function(response) {
            let data = response.data
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === $location.$$search.client) {
                    $scope.client = data[i]
                    break;
                }
            }
        })

        myService.getCart().then(function(response) {
          let data = response.data
          $scope.myCart = [];
          for(let i = 0; i < data.length; i++) {
            if(data[i].clientid === $scope.client.client_id) {
              $scope.myCart.push(data[i])
            }
          }
          console.log($scope.myCart)
        }).then(function() {
          myService.grabTotal().then(function(response){
            let data = response.data
            $scope.total = data[0]
          })
        })

    }


    $scope.plans()

    $scope.addProduct = function(order_id, product_id) {
      myService.updateCart(order_id, product_id).then(function(response) {
        console.log(response)
      })
    }

})
