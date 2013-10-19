'use strict';

describe('Service: ApiService', function () {

  var apiLocation = 'http://cci-project-mgmt.dev';
  var csrfToken = 'freferge';
  
  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var ApiService, httpBackend, http, FlashService;
  beforeEach(inject(function (_ApiService_, _FlashService_, $httpBackend, $http) {
  	http = $http;
  	httpBackend = $httpBackend;
  	
    ApiService = _ApiService_;
    FlashService = _FlashService_;
  }));
  
  beforeEach(function() {
	 var s = spyOn(FlashService,'success'); 
	 var e = spyOn(FlashService,'error');
  });
  
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
  *  Time function description
  *
  **************************************************************/
  
  describe('when calling the times', function() {
  	var apiUrl = apiLocation + '/api/v1/times';
  	var result;
  	var id = 1;
  	
  	beforeEach(function() {
	  	
  	});
  
  	afterEach(function() {
  
  	});
  	
  	it('should have a valid path to the api', function() { 
  		expect(ApiService.timesUrl).toEqual(apiUrl);
  	});
  	
  	it('should have a put method', function() { 
  		expect(ApiService.times().put).toBeDefined();
  	});
  	
  	it('should have a post method', function() { 
  		expect(ApiService.times().post).toBeDefined();
  	});
  	
  	it('should have a delete method', function() { 
  		expect(ApiService.times().delete).toBeDefined();
  	});
  	
  	it('should have a get method', function() { 
  		expect(ApiService.times().get).toBeDefined();
  	});
  	
  	describe('delete method with success', function() {
  		
  		var success = null;
  		var response = 'foo';
  		
  		beforeEach(function() {
  		
	  		httpBackend.when("DELETE",apiUrl+'/'+id).respond(200,response);
	  		result = ApiService.times().delete(id);
	  		result.success(function(_res) {
		  		success = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http delete', function() { 
  			httpBackend.expectDELETE(apiUrl+'/'+id);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('success function should return response', function() {
	  		expect(success).toEqual(response);
  		});
  		
  		it('should call the flash service with success', function() {
	  		expect(FlashService.success).toHaveBeenCalledWith('Successfully deleted!');
  		});
  	
  	});
  	
  	describe('delete method with failure', function() {
  		
  		var error = null;
  		var f = 'foo';
  		var response = { flash: f };
  		
  		beforeEach(function() {
	  		httpBackend.when("DELETE",apiUrl+'/'+id).respond(500,response);
	  		result = ApiService.times().delete(id);
	  		result.error(function(_res) {
		  		error = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http delete', function() { 
  			httpBackend.expectDELETE(apiUrl+'/'+id);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('success function should return response', function() {
	  		expect(error).toEqual(response);
  		});
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
  		});
  	
  	});
  	
  	describe('post method with success', function() {
  		
  		var data = {name: 'fake'};
  		var response = 'foo';
  		var success = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("POST",apiUrl+'/'+id, data).respond(201,response);
	  		result = ApiService.times().post(id,data);
	  		result.success(function(_res) {
		  		success = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http post', function() { 
  			httpBackend.expectPOST(apiUrl+'/'+id,data);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('success function should return response', function() {
	  		expect(success).toEqual(response);
  		});
  		
  		it('should call the flash service with success', function() {
	  		expect(FlashService.success).toHaveBeenCalledWith('Successfully added!');
  		});
  	
  	});
  	
  	describe('post method with no id and data', function() {
  		
  		var data = {name: 'fake'};
  		var f = 'foo';
  		var response = { flash: f };
  		var error = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("POST",apiUrl,data).respond(500,response);
	  		result = ApiService.times().post(null,data);
	  		result.error(function(_res) {
		  		error = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http post', function() { 
  			httpBackend.expectPOST(apiUrl,data);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('error function should return response', function() {
	  		expect(error).toEqual(response);
  		});
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
  		});
  	
  	});
  	
  	describe('put method with success', function() {
  		
  		var data = {name: 'fake'};
  		var response = 'foo';
  		var success = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("PUT",apiUrl+'/'+id, data).respond(201,response);
	  		result = ApiService.times().put(id,data);
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
  		
  		it('should call the flash service with success', function() {
	  		expect(FlashService.success).toHaveBeenCalledWith('Successfully updated!');
  		});
  	
  	});
  	
  	describe('put method with no id and data', function() {
  		
  		var data = {name: 'fake'};
  		var f = 'foo';
  		var response = { flash: f };
  		var error = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("PUT",apiUrl,data).respond(500,response);
	  		result = ApiService.times().put(null,data);
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
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
  		});
  	
  	});
  	
  	describe('get method with no parameters', function() {
  		
  		beforeEach(function() {
	  		httpBackend.when("GET",apiUrl).respond({});
	 		result = ApiService.times().get();
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
	 		result = ApiService.times().get(id);
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
  	
  	describe('get method that returns an error', function() {
  		
  		var f = 'foo';
  		var response = { flash: f };
  		var error = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("GET",apiUrl).respond(500,response);
	  		result = ApiService.times().get();
	  		result.error(function(_res) {
		  		error = _res;
	  		});
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
  		
  		it('error function should return response', function() {
	  		expect(error).toEqual(response);
  		});
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
  		});
  	
  	});
  	
  });
  
  /**************************************************************
  *
  *  Payments function description
  *
  **************************************************************/
  
  describe('when calling the payments', function() {
  	var apiUrl = apiLocation + '/api/v1/payments';
  	var result;
  	var id = 1;
  	
  	beforeEach(function() {
  
  	});
  
  	afterEach(function() {
  
  	});
  	
  	it('should have a valid path to the api', function() { 
  		expect(ApiService.paymentsUrl).toEqual(apiUrl);
  	});
  	
  	it('should have a put method', function() { 
  		expect(ApiService.payments().put).toBeDefined();
  	});
  	
  	it('should have a post method', function() { 
  		expect(ApiService.payments().post).toBeDefined();
  	});
  	
  	it('should have a delete method', function() { 
  		expect(ApiService.payments().delete).toBeDefined();
  	});
  	
  	it('should have a get method', function() { 
  		expect(ApiService.payments().get).toBeDefined();
  	});
  	
  	describe('delete method with success', function() {
  		
  		var success = null;
  		var response = 'foo';
  		
  		beforeEach(function() {
	  		httpBackend.when("DELETE",apiUrl+'/'+id).respond(200,response);
	  		result = ApiService.payments().delete(id);
	  		result.success(function(_res) {
		  		success = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http delete', function() { 
  			httpBackend.expectDELETE(apiUrl+'/'+id);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('success function should return response', function() {
	  		expect(success).toEqual(response);
  		});
  		
  		it('should call the flash service with success', function() {
	  		expect(FlashService.success).toHaveBeenCalledWith('Successfully deleted!');
  		});
  	
  	});
  	
  	describe('delete method with failure', function() {
  		
  		var error = null;
  		var f = 'foo';
  		var response = { flash: f };
  		
  		beforeEach(function() {
	  		httpBackend.when("DELETE",apiUrl+'/'+id).respond(500,response);
	  		result = ApiService.payments().delete(id);
	  		result.error(function(_res) {
		  		error = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http delete', function() { 
  			httpBackend.expectDELETE(apiUrl+'/'+id);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('success function should return response', function() {
	  		expect(error).toEqual(response);
  		});
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
  		});
  	
  	});
  	
  	describe('post method with success', function() {
  		
  		var data = {name: 'fake'};
  		var response = 'foo';
  		var success = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("POST",apiUrl+'/'+id, data).respond(201,response);
	  		result = ApiService.payments().post(id,data);
	  		result.success(function(_res) {
		  		success = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http post', function() { 
  			httpBackend.expectPOST(apiUrl+'/'+id,data);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('success function should return response', function() {
	  		expect(success).toEqual(response);
  		});
  		
  		it('should call the flash service with success', function() {
	  		expect(FlashService.success).toHaveBeenCalledWith('Successfully added!');
  		});
  	
  	});
  	
  	describe('post method with no id and data', function() {
  		
  		var data = {name: 'fake'};
  		var f = 'foo';
  		var response = { flash: f };
  		var error = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("POST",apiUrl,data).respond(500,response);
	  		result = ApiService.payments().post(null,data);
	  		result.error(function(_res) {
		  		error = _res;
	  		});
	  		httpBackend.flush();
  		});
  	
  		afterEach(function() {
	  		httpBackend.resetExpectations();
  		});
  		
  		it('should call the http post', function() { 
  			httpBackend.expectPOST(apiUrl,data);
  		});
  		
  		it('should return a promise', function() { 
  			expect(result.then).toBeDefined();
  		});
  		
  		it('error function should return response', function() {
	  		expect(error).toEqual(response);
  		});
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
  		});
  	
  	});
  	
  	describe('put method with success', function() {
  		
  		var data = {name: 'fake'};
  		var response = 'foo';
  		var success = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("PUT",apiUrl+'/'+id, data).respond(201,response);
	  		result = ApiService.payments().put(id,data);
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
  		
  		it('should call the flash service with success', function() {
	  		expect(FlashService.success).toHaveBeenCalledWith('Successfully updated!');
  		});
  	
  	});
  	
  	describe('put method with no id and data', function() {
  		
  		var data = {name: 'fake'};
  		var f = 'foo';
  		var response = { flash: f };
  		var error = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("PUT",apiUrl,data).respond(500,response);
	  		result = ApiService.payments().put(null,data);
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
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
  		});
  	
  	});
  	
  	describe('get method with no parameters', function() {
  		
  		beforeEach(function() {
	  		httpBackend.when("GET",apiUrl).respond({});
	 		result = ApiService.payments().get();
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
	 		result = ApiService.payments().get(id);
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
  	
  	describe('get method that returns an error', function() {
  		
  		var f = 'foo';
  		var response = { flash: f };
  		var error = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("GET",apiUrl).respond(500,response);
	  		result = ApiService.payments().get();
	  		result.error(function(_res) {
		  		error = _res;
	  		});
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
  		
  		it('error function should return response', function() {
	  		expect(error).toEqual(response);
  		});
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
  		});
  	
  	});
  	
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
  		
  		it('should call the flash service with success', function() {
	  		expect(FlashService.success).toHaveBeenCalledWith('Successfully updated!');
  		});
  	
  	});
  	
  	describe('put method with no id and data', function() {
  		
  		var data = {name: 'fake'};
  		var f = 'foo';
  		var response = { flash: f };
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
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
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
  	
  	describe('get method that returns an error', function() {
  		
  		var f = 'foo';
  		var response = { flash: f };
  		var error = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("GET",apiUrl).respond(500,response);
	  		result = ApiService.clients().get();
	  		result.error(function(_res) {
		  		error = _res;
	  		});
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
  		
  		it('error function should return response', function() {
	  		expect(error).toEqual(response);
  		});
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
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
  		
  		it('should call the flash service with success', function() {
	  		expect(FlashService.success).toHaveBeenCalledWith('Successfully updated!');
  		});
  	
  	});
  	
  	describe('put method with no id and data', function() {
  		
  		var data = {name: 'fake'};
  		var f = 'foo';
  		var response = { flash: f };
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
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
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
  	
  	describe('get method that returns an error', function() {
  		
  		var f = 'foo';
  		var response = { flash: f };
  		var error = null;
  		
  		beforeEach(function() {
	  		httpBackend.when("GET",apiUrl).respond(500,response);
	  		result = ApiService.projects().get();
	  		result.error(function(_res) {
		  		error = _res;
	  		});
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
  		
  		it('error function should return response', function() {
	  		expect(error).toEqual(response);
  		});
  		
  		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
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
	 
	 var result;
	 var credentials = {
		 username: 'test',
		 password: 'test',
	 };
	 var parameters = {
		 	username: credentials.username,
		 	password: credentials.password
	 }
	 
	 it('should have a valid path to the api', function() {
		 expect(ApiService.loginUrl).toEqual(authUrl);
	 });
	 
	 describe('with receiving a user in response', function() {
		 beforeEach(function() {
	 		httpBackend.when("POST",authUrl, parameters).respond({id: 1, username: 'test', email: 'test@test.com'});
	 		result = ApiService.login(credentials);
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
	 
	 describe('and getting a unauthorized response', function() {
	 	
	 	var f = 'foo'
	 	var response = { flash: f };
	 	
	 	beforeEach(function() {
		 	httpBackend.when("POST",authUrl, parameters).respond(401, response);
	 		result = ApiService.login(credentials);
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
		
		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
  		});
	 
	 });
	 
	 describe('and getting a error response', function() {
	 	
	 	var f = 'foo'
	 	var response = { flash: f };
	 	
	 	beforeEach(function() {
		 	httpBackend.when("POST",authUrl, parameters).respond(500, response);
	 		result = ApiService.login(credentials);
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
		
		it('should call the flash service with error', function() {
	  		expect(FlashService.error).toHaveBeenCalledWith(f);
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
	 
	 it('should call the flash service with success', function() {
	  		expect(FlashService.success).toHaveBeenCalledWith('Successfully logged out!');
  	 });
	  
  })
  
  

});
