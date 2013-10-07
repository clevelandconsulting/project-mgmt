'use strict';

describe('Service: SessionService', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var SessionService;
  beforeEach(inject(function (_SessionService_) {
    SessionService = _SessionService_;
  }));
  
  var key = 'test';
  var value = 'value';
  
  it('should have a set method', function() {
	expect(SessionService.set).toBeDefined();  
  });

  it('should have a get method', function() {
	expect(SessionService.get).toBeDefined();  
  });
  
  it('should have a unset method', function() {
	expect(SessionService.unset).toBeDefined();  
   });
   
   it('should have a clear method', function() {
	expect(SessionService.clear).toBeDefined();  
   });
   
   describe('testing basic functionality with key/value', function() {
	 
	   beforeEach(function() {
		 SessionService.set(key,value);
	   });
		 
	   afterEach(function() {
			 sessionStorage.clear();
	   });
	  
	  describe('when calling the set method', function() {	 
		 it('should set the session storage with the key', function() {
			 expect(sessionStorage.key(0)).toEqual(key);
		 });
		 
		 it('should set the session storage with the value at the key', function() {
			 expect(sessionStorage.getItem(key)).toEqual(value);
		 }); 
		 
	  });
	  
	  describe('when calling the get method with a valid key', function() {
		  
		  var returnedValue = '';
		  
		  beforeEach(function() {
			 returnedValue = SessionService.get(key);
		  });
		  
		  it('should expect to get the value', function() {
			  expect(returnedValue).toEqual(value);
		  });
	  });
	  
	  describe('when calling the unset method', function() {
		  var expectedValue = null;
		  
		  beforeEach(function() {
			  SessionService.unset(key);
		  });
		  
		  it('should return null when get is called for the same key', function() {
			var returnedValue = SessionService.get(key);  
			
			expect(returnedValue).toBeNull();//(returnedValue);
		  });
	  });
	  
	  describe('when calling the clear method', function() {
		  it('should make the storagesession length to 0', function() {
			  var expectedLength = 0;
			  
			  SessionService.clear();
			  
			  expect(sessionStorage.length).toEqual(expectedLength);
		  });
	  });
 
	   
   });
   
   
   describe('testing user storage', function() {
	 	
	 var user = { id: 1, username: 'test', email: 'test@test.com' };
	 	 
	 it('should have a user.set function', function() {
		 expect(SessionService.user.set).toBeDefined();
	 });
	 	 
	 it('should have a user.get function', function() {
		 expect(SessionService.user.get).toBeDefined();
	 });

	 it('should have a user.clear function', function() {
		 expect(SessionService.user.clear).toBeDefined();
	 });
	 
	 beforeEach(function() {
	 	SessionService.user.set(user);
 	 });
 	
 	 afterEach(function() {
		SessionService.clear(); 
	 });
	 
	 describe('when running the setUser function', function() {
	 
	 	it('should set the user key to the stringified version of the user', function() {
			expect(SessionService.get('user')).toEqual(JSON.stringify(user)); 
		 });	 
		 
	 });
	 
	 describe('when running the getUser function', function() {
		 it('should get the correct user', function() {
			expect(SessionService.user.get()).toEqual(user); 
		 });
		 
		 it('should return null if there is no user', function() {
			 SessionService.clear();
			 
			 expect(SessionService.user.get()).toBeNull();
		 });
	 });
	 
	 describe('when running the user.clear function', function() {
		it('should return null when asking for a user', function() {
			SessionService.user.clear();
			
			expect(SessionService.user.get()).toBeNull();
		}); 
		
		it('should keep another key in the storage', function() {
			var otherKey ='key';
			var otherValue = 'value';
			
			SessionService.set(otherKey,otherValue);
			
			SessionService.user.clear();
			
			expect(SessionService.get(otherKey)).toEqual(otherValue);
		})
	 });
	   
   });

});
