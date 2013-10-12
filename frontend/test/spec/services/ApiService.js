'use strict';

describe('Service: ApiService', function () {

  var apiLocation = 'http://project-mgmt.dev';
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
  
  /**************************************************************
  *
  *  API FUNCTION DEFINITIONS
  *
  **************************************************************/
 
  
  it('should have a login function defined', function () {
    expect(ApiService.login).toBeDefined();
  });
  
  it('should have a logout function defined', function () {
    expect(ApiService.logout).toBeDefined();
  });
  
  it('should have a csrf function defined', function() {
	 expect(ApiService.csrf).toBeDefined(); 
  });
  
  it('should have a projects function defined', function() {
	  expect(ApiService.projects).toBeDefined();
  });
  
  it('should have a base url to the api', function() {
	 expect(ApiService.baseUrl).toBeDefined(); 
  });
  
  /**************************************************************
  *
  *  Projects function description
  *
  **************************************************************/
  
  describe('when calling the projects', function() {
  	var apiUrl = apiLocation + '/api/v1/projects';
  	var result;
  	
  	beforeEach(function() {
  
  	});
  
  	afterEach(function() {
  
  	});
  	
  	it('should have a valid path to the api', function() { 
  		expect(ApiService.projectsUrl).toEqual(apiUrl);
  	});
  	
  	it('should have a put method', function() { 
  		expect(ApiService.projects().put).toBeDefined();
  	});
  	
  	it('should have a getter method', function() { 
  		expect(ApiService.projects().get).toBeDefined();
  	});
  	
  	describe('get method with no parameters', function() {
  		
  		beforeEach(function() {
	  		httpBackend.when("GET",apiUrl).respond({});
	 		result = ApiService.projects().get();
		 	httpBackend.flush();
  		});
  	
  		afterEach(function() {
  	
  		});
  		
  		it('should call the http get', function() { 
  			httpBackend.expectGET(apiUrl);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  	
  	});
  	
  	describe('get method with an id', function() {
  		var id = 1;
	  	beforeEach(function() {
	  		httpBackend.when("GET",apiUrl+'/'+id).respond({});
	 		result = ApiService.projects().get(id);
		 	httpBackend.flush();
  		});
  		
  		it('should call the http get', function() { 
  			httpBackend.expectGET(apiUrl+'/'+id);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  	});
  	
  	
  	
  	
  });
  
  
    /**************************************************************
    *
    *  CSRF FUNCTION DESCRIPTION
    *
    **************************************************************/
  
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
  
  /**************************************************************
  *
  *  Login function description
  *
  **************************************************************/
  
  describe('when calling the login function', function() {
	 
	 var authUrl = apiLocation + '/api/v1/login';
	 
	 it('should have a valid path to the api', function() {
		 expect(ApiService.loginUrl).toEqual(authUrl);
	 });
	 
	 describe('with receiving a user in response', function() {
		 var result;
		 var credentials = {
			 username: 'test',
			 password: 'test',
		 };
		 var parameters = {
			 	username: credentials.username,
			 	password: credentials.password
		 }
		 
		 beforeEach(function() {
	 		httpBackend.when("POST",authUrl, parameters).respond({id: 1, username: 'test', email: 'test@test.com'});
	 		result = ApiService.login(credentials,parameters._token);
		 	httpBackend.flush();
		 		 	
	 	 }); 
		 
		 it('should call the api via a http post with correct parameters', function() {
			 httpBackend.expectPOST(authUrl,parameters);
		 });
	
		 it('should return a promise', function() {
			expect(result.then).toBeDefined();
		 });	  
		 
	 });
	  
  });

  /**************************************************************
  *
  *  Logout function description
  *
  **************************************************************/
  
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
