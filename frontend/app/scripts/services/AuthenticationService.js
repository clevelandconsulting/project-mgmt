'use strict';

angular.module('frontendApp')
  .factory('AuthenticationService', function (ApiService, SessionService) {
    // Service logic
    // ...
    var api = ApiService;
    var sess = SessionService;

    // Public API here
    return {
      login: function(credentials) {
	      var p = api.auth(credentials);
	      
	      p.success(function(result) {
		     sess.user.set(result.data);
		 });
		 p.error(function(error) {
			sess.user.clear();	
		 });
	      
	      return p;
      }
    };
  });
