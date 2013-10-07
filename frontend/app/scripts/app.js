'use strict';

angular.module('frontendApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
        	'Csrf': function(ApiService) {
			 	return ApiService.csrf();
			 }
		 }
      })
      .when('/clients', {
        templateUrl: 'views/clients.html',
        controller: 'ClientsCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
