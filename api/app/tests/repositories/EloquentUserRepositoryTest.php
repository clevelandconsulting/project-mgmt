<?php

require_once('RepositoryTestCase.php');

use Cci\Repositories\EloquentUserRepository;

class EloquentUserRepositoryTest extends RepositoryTestCase {

	public function setUp() {
		parent::setUp();
		
		$this->mockedService = $this->mockedService = $this->mock('Cci\Services\Basecamp\BasecampService');
		
		$this->setRepoName('Cci\Repositories\EloquentUserRepository');
		$this->buildRepo();
	}
	
	public function buildRepo() {
		$this->repo = new EloquentUserRepository($this->mockedService);
	}
	
	public function build_byBasecampId_comparison($correctInstance,$countIsOne) {
		return array (
			'correctInstance'=>$correctInstance,
			'countIsOne'=>$countIsOne
		);
	}
	
	public function test_byBasecampId_withValidId_returnsUser() {
	
		$expected = $this->build_byBasecampId_comparison($correctInstance=true,$countIsOne=true);
		
		$user = $this->repo->byBasecampId(8034)->get(); //8034 is in the seeded database
		
		$correctInstance=is_a($user,'Illuminate\Database\Eloquent\Collection');
		$countIsOne=(( (integer) $user->count() ) == 1 );
		
		$actual = $this->build_byBasecampId_comparison($correctInstance,$countIsOne);
		
		
		$this->assertEquals($expected,$actual);
	}
	
	public function test_byBasecampId_WithInvalidId_returnsUser() {
		
		$expected = $this->build_byBasecampId_comparison($correctInstance=true,$countIsOne=false);
		
		$user = $this->repo->byBasecampId(384954839)->get(); //invalid number
		
		$correctInstance=is_a($user,'Illuminate\Database\Eloquent\Collection');
		$correctCount=(( (integer) $user->count() ) == 1 );
		
		$actual = $this->build_byBasecampId_comparison($correctInstance,$correctCount);
		
		$this->assertEquals($expected,$actual);
	}
	
	public function test_sync_withnewIds_increasesCountAndId() {
		
		$expected = array (
			'count' => $this->repo->count() + 1,
			'id_returned' => true
		);
		
		$user_id = $this->repo->sync(384954839, 'foo', 'foo', 'foo', 'foo');
		
		$actual = array(
			'count' => (integer) $this->repo->count(),
			'id_returned' => is_integer($user_id)
		);
		
		$this->assertEquals($expected,$actual);
	}
	
	public function test_sync_withInvalidIds_sameCountAndNullResult() {
		$expected = array (
			'count' => $this->repo->count(),
			'null_result' => true
		);
		
		$user_id = $this->repo->sync('fr', 'foo', 'foo', 'foo', 'foo'); //id must be an integer
		
		$actual = array(
			'count' => (integer) $this->repo->count(),
			'null_result' => is_null($user_id)
		);
		
		$this->assertEquals($expected,$actual);
	}
	
	public function test_sync_withEmptyIds_sameCount() {
		$expected = array (
			'count' => $this->repo->count(),
			'null_result' => true
		);
		
		$user_id = $this->repo->sync('', 'foo', 'foo', 'foo', 'foo'); //id must be an integer
		
		$actual = array(
			'count' => (integer) $this->repo->count(),
			'null_result' => is_null($user_id)
		);
		
		$this->assertEquals($expected,$actual);
	}
	
	public function test_sync_withExistingIds_sameCount() {
		$expected = array (
			'count' => $this->repo->count(),
			'id_returned' => true
		);
		
		$user_id = $this->repo->sync(8034, 'foo', 'foo', 'foo', 'foo'); //id must be an integer
		
		$actual = array(
			'count' => (integer) $this->repo->count(),
			'id_returned' => is_integer($user_id)
		);
		
		$this->assertEquals($expected,$actual);
		
	}
	
	
	public function test_basecampUpdate_withService_returnsTrue() {
		$personArray = SirprizeBasecampMocks::mockPersons();
		$this->mockedService->shouldReceive('getPeople')->once()->andReturn($personArray);
	
	
		$expected = array(
			'personCount' => $this->repo->count() + sizeof($personArray),
			'result' => true
		);
		
		$result = $this->repo->basecampUpdate();
		
		$actual = array (
			'personCount' =>  (integer) $this->repo->count(),
			'result' => $result
		);
		
		$this->assertEquals($expected,$actual);
	}
}