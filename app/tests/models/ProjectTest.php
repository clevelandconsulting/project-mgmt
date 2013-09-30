<?php

class ProjectTest extends TestCase {

	protected $project;

	public function setUp() {
		parent::setUp();
		
		$this->project = new Project();
	}

	public function test_company_whenCalled_returnsCollection() {		
		$this->assertInstanceOf('Illuminate\Database\Eloquent\Collection',$this->project->company()->get());
	}
	
	public function test_users_whenCalled_returnsCollection() {
		$this->assertInstanceOf('Illuminate\Database\Eloquent\Collection',$this->project->users()->get());
	}
	
	public function test_payments_whenCalled_returnsCollection() {
		$this->assertInstanceOf('Illuminate\Database\Eloquent\Collection',$this->project->payments()->get());
	}
	
	public function test_times_whenCalled_returnsCollection() {
		$this->assertInstanceOf('Illuminate\Database\Eloquent\Collection',$this->project->times()->get());
	}
}