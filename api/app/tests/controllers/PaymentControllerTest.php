<?php

require_once('ResourceControllerTestCase.php');

class PaymentControllerTest extends ResourceControllerTestCase {

	public function setUp() {
		parent::setUp();
		$this->route = '/payments';
		$this->mockedRepository = $this->mock('Cci\Repositories\Interfaces\PaymentRepositoryInterface');
		$this->status = array_merge( $this->status,
									 array(

										));
	}
	
	
}