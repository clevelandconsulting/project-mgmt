<?php

class UserTest extends TestCase {

	protected $user;
	protected $useDatabase = true;

	public function setUp() {
		parent::setUp();
		
		$this->user = new User();
	}
	
	public function test_projects_whenCalled_returnsCollection() {
		$this->assertInstanceOf('Illuminate\Database\Eloquent\Collection',$this->user->projects()->get());
	}
	
}