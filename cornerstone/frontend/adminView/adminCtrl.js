angular.module('myApp').controller('adminCtrl', function($scope, $location, myService) {

    const getQuestions = function() {
      myService.grabQuestions().then(function(response) {
        let data = response.data
        $scope.questions = data;
      })
    }
    getQuestions()

    $scope.clientNames = function() {

        myService.getClientName().then(function(response) {
            let data = response.data
            $scope.names = data;
        })
    }
    $scope.clientNames();

    $scope.newClient = function(name, email, username, password, client_id) {
        myService.newClient(name, email).then(function() {
            myService.getNewClient().then(function(response) {
                client_id = response.data[0].id
                myService.newClientLogin(username, password, client_id).then(function() {
                  myService.getClientName().then(function(response) {
                      let data = response.data
                      $scope.names = data;
                  })
                    $scope.name = ''
                    $scope.email = ''
                    $scope.username = ''
                    $scope.password = ''
                })
            })
        })
    }

    $scope.selectClientFile = function(name) {
        $scope.clientFile = name
    }

    $scope.selectClientInvoice = function(name) {
        $scope.clientInvoice = name

    }

    $scope.addFile = function(filename, filelink, client_id) {
      myService.addFile(filename, filelink, client_id)
      $scope.filename = ''
      $scope.filelink = ''
      $scope.clientFile = ''
    }

    $scope.addInvoice = function(date, hours, client_id, price, total) {
      myService.addInvoice(date, hours, client_id, price, total)
      $scope.date = ''
      $scope.hours = ''
      $scope.clientInvoice = ''
      $scope.price_per_hour = ''
      $scope.total_price = ''
    }

    this.reply = false;
    $scope.response = false
    $scope.response_email;
    $scope.replying = function() {

      if(this.reply) {
        $scope.response = false
        this.reply = false;
      }else {
        $scope.response_email = this.question

        $scope.response = true
        this.reply = true
      }
    }

    $scope.replied = function(id) {
      id = Number(id)
      $scope.response = false
      myService.deleteQuestion(id).then(function() {
        getQuestions()
      })
    }
})
