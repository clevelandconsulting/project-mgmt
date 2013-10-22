<?php

require_once('ResourceControllerTestCase.php');

use api\v1\CompaniesController;

class CompanyControllerTest extends ResourceControllerTestCase {

	public function setUp() {
		parent::setUp();
		$this->route = '/companies';
		$this->mockedRepository = $this->mock('Cci\Repositories\Interfaces\CompanyRepositoryInterface');
		$this->status = array_merge( $this->status,
									 array(
											'create'=>404,
											'destroy'=>404,
											'store'=>404,
										));
	}
	
}