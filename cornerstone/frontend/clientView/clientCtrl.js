angular.module('myApp').controller('clientCtrl', function($scope, $location, myService) {


    $scope.plans = function() {
        myService.getPlans().then(function(response) {
            let plans = response.data
            $scope.allPlans = plans;
        })
    }
    $scope.plans()

    $scope.getInfo = function() {
        myService.getClient().then(function(response) {
            let data = response.data
            for (let i = 0; i < data.length; i++) {
                if (`/portal/${data[i].name}` === $location.$$path) {
                    $scope.client = data[i];
                    break;
                }
            }
        })
    }
    $scope.getInfo()

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




})
