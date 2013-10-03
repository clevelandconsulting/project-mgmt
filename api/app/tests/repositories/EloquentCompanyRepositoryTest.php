<?php

require_once('RepositoryTestCase.php');

class EloquentCompanyRepositoryTest extends RepositoryTestCase {

	public function setUp() {
	
		//$this->setRepoClass('Cci\Repositories\EloquentCompanyRepository');
	
		parent::setUp();
		$this->setRepoName('Cci\Repositories\EloquentCompanyRepository');
		$this->buildRepo();
	}
	
	public function test_sync_withNewCompany_increasesCountAndReturnId() {
		$expected = array(
			 'count'=>$this->repo->count() + 1,
			 'is_integer'=>true
		);
		
		$result = $this->repo->sync(SirprizeBasecampMocks::mockCompany());
		
		$actual = array(
			'count'=>(integer) $this->repo->count(),
			'is_integer'=>is_integer($result)
		);
		
		$this->assertEquals($expected,$actual);
	}
	
	public function test_sync_withExistingCompany_increasesCountAndReturnId() {
		
		//initial setup to get the company in the db to simulate it's already being there
		$company = SirprizeBasecampMocks::mockCompany();
		$result = $this->repo->sync($company);
		
		$expected = array(
			 'count'=>$this->repo->count(),
			 'id'=>(integer)$result
		);
		
		$result = $this->repo->sync($company);
		
		$actual = array(
			'count'=>(integer) $this->repo->count(),
			'id'=>(integer)$result
		);
		
		$this->assertEquals($expected,$actual);
	}
	
}