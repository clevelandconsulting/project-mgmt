<?php

class crsfTest extends TestCase {
	
	public function test_routeCsrf_whenCalledWithGet_returnsSessionToken() {
		$result = $this->call('GET','api/v1/csrf');
		
		$this->assertEquals(Session::token(),json_decode($result->getContent()));
	}
}