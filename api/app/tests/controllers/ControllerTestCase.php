<?php

class ControllerTestCase extends TestCase {

	protected $apiName = 'api/v1';
	
	protected $route;
	
	public function apiCall($method, $uri, $useRoute=true) {
		$fullUrl = $this->apiName . ( $useRoute ? $this->route : "" )  . $uri;
		return parent::call($method, $fullUrl);
	}
	
}