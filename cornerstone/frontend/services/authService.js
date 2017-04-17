angular.module('myApp')
  .factory('authService', function() {

    var obj = {}
    this.access = false
    obj.getClientPermission = function() {
      this.access = true;
    }
    obj.checkClientPermission = function() {
      return this.access;
    }
    return obj;









  })
