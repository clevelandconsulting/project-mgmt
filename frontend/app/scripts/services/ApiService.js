'use strict';

angular.module('frontendApp')
  .factory('ApiService', function ($http) {
    // Service logic
    // ...
	var baseUrl = '/api';
    

    // Public API here
    return {
      baseUrl: baseUrl,
      authUrl: baseUrl + '/auth',
      auth: function (credentials) {
      	return $http.post(this.authUrl);
      }
    };
  });
