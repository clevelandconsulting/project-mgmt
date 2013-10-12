'use strict';
/*

(function() {

  var $injector = angular.injector(['ng']);

  $injector.invoke(function($http, $rootScope) {
    $rootScope.$apply(function() {
      $http.get("http://project-mgmt.dev/api/v1/csrf").then(function(response) {
        alert(response.data.csrf_token);
        angular.module("frontendApp").constant("CSRF_TOKEN", response.data.csrf_token);
        angular.bootstrap(document, ['frontendApp']);
      });
    });
  });

})();

*/ 

angular.module('frontendApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/clients', {
        templateUrl: 'views/clients.html',
        controller: 'ClientsCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });