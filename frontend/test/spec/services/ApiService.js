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
  *  Clients function description
  *
  **************************************************************/
  
  describe('when calling the clients', function() {
  	var apiUrl = apiLocation + '/api/v1/companies';
  	var result;
  	var id = 1;
  	
  	beforeEach(function() {
  
  	});
  
  	afterEach(function() {
  
  	});
  	
  	it('should have a valid path to the api', function() { 
  		expect(ApiService.clientsUrl).toEqual(apiUrl);
  	});
  	
  	it('should have a put method', function() { 
  		expect(ApiService.clients().put).toBeDefined();
  	});
  	
  	it('should have a getter method', function() { 
  		expect(ApiService.clients().get).toBeDefined();
  	});
  	
  	describe('put method with success', function() {
  		
  		var data = {name: 'fake'};
  		var response = 'foo';
  		var success = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("PUT",apiUrl+'/'+id, data).respond(201,response);
	  		result = ApiService.clients().put(id,data);
	  		result.success(function(_res) {
		  		success = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http put', function() { 
  			httpBackend.expectPUT(apiUrl+'/'+id,data);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('success function should return response', function() {
	  		expect(success).toEqual(response);
  		});
  	
  	});
  	
  	describe('put method with no id and data', function() {
  		
  		var data = {name: 'fake'};
  		var response = 'foo';
  		var error = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("PUT",apiUrl,data).respond(500,response);
	  		result = ApiService.clients().put(null,data);
	  		result.error(function(_res) {
		  		error = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http put', function() { 
  			httpBackend.expectPUT(apiUrl,data);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('error function should return response', function() {
	  		expect(error).toEqual(response);
  		});
  	
  	});
  	
  	describe('get method with no parameters', function() {
  		
  		beforeEach(function() {
	  		httpBackend.when("GET",apiUrl).respond({});
	 		result = ApiService.clients().get();
		 	httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http get', function() { 
  			httpBackend.expectGET(apiUrl);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  	
  	});
  	
  	describe('get method with an id', function() {
	  	beforeEach(function() {
	  		httpBackend.when("GET",apiUrl+'/'+id).respond({});
	 		result = ApiService.clients().get(id);
		 	httpBackend.flush();
  		});
  		
  		afterEach(function() {
	  		httpBackend.resetExpectations();
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
  *  Projects function description
  *
  **************************************************************/
  
  describe('when calling the projects', function() {
  	var apiUrl = apiLocation + '/api/v1/projects';
  	var result;
  	var id = 1;
  	
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
  	
  	describe('put method with success', function() {
  		
  		var data = {data: 'haha'};
  		var response = 'foo';
  		var success = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("PUT",apiUrl+'/'+id, data).respond(201,response);
	  		result = ApiService.projects().put(id,data);
	  		result.success(function(_res) {
		  		success = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http put', function() { 
  			httpBackend.expectPUT(apiUrl+'/'+id, data);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('success function should return response', function() {
	  		expect(success).toEqual(response);
  		});
  	
  	});
  	
  	describe('put method with no id and data', function() {
  		
  		var data = {name: 'fake'};
  		var response = 'foo';
  		var error = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("PUT",apiUrl,data).respond(500,response);
	  		result = ApiService.projects().put(null,data);
	  		result.error(function(_res) {
		  		error = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http put', function() { 
  			httpBackend.expectPUT(apiUrl,data);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('error function should return response', function() {
	  		expect(error).toEqual(response);
  		});
  	
  	});
  	
  	describe('get method with no parameters', function() {
  		
  		beforeEach(function() {
	  		httpBackend.when("GET",apiUrl).respond({});
	 		result = ApiService.projects().get();
		 	httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http get', function() { 
  			httpBackend.expectGET(apiUrl);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  	
  	});
  	
  	describe('get method with an id', function() {
	  	beforeEach(function() {
	  		httpBackend.when("GET",apiUrl+'/'+id).respond({});
	 		result = ApiService.projects().get(id);
		 	httpBackend.flush();
  		});
  		
  		afterEach(function() {
	  		httpBackend.resetExpectations();
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
 	
 	 afterEach(function() {
	 	httpBackend.resetExpectations();
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
		 
		 afterEach(function() {
	  		httpBackend.resetExpectations();
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
 	 
 	 afterEach(function() {
 	  	httpBackend.resetExpectations();
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
