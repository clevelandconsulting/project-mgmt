'use strict';

angular.module('frontendApp')
  .factory('AuthenticationService', function (ApiService, SessionService) {
    // Service logic
    // ...
    var api = ApiService;
    var sess = SessionService;

    // Public API here
    return {
      login: function(credentials, token) {
	      var p = api.login(credentials, token);
	      
	      p.success(function(result) {
		     sess.user.set(result.data);
		 });
		 p.error(function(error) {
			sess.user.clear();	
		 });
	      
	      return p;
      },
      logout: function() {
      	  var p = api.logout();
      	  
	      sess.user.clear();
	      
	      return p;
      }
    };
  });
