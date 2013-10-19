'use strict';

angular.module('frontendApp')
  .factory('ApiService', function ($http, FlashService) {
    // Service logic
    // ...
	var apiUrl = 'http://cci-project-mgmt.dev/api';
	
	var options = {
		version: 'v1',
	};
	
	var success = function(p, message) {
		p.success(function(data) {
			if ( data.flash != undefined ) {
				message = data.flash;
			}
			
			FlashService.success(message);
		});
		
		return p;
	}
	
	var error = function(p) {
		p.error(function(data) {
			var message = 'There was a problem!'
			if ( data.flash != undefined ) {
				message = data.flash;
			}
			else if ( data.error != undefined) {
				message = data.error.message;
			}
			
			FlashService.error(message);
		});
		return p;
	}
	
	var baseUrl = apiUrl + '/' + options.version;
    
    var _put = function(url,id,data) {
	    var callUrl = url + (id ? '/'+id : '');
		var p = $http.put(callUrl,data); 
		p = success(p,'Successfully updated!');
		p = error(p);
		return p;
    };
    
    var _get = function(url,id) {
	    var callUrl = url + (id ? '/'+id : '');
		var p = $http.get(callUrl);
		p = error(p);
		return p;
    };
    
    var _post = function(url,id,data) {
	    var callUrl = url + (id ? '/'+id : '');
		var p = $http.post(callUrl,data); 
		p = success(p,'Successfully added!');
		p = error(p);
		return p;
    };
    
    var _delete = function(url,id) {
	    var callUrl = url + (id ? '/'+id : '');
		var p = $http.delete(callUrl);
		p = success(p,'Successfully deleted!');
		p = error(p);
		return p;
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
      	var p = $http.post(this.loginUrl, parameters);
      	p = error(p);
      	return p;
      },
      logout: function() {
	      var p = $http.get(this.logoutUrl);
	      p = success(p,"Successfully logged out!");
	      return p;
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
