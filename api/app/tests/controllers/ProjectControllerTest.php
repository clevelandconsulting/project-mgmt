<?php

require_once('ResourceControllerTestCase.php');

use Project;

class ProjectControllerTest extends ResourceControllerTestCase {

	protected $useDatabase = true;

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
	
	/*
	public function test_show_whenValidId_returnsHoursToBeWorkedAttribute() {
		$project = dummyModels::dummyProject();
		
		$this->mockedRepository->shouldReceive('find')->with($project->id)->once()->andReturn($project);
	
		$response = $this->apiCall('GET','/' . $project->id );
		$object = json_decode($response->getContent());
		
		
		$this->assertObjectHasAttribute("hoursToBeWorked",$object);
	}
	*/
	
	public function test_basecampUpdate_whenSuccesful_returnsHttpOK() {
		$this->mockedRepository->shouldReceive('basecampUpdate')->once()->andReturn(true);
		
		$response = $this->apiCall('GET','/basecamp/update');
		
		$this->assertResponseOk();
	}
	
	public function test_basecampUpdate_whenUnSuccesful_returnsHttp500() {
		$this->mockedRepository->shouldReceive('basecampUpdate')->once()->andReturn(false);
		
		$response = $this->apiCall('GET','/basecamp/update');
		
		$this->assertResponseStatus(500);
	}
	
}