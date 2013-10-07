<?php

class loginTest extends TestCase {
	
	protected $useDatabase = true;
	
	public function test_routeLogin_InvalidCSRFToken_shouldReturnError() {
		$expectedCode = 500;
		
		
		Route::enableFilters();
		$response = $this->call('POST','api/v1/login');
		
		$actualCode = $response->getStatusCode();
		
		$this->assertEquals($expectedCode,$actualCode);
	
	}
	
	public function test_routeLogin_ValidCSRFTokenNoCredentials_shouldReturnNoAuth() {
		$expectedCode = 401;
		
		
		Route::enableFilters();
		//Input::set(;
		$response = $this->call('POST','api/v1/login', array('_token'=>Session::token()));
		
		$actualCode = $response->getStatusCode();
		
		$this->assertEquals($expectedCode,$actualCode);
	
	}
	
	public function test_routeLogin_ValidCSRFTokenValidCredentials_shouldReturn200() {
		$expectedCode = 200;
		
		
		$u = new User();
		
		$u->username = 'testLogin';
		$u->password = Hash::make('test');
		$u->email = 'test@test.com';
		$u->created_at = new DateTime();
		$u->updated_at = new DateTime();
		
		$u->save();
		
		Route::enableFilters();
		//Input::set(;
		$response = $this->call('POST','api/v1/login', array('_token'=>Session::token(), 'username'=>$u->username, 'password'=>'test'));
		
		$actualCode = $response->getStatusCode();
		
		$this->assertEquals($expectedCode,$actualCode);
	
	}
}