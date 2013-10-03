<?php

require_once('RepositoryTestCase.php');

class EloquentProjectUserRepositoryTest extends RepositoryTestCase {

	public function setUp() {
		parent::setUp();
		
		$this->setRepoName('Cci\Repositories\EloquentProjectUserRepository');
		$this->buildRepo();
	}
	
	public function test_sync_withnewIds_increasesCountAndReturnTrue() {
		$expected = array(
			 'count'=>$this->repo->count() + 1,
			 'result'=>true
		);
		
		$result = $this->repo->sync(789,91437);
		
		$actual = array(
			'count'=>(integer) $this->repo->count(),
			'result'=>$result
		);
		
		$this->assertEquals($expected,$actual);
	}
	
	public function test_sync_withExistingIds_sameCountAndReturnTrue() {
		//set the initial sync
		$this->repo->sync(789,91437);
		
		$expected = array(
			 'count'=>(integer)$this->repo->count(),
			 'result'=>true
		);
		
		
		//sync same numbers, count should not change
		$result = $this->repo->sync(789,91437);
		
		$actual = array(
			'count'=>(integer) $this->repo->count(),
			'result'=>$result
		);
		
		$this->assertEquals($expected,$actual);
		
	}
	
	public function test_sync_withMissingUserIds_sameCountAndReturnFalse() {		
		$expected = array(
			 'count'=>(integer)$this->repo->count(),
			 'result'=>false
		);
		
		//sync same numbers, count should not change
		$result = $this->repo->sync('',91437);
		
		$actual = array(
			'count'=>(integer) $this->repo->count(),
			'result'=>$result
		);
		
		$this->assertEquals($expected,$actual);
		
	}
	
	public function test_sync_withMissingProjectIds_sameCountAndReturnFalse() {		
		$expected = array(
			 'count'=>(integer)$this->repo->count(),
			 'result'=>false
		);
		
		//sync same numbers, count should not change
		$result = $this->repo->sync(789, '');
		
		$actual = array(
			'count'=>(integer) $this->repo->count(),
			'result'=>$result
		);
		
		$this->assertEquals($expected,$actual);
		
	}
	
	public function test_sync_withNullIds_sameCountAndReturnFalse() {		
		$expected = array(
			 'count'=>(integer)$this->repo->count(),
			 'result'=>false
		);
		
		//sync same numbers, count should not change
		$result = $this->repo->sync(null, null);
		
		$actual = array(
			'count'=>(integer) $this->repo->count(),
			'result'=>$result
		);
		
		$this->assertEquals($expected,$actual);
		
	}
	
}