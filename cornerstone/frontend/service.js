
angular.module('myApp')
  .service('myService', function($http, authService) {
    //client service calls
   this.getClient = function(username) {
      return $http({
        method: 'GET',
        url: `/client/info?username=${username}`
      })
    },
    this.checkLogin = function(username, password) {
      return $http({
        method: 'GET',
        url: `/client/login?username=${username}&password=${password}`

      })
    },
    this.getFiles = function(clientid) {
      return $http({
        method: 'GET',
        url: `/client/files?clientid=${clientid}`

      })
    },
    this.getInvoices = function(clientid) {
      return $http.get(`/client/invoices?clientid=${clientid}`)

    }
    this.getClientName = function() {
      return $http.get(`/client/name`)

    },

    //Admin Service calls
    this.newClient = function(name, email) {
      return $http({
        method: 'POST',
        url: `/new/client`,

        data: {
          name,
          email
        }
      })
    },
    this.getNewClient = function(name, email) {
      return $http.get(`/new/client/created`)

    },
    this.newClientLogin = function(username, password, client_id) {
      return $http({
        method: 'POST',
        url: `/new/client/login`,

        data: {
          username,
          password,
          client_id
        }
      })
    },
    this.addFile = function(filename, filelink, client_id) {
      return $http({
        method: 'POST',
        url: `/add/file`,
        data: {
          filename,
          filelink,
          client_id
        }
      })
    },
    this.addInvoice = function(date, hours, client_id, price, total) {
      return $http({
        method: 'POST',
        url: `/add/invoice`,

        data: {
          date,
          hours,
          client_id,
          price,
          total
        }
      })
    },


    //Authentication service calls
    this.checkAdmin = function(username, password) {
      return $http({
        method: 'GET',
        url: `/admin/login?username=${username}&password=${password}`

        })
    },
    this.googleLogin = function() {
      return $http({
        method: 'GET',
        url: '/api/check/admin'
      })
    },

    //Question service calls
    this.newQuestion = function(question, email) {
      return $http({
        method: 'POST',
        url: '/new/question',
        data: {
          question,
          email
        }
      })
    },
    this.grabQuestions = function() {
      return $http({
        method: 'GET',
        url: '/get/questions'
      })
    },
    this.deleteQuestion = function(id) {
        return $http({
          method: 'DELETE',
          url: `/delete/question/${id}`
        })
    }



  })
