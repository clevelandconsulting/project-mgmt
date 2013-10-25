<?php

class ControllerTestCase extends TestCase {

	protected $apiName = 'api/v1';
	
	protected $route;
	
	public function apiCall($method, $uri, $useRoute=true, $parameters=array(), $files=array(), $server=array("HTTP_Accept"=>"application/json"), $content=null) {
		$fullUrl = $this->apiName . ( $useRoute ? $this->route : "" )  . $uri;
		return parent::call($method, $fullUrl, $parameters, $files, $server, $content);
	}
	
}