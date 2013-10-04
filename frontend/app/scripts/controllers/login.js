'use strict';

angular.module('frontendApp')
  .controller('LoginCtrl', function ($scope, $location, ApiService) {
    $scope.credentials = { username: "", password: ""};
	    
	$scope.login = function(credentials) {
		var auth = ApiService.auth(credentials);
		if ( auth ) {
			$location.path('/clients');			
		}
		else {
			$location.path('/login');
		}

	}
});
