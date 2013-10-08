'use strict';

angular.module('frontendApp')
  .controller('LoginCtrl', function ($scope, $location, AuthenticationService) {
    $scope.credentials = { username: "", password: ""};
	//$scope.csrf = JSON.parse(Csrf.data);
	
	$scope.login = function(credentials) {
	
		alert(credentials);
		var auth = AuthenticationService.login(credentials);

		auth.success(function(result) {
			alert('success');
			//$location.path('/clients');
		});
		auth.error(function(result) {
			alert('error');
			//$location.path('/login');			
		});
	}
});
