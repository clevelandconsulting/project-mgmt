<?php

use Cci\Basecamp\BasecampService;

class BasecampServiceTest extends TestCase {
	
	protected $service;
	protected $sirprize;
	
	public function setUp() {
		parent::setUp();
		
		//mock the sirprize service for this test
		$this->sirprize = $this->mock('Cci\Basecamp\SirprizeServiceInterface');
		$this->service = new BasecampService($this->sirprize); //App::make('basecamp');
	}
	
	public function setProjectInstance($errors=false) {
		//$this->sirprize->shouldReceive('getReponse->isError')->andReturn($errors);
		$this->sirprize->shouldReceive('getProjectsInstance')->once()->andReturn(SirprizeBasecampMocks::mockProjectInstance($errors));
	}
	
	public function setPersonsInstance($errors=false) {
		//$this->sirprize->shouldReceive('getReponse->isError')->andReturn($errors);
		$this->sirprize->shouldReceive('getPersonsInstance')->once()->andReturn(SirprizeBasecampMocks::mockPersonsInstance($errors));
	}

	public function test_getProjects_ProjectInstanceNoErrors_returnsProjects() {
		$this->setProjectInstance($errors=false);
				
		$projects = $this->service->getProjects();
	
		$this->assertTrue(is_array($projects));
	}
	
	public function test_getProjects_ProjectInstanceHasErrors_returnsNull() {
		$this->setProjectInstance($errors=true);
		
		$projects = $this->service->getProjects();
	
		$this->assertNull($projects);
	}
	
	public function test_getCompanies_ProjectInstanceNoErrors_returnsCompanies() {
		$this->setProjectInstance($errors=false);
				
		$companies = $this->service->getCompanies();
	
		$this->assertTrue(is_array($companies));
	}
	
	public function test_getCompanies_ProjectInstanceHasErrors_returnsCompanies() {
		$this->setProjectInstance($errors=true);
				
		$companies = $this->service->getCompanies();
	
		$this->assertNull($companies);
	}
	
	public function test_getProjectPersons_withAnyIdAndProjectInstanceNoErrors_returnsPeople() {
		$this->setPersonsInstance($errors=false);
		
		$anyId = 1;
		$people = $this->service->getProjectPersons($anyId);
	
		$this->assertTrue(is_array($people));

	}
	
	public function test_getProjectPersons_withAnyIdAndProjectInstanceHasErrors_returnsPeople() {
		$this->setPersonsInstance($errors=true);
		
		$anyId = 1;
		$people = $this->service->getProjectPersons($anyId);
	
		$this->assertNull($people);
	}
	
	public function test_getPeople_PersonsInstanceNoErrors_returnsPeople() {
		$this->setPersonsInstance($errors=false);
				
		$people = $this->service->getPeople();
	
		$this->assertTrue(is_array($people));
	}
	
	public function test_getPeople_PeopleInstanceHasErrors_returnsPeople() {
		$this->setPersonsInstance($errors=true);
				
		$people = $this->service->getPeople();
	
		$this->assertNull($people);
	}
}