'use strict';

angular.module('frontendApp')
  .controller('LoginCtrl', function ($scope, $location, AuthenticationService) {
    $scope.credentials = { username: "", password: ""};
	
	$scope.login = function(credentials) {

		var auth = AuthenticationService.login(credentials);

		auth.success(function(result) {
			$location.path('/clients');
		});
		auth.error(function(result) {
			$location.path('/login');			
		});
	}
});
