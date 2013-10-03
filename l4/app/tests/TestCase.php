<?php

class TestCase extends Illuminate\Foundation\Testing\TestCase {

	const HTTP_OK = 200;
	const HTTP_NO_AUTH = 401;

	protected $useDatabase = false;

	/**
	 * Creates the application.
	 *
	 * @return Symfony\Component\HttpKernel\HttpKernelInterface
	 */
	public function createApplication()
	{
		$unitTesting = true;

		$testEnvironment = 'testing';

		return require __DIR__.'/../../bootstrap/start.php';
	}
	
	public function setUp() {
		parent::setUp();
		
		if ( $this->useDatabase ) {
			$this->setUpDb();
		}
	}
	
	protected function mock($class)
	{
	  $mock = Mockery::mock($class);
	  $this->app->instance($class, $mock);
	  return $mock;
	}
	
	public function tearDown() {
		Mockery::close();
	}
	
	public function setUpDb() {
		Artisan::call('migrate');
		Artisan::call('db:seed');
	}
	
	public function tearDownDb() {
		Artisan::call('migrate:reset');
	}
	
	public function __call($method, $args) {
	    if (in_array($method, array('get', 'post', 'put', 'patch', 'delete')))
	    {
	        return $this->call($method, $args[0]);
	    }
	 
	    throw new BadMethodCallException;
	}
	
	/**
	 * Create a mock iterator over the given array.
	 *
	 * @param array $a
	 * @param string $class The class to use for the mock, should be/implement/extend Iterator
	 * @param boolean $complete Whether or not to build a complete iteration.  This is
	 *   used when an exception/break is expected in the middle of the iteration.
	 * @param integer $numElms The number of elements that should be iterated in the case of an
	 *   incomplete iteration.
	 */
	
	

}
