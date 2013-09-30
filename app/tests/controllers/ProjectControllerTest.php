<?php

require_once('ResourceControllerTestCase.php');

class ProjectControllerTest extends ResourceControllerTestCase {

	public function setUp() {
		parent::setUp();
		$this->route = '/projects';
		
		$this->mockedRepository = $this->mock('Cci\Repositories\Interfaces\ProjectRepositoryInterface');
		
		$this->status = array_merge( $this->status,
							array(
								'create'=>404,
								'destroy'=>404,
								'store'=>404,
							));
		
		 
	}
	
	public function test_basecampUpdate_whenSuccesful_returnsHttpOK() {
		$this->mockedRepository->shouldReceive('updateBasecamp')->once()->andReturn(true);
		
		$response = $this->apiCall('GET','/basecamp/update');
		
		$this->assertResponseOk();
	}
	
	public function test_basecampUpdate_whenUnSuccesful_returnsHttp500() {
		$this->mockedRepository->shouldReceive('updateBasecamp')->once()->andReturn(false);
		
		$response = $this->apiCall('GET','/basecamp/update');
		
		$this->assertResponseStatus(500);
	}
	
}