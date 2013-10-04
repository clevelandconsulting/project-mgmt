'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(angular.mock.module('frontendApp'));

  var LoginCtrl, scope, location, apiService, authresult;
  
  
  beforeEach(module(function($provide) {
		$provide.factory('apiService', function() {
			return {
			    auth: function(credentials) { }
			}
		});
	}));
   
  beforeEach(inject(function (_ApiService_) {
    apiService = _ApiService_;
    
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, ApiService) {
    scope = $rootScope.$new();
    location = $location;
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      $location: location,
      apiService: ApiService
    });
  }));
  

  it('should attach some credentials', function () {
  	var expectedCredentials = { username: "", password: "" };
    expect(scope.credentials).toEqual(expectedCredentials);
  });
  
  it('should have the apiService available', function () {
    expect(apiService).toBeDefined();
  });
 
 
  describe('during the authorization process', function() {
	  
	  var authSpy;
	  
	  beforeEach(function() {
		authSpy  = spyOn(apiService,'auth');
	  })

	  describe('Valid authorizations', function() {
			
			beforeEach(function() {
				authSpy.andCallFake(function() { return true; });
				scope.login(scope.credentials);
			});
			
			it('should call the apiService auth function', function() {
			  	 expect(apiService.auth).toHaveBeenCalledWith(scope.credentials); 
		  	  });
		 	
			it('should redirect user to /clients if auth returns true', function() {
				  expect(location.path()).toBe('/clients');
			});
	  });
	  
	  describe('Invalid authorizations', function() {
		 
		 	beforeEach(function() {
				authSpy.andCallFake(function() { return false; });
				scope.login(scope.credentials);
			});
			
			it('should call the apiService auth function', function() {
		  		expect(apiService.auth).toHaveBeenCalledWith(scope.credentials); 
	  	    });
			
			it('should redirect user to /login if auth returns false', function() {
				  expect(location.path()).toBe('/login');
			});
		  
	  });
  
  });
});
