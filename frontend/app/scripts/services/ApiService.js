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
      projectsUrl: baseUrl + '/projects',
      clientsUrl: baseUrl + '/companies',
      login: function (credentials) {
      	var parameters = {
	      	username: credentials.username,
	      	password: credentials.password
      	};
      	//alert('logging in ' + token);
      	return $http.post(this.loginUrl, parameters);
      },
      logout: function() {
	      return $http.get(this.logoutUrl);
      },
      csrf: function() {
	      return $http.get(this.csrfUrl);
      },
      projects: function() {
      	  var url = this.projectsUrl;
      	  return {
		      put: function(id,data) {
		      	var callUrl = url + (id ? '/'+id : '');
			     return $http.put(callUrl,data); 
		      },
		      get: function(id) {
		      	var callUrl = url + (id ? '/'+id : '');
			  	return $http.get(callUrl);
		      }
	      };
      },
      clients: function() {
	      var url = this.clientsUrl;
	      return {
		      put: function(id) {
		      	var data = 'b';
		      	var callUrl = url + (id ? '/'+id : '');
			     return $http.put(callUrl, data);
		      },
		      get: function(id) {
			     var callUrl = url + (id ? '/'+id : '');
			     return $http.get(callUrl);
		      }
	      }
      }
    };
  });
