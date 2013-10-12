'use strict';

angular.module('frontendApp')
  .factory('AuthenticationService', function (ApiService, SessionService) {
    // Service logic
    // ...
    var api = ApiService;
    var sess = SessionService;
    //var deferred = $q.defer();
    //var promise = deferred.promise;
    //var scope = $rootScope;
    // Public API here
    return {
      login: function(credentials) {
      	 //var csrfPromise = api.csrf();
      	 //var token, p;

      	 //deferred.promise.then(function(token) {
      	// alert("LOgging in with " + CSRF_TOKEN + ' ' + credentials.username);
	      var p = api.login(credentials);
	      
	      
	      
	      	 p.success(function(result) {
	      	 	//alert(result);
			     sess.user.set(result.data);
			 });
			 p.error(function(error) {
				sess.user.clear();	
			 });
			 
			 return p;
      	 //});
      	 /*
      	 csrfPromise.success(function(result) {
      	 	alert("SUCCESS");
      	 	//alert(scope);
	      	 token = result;
	      	 alert('T' + token);
	      	 deferred.resolve(token);
	      	 //scope.$apply();
      	 });
      	 
      	 csrfPromise.error(function(result) {
	      	alert("PROBLEM"); 
	      	deferred.reject();
	      	//scope.$apply();
      	 });
      
	      return deferred.promise;*/
      },
      logout: function() {
      	  var p = api.logout();
      	  
	      sess.user.clear();
	      
	      return p;
      }
    };
  });
