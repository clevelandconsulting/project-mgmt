'use strict';

describe('Service: AuthenticationService', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var AuthenticationService, ApiService, SessionService, scope;
  
  var user = {id: 1, username: 'test', email:'test@test.com'};
  var credentials = {username: 'test', password: ''};
  var promise, deferred;
  
  beforeEach(module(function($provide) {
		$provide.factory('ApiService', function() {
			return {
			    login: function(credentials) { },
			    logout: function() {}
			}
		});
  }));
   
  beforeEach(inject(function (_ApiService_, $rootScope) {
    ApiService = _ApiService_;
    scope = $rootScope;
    
  }));
  
  beforeEach(inject(function (_AuthenticationService_, _SessionService_, $q) {
    AuthenticationService = _AuthenticationService_;
    SessionService = _SessionService_;
    
    deferred = $q.defer();
    
	//set up the auth service to return a promise    
    promise = deferred.promise; 
    promise.success = function() {};
    promise.error = function() {};
        
  }));
  
  describe('when using the logout function', function() {
  
  	  var result;
  
  	  beforeEach(function() {
	  	  promise.success = function(result) {
	  		return result({data: user});
		  };
		  spyOn(ApiService,'logout').andReturn(promise);
  	  });
  
	  it('should be defined', function() {
		 expect(AuthenticationService.logout).toBeDefined(); 
	  });
	  
	  describe('and a user is logged in', function() {
	  
	  	 beforeEach(function() {
		 	SessionService.set("test",1);
		 	SessionService.user.set(user);
		 	
		 	result = AuthenticationService.logout();
	  	 });
	  	 
	  	 afterEach(function() {
		  	SessionService.clear();
	  	 })
	  	 
	  	 it('should call the logout function on the api', function() {
		  	 expect(ApiService.logout).toHaveBeenCalled();
	  	 });
	  
		 it('should clear the all session information', function() {
		 	expect(SessionService.user.get()).toBeNull();
		 });
		 
		 it('should return a promise', function() {
			expect(result.then).toBeDefined();	 
		 });
		 
		 it('should maintain other session storage information', function() {
			expect(sessionStorage.length).toEqual(1); 
		 });
		 
	  });
	  
	  
  });

  describe('when using the login function', function() {
	
	  it('should be defined', function() {
		  expect(AuthenticationService.login).toBeDefined();
	  });
	  
	  
	  describe('with valid credentials', function() {
	  	var result = '';
	  		  
		beforeEach(function() {
		  SessionService.user.clear();
		  
		  promise.success = function(result) {
	  		return result({data: user});
		  };
		  spyOn(ApiService,'login').andReturn(promise);
		  
		  
		  result = AuthenticationService.login(credentials);
		  scope.$apply;
			
		});
		
		afterEach(function() {
			SessionService.user.clear();
		});
		
		it('should call ApiService login with correct parameters', function() {
	  		expect(ApiService.login).toHaveBeenCalledWith(credentials);
		});
		 
		it('should return a promise', function() {
			expect(result.then).toBeDefined();	
		});
		
		it('should store the user', function() {
			expect(SessionService.user.get()).toEqual(user);
		});
		  
	  });
	  
	  describe('with invalid credentials', function() {
		 var result = '';
	  		  
		 beforeEach(function() {
		 	SessionService.user.clear();
		 	SessionService.user.set(user);
		  
		 	promise.error = function(result) {
	  			return result({data: user});
	  		};
	  		spyOn(ApiService,'login').andReturn(promise);
		  
	  		result = AuthenticationService.login(credentials);
	  		scope.$apply;
			
		});
		
		afterEach(function() {
			SessionService.user.clear();
		});
		
		it('should call ApiService login with correct parameters', function() {
	  		expect(ApiService.login).toHaveBeenCalledWith(credentials);
		});
		
		it('should return a promise', function() {
			expect(result.then).toBeDefined();	
		});
		
		it('should clear the user out of the session', function() {
			expect(SessionService.user.get()).toBeNull();
		});
	  });
	  
	  
  })

});
