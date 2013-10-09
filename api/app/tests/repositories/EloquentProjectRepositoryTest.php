<?php

require_once('RepositoryTestCase.php');

use Cci\Repositories\EloquentProjectRepository;
use Cci\Repositories\EloquentProjectUserRepository;
use Cci\Repositories\EloquentUserRepository;
use Cci\Services\Basecamp\BasecampService;

class EloquentProjectRepositoryTest extends RepositoryTestCase {
	

	protected $userRepo;
	protected $projectUserRepo;
	
	protected $mockedService;
	protected $mockedCompanyRepo;
	
	public function projectArray() {
		return array (
			array(
				'name' 		=> 'Foo',
				'company'	=> SirprizeBasecampMocks::mockCompany(),
				'id'		=> 888888,  //any basecamp id will do here
				'status'	=> 'foo',
				'start_page'=> 'foo',
				'__id'		=> SirprizeBasecampMocks::mockId(34)
			)
		);
	}
	
	public function personArray() {
		//return the test ids users
		return array (
						SirprizeBasecampMocks::mockId(8034),
						SirprizeBasecampMocks::mockId(8035),
						SirprizeBasecampMocks::mockId(8036),
						SirprizeBasecampMocks::mockId(8037),
						SirprizeBasecampMocks::mockId(8038)
		);
	}
	
	public function setUp() {
		parent::setUp();
		
		$this->setRepoName('Cci\Repositories\EloquentProjectRepository');
		
		$this->mockedService = $this->mock('Cci\Services\Basecamp\BasecampService');
		$this->mockedCompanyRepo = $this->mock('Cci\Repositories\Interfaces\CompanyRepositoryInterface');
		
		$this->projectUserRepo = new EloquentProjectUserRepository();
		$this->userRepo = new EloquentUserRepository($this->mockedService);
		
		
	}
	
	public function setup_service_withProjects() {
		$this->mockedService->shouldReceive('getProjects')->andReturn($this->projectArray());
		$this->mockedService->shouldReceive('getProjectPersons')->atLeast()->times(1)->andReturn($this->personArray());
		$this->mockedCompanyRepo->shouldReceive('sync')->atLeast()->times(1)->andReturn(1);
	}
	
	
	public function setup_service_withoutProjects() {
		$this->mockedService->shouldReceive('getProjects')->andReturnNull();
	}
	
	public function buildRepo() {
		//dd($this->mockedUsersRepo);
		$this->repo = new EloquentProjectRepository($this->mockedService, 
													$this->mockedCompanyRepo, 
													$this->userRepo,
													$this->projectUserRepo
		);
	}
	

	public function test_basecampUpdate_withNewProjects_projectAndPersonsCountsCorrect() {
		$this->setup_service_withProjects();
		
		$this->buildRepo();
		
		$expected = array(
			'projectCount' => $this->repo->count() + sizeof($this->projectArray()),
			'projectPersonsCount' => DB::table('project_user')->count() + sizeof($this->personArray())
		);
		
		$result = $this->repo->basecampUpdate();
		
		$actual = array (
			'projectCount' =>  (integer) $this->repo->count(),
			'projectPersonsCount' => (integer) DB::table('project_user')->count()
		);
		
		$this->assertEquals($expected,$actual);
	}
	
	public function test_basecampUpdate_withSameProject_projectDoesNotCountIncreasesNewProjectCount() {
		$this->setup_service_withProjects();
		
		$this->buildRepo();
		
		//seed the project by adding it first
		$result = $this->repo->basecampUpdate();
		
		$expectedCount = $this->repo->count();
		//then add the same one and expect no additional count
		
		$result = $this->repo->basecampUpdate();
		
		$this->assertEquals($expectedCount,$this->repo->count());
	}
	
	public function test_basecampUpdate_whenNullProjects_returnsFalse() {
		$this->setup_service_withoutProjects();
		
		$this->buildRepo();

		$result = $this->repo->basecampUpdate();
		
		$this->assertFalse($result);
	}
}