<?php

use Cci\Repositories\EloquentProjectRepository;

class EloquentProjectRepositoryTest extends TestCase {
	
	protected $repo;
	
	public function setUp() {
		parent::setUp();
		
		$this->mockedService = $this->mock('Cci\Services\BasecampService');
		
		$this->repo = new EloquentProjectRepository($this->mockedService);
	}

	public function test_basecampUpdate_whenSuccessful_returnsTrue() {
		$this->mockedService->shouldReceive('getProjects')->andReturn(true);
		
		$result = $this->repo->basecampUpdate();
		
		$this->assertTrue($result);
	}
	
	public function test_basecampUpdate_whenUnSuccessful_returnsFalse() {
		$this->mockedService->shouldReceive('getProjects')->andReturn(false);

		$result = $this->repo->basecampUpdate();
		
		$this->assertFalse($result);
	}
}