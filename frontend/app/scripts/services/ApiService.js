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
    
    var _put = function(url,id,data) {
	    var callUrl = url + (id ? '/'+id : '');
		return $http.put(callUrl,data); 
    };
    
    var _get = function(url,id) {
	    var callUrl = url + (id ? '/'+id : '');
		return $http.get(callUrl);
    };
    
    var _post = function(url,id,data) {
	    var callUrl = url + (id ? '/'+id : '');
		return $http.post(callUrl,data); 
    };
    
    var _delete = function(url,id) {
	    var callUrl = url + (id ? '/'+id : '');
		return $http.delete(callUrl);
    }
    
    var baseResource = function(url) {
	    return {
      	  	  put: function(id,data) {
	      	  	  return _put(url,id,data);
      	  	  },
      	  	  get: function(id) {
	      	  	  return _get(url,id);
      	  	  }
	      };
    };
    
    var extendedResource = function(url) {
	    var resource = baseResource(url);
		return angular.extend(resource, {
			post: function(id,data) { 
				 return _post(url,id,data)
			},
			delete: function(id) {
				 return _delete(url,id);
			}
		});
    }
    
    // Public API here
    return {
      baseUrl: baseUrl,
      loginUrl: baseUrl + '/login',
      logoutUrl: baseUrl + '/logout',
      csrfUrl: baseUrl + '/csrf',
      projectsUrl: baseUrl + '/projects',
      clientsUrl: baseUrl + '/companies',
      paymentsUrl: baseUrl + '/payments',
      timesUrl: baseUrl + '/times',
      login: function (credentials) {
      	var parameters = {
	      	username: credentials.username,
	      	password: credentials.password
      	};
      	return $http.post(this.loginUrl, parameters);
      },
      logout: function() {
	      return $http.get(this.logoutUrl);
      },
      csrf: function() {
	      return $http.get(this.csrfUrl);
      },
      projects: function() {
      	 return baseResource(this.projectsUrl);
      },
      clients: function() {
      	 return baseResource(this.clientsUrl);
      },
      payments: function() {
      	return extendedResource(this.paymentsUrl);
      },
      times: function() {
	      return extendedResource(this.timesUrl);
      }
    };
  });
