'use strict';

angular.module('frontendApp')
  .controller('LoginCtrl', function ($scope, $location, AuthenticationService, Csrf) {
    $scope.credentials = { username: "", password: ""};
	$scope.csrf = JSON.parse(Csrf.data);
	
	$scope.login = function(credentials, token) {
		var auth = AuthenticationService.login(credentials, token);
		if ( auth ) {
			$location.path('/clients');			
		}
		else {
			$location.path('/login');
		}

	}
});
