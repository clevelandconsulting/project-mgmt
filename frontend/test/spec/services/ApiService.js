'use strict';

describe('Service: ApiService', function () {

  var apiLocation = 'http://cci-project-mgmt.dev';
  var csrfToken = 'freferge';
  
  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var ApiService, httpBackend, http;
  beforeEach(inject(function (_ApiService_, $httpBackend, $http) {
  	http = $http;
  	httpBackend = $httpBackend;
  	
    ApiService = _ApiService_;
  }));

  it('should have a login function defined', function () {
    expect(ApiService.login).toBeDefined();
  });
  
  it('should have a logout function defined', function () {
    expect(ApiService.logout).toBeDefined();
  });
  
  it('should have a csrf function defined', function() {
	 expect(ApiService.csrf).toBeDefined(); 
  });
  
  it('should have a base url to the api', function() {
	 expect(ApiService.baseUrl).toBeDefined(); 
  });
  
  describe('when calling the csrf function', function() {
	 var csrfUrl = apiLocation + '/api/v1/csrf';
	 var result;
	 var token = 'frefer';
	 
	 beforeEach(function() {
 		httpBackend.when("GET",csrfUrl).respond(token);
 		result = ApiService.csrf();
	 	httpBackend.flush();
	 		 	
 	});
	 
	 it('should have a valid path to the api', function() {
		 expect(ApiService.csrfUrl).toEqual(csrfUrl);
	 });
	 
	 it('should call the api via a http get', function() {
		 httpBackend.expectGET(csrfUrl);
	 });

	 it('should return a promise', function() {
		expect(result.then).toBeDefined();
	 }); 
  });
  
  describe('when calling the login function', function() {
	 
	 var authUrl = apiLocation + '/api/v1/login';
	 var result;
	 var credentials = {
		 username: 'test',
		 password: 'test',
	 };
	 var parameters = {
		 	username: credentials.username,
		 	password: credentials.password,
		 	_token: csrfToken
	 	}
	 
	 beforeEach(function() {
 		httpBackend.when("POST",authUrl, parameters).respond({id: 1, username: 'test', email: 'test@test.com'});
 		result = ApiService.login(credentials,parameters._token);
	 	httpBackend.flush();
	 		 	
 	});
	 
	 it('should have a valid path to the api', function() {
		 expect(ApiService.loginUrl).toEqual(authUrl);
	 });
	 
	 it('should call the api via a http post with correct parameters', function() {
	 	
		 httpBackend.expectPOST(authUrl,parameters);
	 });

	 it('should return a promise', function() {
		expect(result.then).toBeDefined();
	 });	 	 
	  
  });
  
  describe('when calling the logout function', function() {
	  var authUrl = apiLocation + '/api/v1/logout';
	  var result;
	  
	  beforeEach(function() {
 		httpBackend.when("GET",authUrl).respond(true);
 		result = ApiService.logout({});
	 	httpBackend.flush();
	 		 	
 	});
	 
	 it('should have a valid path to the api', function() {
		 expect(ApiService.logoutUrl).toEqual(authUrl);
	 });
	 
	 it('should call the api via a http post', function() {
		 httpBackend.expectGET(authUrl);
	 });

	 it('should return a promise', function() {
		expect(result.then).toBeDefined();
	 });
	  
  })
  
  

});
