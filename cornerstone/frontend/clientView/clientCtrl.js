angular.module('myApp').controller('clientCtrl', function($scope, $location, myService) {


  var user = $location.$$path.slice(8)

    $scope.getInfo = function(username) {
        myService.getClient(username).then(function(response) {
            let data = response.data
            for(let i = 0; i< data.length; i++) {
              $scope.client = data[i];
              myService.getFiles($scope.client.id).then(function(response){
                $scope.files = response.data
              })
              myService.getInvoices($scope.client.id).then(function(response) {
                $scope.theNumbers = [];
                $scope.invoices = response.data
                for(let i = 0; i < $scope.invoices.length; i++) {
                  $scope.theNumbers.push(Number($scope.invoices[i].total_price.replace(/[^0-9\.]+/g,"")))
                }
                $scope.sum = $scope.theNumbers.reduce((a, b) => a + b, 0);
                $scope.amount = $scope.sum * 100;
              })
            }

        })


    }
    $scope.getInfo(user)


    var handler = StripeCheckout.configure({
      key: 'pk_test_PJjAAE6rMoTASJ47tf9M2zxc',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    document.getElementById('customButton').addEventListener('click', function(e) {
      handler.open({
        name: 'Architecture Design Firm',
        description: 'Payment For Services Rendered',
        amount: $scope.amount
      });
      e.preventDefault();
    });
    window.addEventListener('popstate', function() {
  handler.close();
});


})
