'use strict';

angular.module('frontendApp')
  .controller('LoginCtrl', function ($scope, $location, AuthenticationService, FlashService) {
    $scope.credentials = { username: "", password: ""};
	$scope.flash = FlashService;
	
	$scope.flash.configure({
		classes: {
			error: 'alert-error',
			info: 'alert-info',
			success: 'alert-success',
			warning: 'alert-warning'	
		}
	});
	
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
