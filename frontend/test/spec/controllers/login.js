'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(angular.mock.module('frontendApp'));

  var LoginCtrl, scope, location, authService, authresult, flashService;//, csrf;
  //var token = 'freferfer';
  var deferred, promise;
  
  beforeEach(module(function($provide) {

		$provide.factory('AuthenticationService', function() {
			return {
				login: function() {}
			}
		});
		
	}));
	
  //csrf = { data: JSON.stringify(token) };
   
  beforeEach(inject(function (_AuthenticationService_, _FlashService_, $controller, $rootScope, $location, $q) {
    authService = _AuthenticationService_;
    flashService = _FlashService_;
    scope = $rootScope.$new();
    location = $location;
    //q = $q;
    
    deferred = $q.defer();
    promise = deferred.promise;
        
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      $location: location,
      AuthenticationService: authService,
      //Csrf: csrf
    });
    
    
  }));
  
 
  it('should attach some credentials', function () {
  	var expectedCredentials = { username: "", password: "" };
    expect(scope.credentials).toEqual(expectedCredentials);
  });
  
  it('should have the a flash on the scope', function() {
	 expect(scope.flash).toBeDefined();
  });
  
  it('should have a flash on the scope that is the flashservice', function() { 
  	expect(scope.flash).toEqual(flashService);
  });
  
  
  it('should have the apiService available', function () {
    expect(authService).toBeDefined();
  });
 
 
  describe('during the authorization process', function() {
	  
	  var authSpy;

	  beforeEach(function() {
		authSpy  = spyOn(authService,'login');		
	  });

	  describe('Valid authorizations', function() {
			
			var result;
			
			beforeEach(function() {
				promise.success = function(result) { return result({}); };
				promise.error = function() {};

				authSpy.andCallFake(function() { return promise; });
				scope.login(scope.credentials);
				
				scope.$apply();
			});
			
			it('should call the apiService auth function', function() {
			  	 expect(authService.login).toHaveBeenCalledWith(scope.credentials); 
		  	});
		 	
			it('should redirect user to /clients if auth returns success', function() {
				  expect(location.path()).toBe('/clients');
			});
	  });
	  
	  describe('Invalid authorizations', function() {
		 
		 	beforeEach(function() {
		 		promise.success = function() {};
		 		promise.error = function(result) { return result({}); };
		 		
				authSpy.andCallFake(function() { return promise; });
				scope.login(scope.credentials);
				
				scope.$apply();
			});
			
			it('should call the apiService auth function', function() {
		  		expect(authService.login).toHaveBeenCalledWith(scope.credentials); 
	  	    });

			it('should redirect user to /login if auth returns error', function() {
				  expect(location.path()).toBe('/login');
			});
		  
	  });
  
  });
});
