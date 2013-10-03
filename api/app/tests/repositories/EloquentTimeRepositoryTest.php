<?php

require_once('RepositoryTestCase.php');

class EloquentTimeRepositoryTest extends RepositoryTestCase {

	public function setUp() {
		parent::setUp();
		
		$this->setRepoName('Cci\Repositories\EloquentTimeRepository');
	}
	
	
	
}