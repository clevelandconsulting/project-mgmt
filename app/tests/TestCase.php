<?php

class TestCase extends Illuminate\Foundation\Testing\TestCase {

	const HTTP_OK = 200;
	const HTTP_NO_AUTH = 401;

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
	
	protected function mock($class)
	{
	  $mock = Mockery::mock($class);
	  $this->app->instance($class, $mock);
	  return $mock;
	}
	
	public function tearDown() {
		Mockery::close();
	}
	
	public function __call($method, $args) {
	    if (in_array($method, array('get', 'post', 'put', 'patch', 'delete')))
	    {
	        return $this->call($method, $args[0]);
	    }
	 
	    throw new BadMethodCallException;
	}

}
