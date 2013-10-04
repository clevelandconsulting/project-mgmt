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

});
