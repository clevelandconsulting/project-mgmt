<?php

class ProjectTest extends TestCase {

	protected $project;
	protected $useDatabase = true;

	public function setUp() {
		parent::setUp();
		
		$this->project = dummyModels::dummyProject();
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
	
	public function test_hoursToBeWorked_worked0paid0_returnsZero() {
		
		$expectedHoursToBeWorked = 0;
		
		$result = $this->project->hoursToBeWorked();
		
		$this->assertEquals($expectedHoursToBeWorked,$result);
	}
	
	public function test_hoursToBeWorked_worked2paid3_returnsOne() {
		
		$timeWorked = 2;
		$paymentForHours = 3;
		
		$expectedHoursToBeWorked = $paymentForHours - $timeWorked;
	
		$time = dummyModels::dummyTime($this->project->id,$timeWorked);
		$payment = dummyModels::dummyPayment($this->project->id,$paymentForHours);
	
		$result = $this->project->hoursToBeWorked();
		
		$this->assertEquals($expectedHoursToBeWorked,$result);
	}
	
	public function test_hoursToBeWorked_worked3paid3_returnsZero() {
		
		$timeWorked = 3;
		$paymentForHours = 3;
		
		$expectedHoursToBeWorked = $paymentForHours - $timeWorked;
	
		$time = dummyModels::dummyTime($this->project->id,$timeWorked);
		$payment = dummyModels::dummyPayment($this->project->id,$paymentForHours);
	
		$result = $this->project->hoursToBeWorked();
		
		$this->assertEquals($expectedHoursToBeWorked,$result);
	}
	
	
	
}