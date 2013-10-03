<?php

require_once('ResourceControllerTestCase.php');

class TimeControllerTest extends ResourceControllerTestCase {

	public function setUp() {
		parent::setUp();
		$this->route = '/times';
		$this->mockedRepository = $this->mock('Cci\Repositories\Interfaces\TimeRepositoryInterface');
		$this->status = array_merge( $this->status,
									 array(

										));
	}
	
	
}