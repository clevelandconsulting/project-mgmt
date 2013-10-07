'use strict';

describe('Service: ApiService', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var ApiService, httpBackend, http;
  beforeEach(inject(function (_ApiService_, $httpBackend, $http) {
  	http = $http;
  	httpBackend = $httpBackend;
  	
    ApiService = _ApiService_;
  }));

  it('should do have an authorization function defined', function () {
    expect(ApiService.auth).toBeDefined();
  });
  
  it('should have a base url to the api', function() {
	 expect(ApiService.baseUrl).toBeDefined(); 
  });
  
  describe('when calling the auth function', function() {
	 
	 var authUrl = '/api/auth';
	 var result;
	 
	 beforeEach(function() {
 		httpBackend.when("POST",authUrl).respond({id: 1, username: 'test', email: 'test@test.com'});
 		result = ApiService.auth({});
	 	httpBackend.flush();
	 		 	
 	});
	 
	 it('should have a valid path to the api', function() {
		 expect(ApiService.authUrl).toEqual(authUrl);
	 });
	 
	 it('should call the api via a http post', function() {
		 httpBackend.expectPOST(authUrl);
	 });

	 it('should return a promise', function() {
		expect(result.then).toBeDefined();
	 });	 
	
	
	/*  THIS ALL NEEDS TO BE IN THE AUTHORIZATION SERVICE, NOT THE API SERVICE
	 
	 describe('and when response is successful', function() {
	 	

	 	 
		
	 });
	 
	 describe('and when response is unauthorized', function() {
		 it('should set a flash message about being not authorized', function() {
			 
		 });
		 
		 it('should make sure user information is not stored', function() {
			 
		 });
	 });
	 
	 describe('and when response is an error', function() {
		 it('should set a flash message about the error',function() {
			 
		 });
	 })
  */
	 
	  
  });
  
  

});
