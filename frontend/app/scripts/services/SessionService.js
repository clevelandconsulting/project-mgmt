'use strict';

angular.module('frontendApp')
  .factory('SessionService', function () {
  
    var storage = sessionStorage;

    // Public API here
    return {
      set: function (key, value) {
        storage.setItem(key,value);
      }
    };
  });
