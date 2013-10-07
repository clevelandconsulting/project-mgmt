'use strict';

angular.module('frontendApp')
  .factory('SessionService', function () {
  
    var storage = sessionStorage;
    var userKey = 'user';
    
    var setter = function (key, value) {
        storage.setItem(key,value);
    };
    
    var getter = function(key) {
	     return storage.getItem(key);
    };
    
    var unsetter = function(key) {
	 storage.removeItem(key);   
    }; 
    
    var clearer = function() {
	 storage.clear();   
    };
    
    // Public API here
    return {
      set: setter,
      get: getter,
      unset: unsetter,
      clear: clearer,
      user: {
	      set: function(user) {
	      	 var u = JSON.stringify(user);
		      setter(userKey,u);
	      },
	      clear: function() {
		      unsetter(userKey);
	      },
	      get: function() {
		      return JSON.parse(getter(userKey));
	      }
      }
      
    };
  });
