<?php


class AuthTest extends TestCase {
	
	protected $useDatabase = true;
	
	function test_user_noUser_returnsNull() {
		$result = Auth::user();
		
		$this->assertNull($result);
	}
	
	function test_user_HasUser_hasId() {
		$validUser = array('username'=>'test','password'=>'pass');
		
		$result = Auth::attempt($validUser);
		
		$user = Auth::user()->toArray();

		$this->assertArrayHasKey('id',$user);
	}
	
	function test_user_HasUser_hasNoPassword() {
		$validUser = array('username'=>'test','password'=>'pass');
		
		$result = Auth::attempt($validUser);
		
		$user = Auth::user()->toArray();

		$this->assertArrayNotHasKey('password',$user);
	}
}