angular.module('myApp')
    .factory('adminAuth', function() {


      var obj = {}
      this.access = false
      obj.getPermission = function() {
        this.access = true;
      }
      obj.checkPermission = function() {
        return this.access;
      }
      return obj;




    })
