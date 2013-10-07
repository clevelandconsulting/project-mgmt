'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(angular.mock.module('frontendApp'));

  var LoginCtrl, scope, location, authService, authresult, csrf;
  var token = 'freferfer';
  
  beforeEach(module(function($provide) {

		$provide.factory('AuthenticationService', function() {
			return {
				login: function() {}
			}
		});
		
	}));
	
  csrf = { data: JSON.stringify(token) };
   
  beforeEach(inject(function (_AuthenticationService_, $controller, $rootScope, $location) {
    authService = _AuthenticationService_;
    scope = $rootScope.$new();
    location = $location;
    
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      $location: location,
      AuthenticationService: authService,
      Csrf: csrf
    });
    
    
  }));
  
 
  it('should attach some credentials', function () {
  	var expectedCredentials = { username: "", password: "" };
    expect(scope.credentials).toEqual(expectedCredentials);
  });
  
  it('should have the csrf token', function() {
	 expect(scope.csrf).toEqual(token); 
  });
  
  it('should have the apiService available', function () {
    expect(authService).toBeDefined();
  });
 
 
  describe('during the authorization process', function() {
	  
	  var authSpy;
	  
	  beforeEach(function() {
		authSpy  = spyOn(authService,'login');
	  })

	  describe('Valid authorizations', function() {
			
			beforeEach(function() {
				authSpy.andCallFake(function() { return true; });
				scope.login(scope.credentials, token);
			});
			
			it('should call the apiService auth function', function() {
			  	 expect(authService.login).toHaveBeenCalledWith(scope.credentials, token); 
		  	  });
		 	
			it('should redirect user to /clients if auth returns true', function() {
				  expect(location.path()).toBe('/clients');
			});
	  });
	  
	  describe('Invalid authorizations', function() {
		 
		 	beforeEach(function() {
				authSpy.andCallFake(function() { return false; });
				scope.login(scope.credentials, token);
			});
			
			it('should call the apiService auth function', function() {
		  		expect(authService.login).toHaveBeenCalledWith(scope.credentials, token); 
	  	    });
			
			it('should redirect user to /login if auth returns false', function() {
				  expect(location.path()).toBe('/login');
			});
		  
	  });
  
  });
});
