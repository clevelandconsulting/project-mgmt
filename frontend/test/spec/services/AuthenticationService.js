'use strict';

describe('Service: AuthenticationService', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var AuthenticationService, ApiService, SessionService, scope;
  
  var user = {id: 1, username: 'test', email:'test@test.com'};
  var credentials = {username: 'test', password: ''};
  var promise;
  var deferred;
  
  beforeEach(module(function($provide) {
		$provide.factory('ApiService', function() {
			return {
			    auth: function(credentials) { }
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
    //angularQ = $q;
    
    deferred = $q.defer();
    
	//set up the auth service to return a promise    
    promise = deferred.promise; //.then(function(value) { resolvedValue = value; } );
    promise.success = function() {};
    promise.error = function() {};	
        
  }));

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
		  spyOn(ApiService,'auth').andReturn(promise);
		  
		  result = AuthenticationService.login(credentials);
		  scope.$apply;
			
		});
		
		afterEach(function() {
			SessionService.user.clear();
		});
		
		it('should call ApiService auth', function() {
	  		expect(ApiService.auth).toHaveBeenCalledWith(credentials);
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
	  		spyOn(ApiService,'auth').andReturn(promise);
		  
	  		result = AuthenticationService.login(credentials);
	  		scope.$apply;
			
		});
		
		afterEach(function() {
			SessionService.user.clear();
		});
		
		it('should call ApiService auth', function() {
	  		expect(ApiService.auth).toHaveBeenCalledWith(credentials);
		});
		
		it('should return a promise', function() {
			expect(result.then).toBeDefined();	
		});
		
		it('should clear the user', function() {
			expect(SessionService.user.get()).toBeNull();
		});
	  });
	  
	  
	  
	  
	  
  })

});
