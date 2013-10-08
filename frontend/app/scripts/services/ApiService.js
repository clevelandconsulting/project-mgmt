'use strict';

angular.module('frontendApp')
  .factory('ApiService', function ($http) {
    // Service logic
    // ...
	var apiUrl = 'http://project-mgmt.dev/api';
	
	var options = {
		version: 'v1',
	};
	
	var baseUrl = apiUrl + '/' + options.version;
    
    // Public API here
    return {
      baseUrl: baseUrl,
      loginUrl: baseUrl + '/login',
      logoutUrl: baseUrl + '/logout',
      csrfUrl: baseUrl + '/csrf',
      login: function (credentials, token) {
      	var parameters = {
	      	username: credentials.username,
	      	password: credentials.password,
	      	_token: token
      	};
      	//alert('logging in ' + token);
      	return $http.post(this.loginUrl, parameters);
      },
      logout: function() {
	      return $http.get(this.logoutUrl);
      },
      csrf: function() {
	      return $http.get(this.csrfUrl);
      }
    };
  });
