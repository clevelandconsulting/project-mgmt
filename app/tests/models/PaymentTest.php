<?php

class PaymentTest extends TestCase {
	protected $payment;

	public function setUp() {
		parent::setUp();
		
		$this->payment = new Payment();
	}
	
	public function test_project_whenCalled_returnsCollection() {		
		$this->assertInstanceOf('Illuminate\Database\Eloquent\Collection',$this->payment->project()->get());
	}
	
	public function test_user_whenCalled_returnsCollection() {		
		$this->assertInstanceOf('Illuminate\Database\Eloquent\Collection',$this->payment->user()->get());
	}
	
}