<?php

require_once('RepositoryTestCase.php');

class EloquentPaymentRepositoryTest extends RepositoryTestCase {

	public function setUp() {
		parent::setUp();
		
		$this->setRepoName('Cci\Repositories\EloquentPaymentRepository');
	}
	
	
	
}