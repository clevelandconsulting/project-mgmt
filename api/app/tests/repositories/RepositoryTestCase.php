<?php

class RepositoryTestCase extends TestCase {

	protected $repo = null;
	protected $repoName = null;
	protected $useDatabase = true;
	
	public function setRepoName($name) {
		$this->repoName = $name;
	}
	
	public function buildRepo() {
		if ( $this->repo == null ) {
			$className = $this->repoName;
			if(class_exists($className)) $this->repo = new $className();
			else throw new Exception("Class \"" . $className . "\" does not exist");
		}
	}
	
	public function test_all_noParameters_returnsCollection() {
		$this->buildRepo();
		
		$result = $this->repo->all();
		
		$this->assertInstanceOf('Illuminate\Database\Eloquent\Collection',$result);
	}
	
	public function test_count_noParameters_returnsInteger() {
		$this->buildRepo();
		
		$result = $this->repo->count();
		
		$this->assertTrue(is_integer($result));
	}
	
	public function test_find_withCorrectId_returnsModel() {
		$this->buildRepo();
		
		$collection = $this->repo->all();
		$firstRecord = $collection->first();
		
		
		if ( $firstRecord == null ) {
			//THERE IS NOTHING IN THE DATABASE SO NULL SHOULD result
			$expectedResult = null;
			$id = 1; //any id will result in null
		}
		else {
			$expectedResult = $firstRecord;
			$id = $expectedResult->id;
		}
		
		$actualResult = $this->repo->find($id);
		
		$this->assertEquals($expectedResult,$actualResult);
	}
	
}