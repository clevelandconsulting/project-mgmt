<?php

class CompanyTest extends TestCase {

	protected $useDatabase = true;

	public function test_projects_whenCalled_returnsCollection() {
		$company = new Company();
		
		$this->assertInstanceOf('Illuminate\Database\Eloquent\Collection',$company->projects()->get());
	}
	
}