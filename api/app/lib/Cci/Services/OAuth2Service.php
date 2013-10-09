<?php

namespace Cci\Services;

use OAuth2\Server as OAuth2Server;
use OAuth2\HttpFoundationBridge\Response as BridgeResponse;
use OAuth2\Request;

class OAuth2Service {
	
	protected $server;
	protected $defaultResponse;
	
	public function __construct($storage, $grantTypes) {
		$this->server = new OAuth2Server($storage, array(), $grantTypes);
		$this->defaultResponse = new BridgeResponse();
	}
	
	public function getServer() {
		return $this->server;
	}
	
	public function getDefaultResponse() {
		return $this->defaultResponse;
	}
	
	public function getTokenRequest() {
		return $this->server->handleTokenRequest(\OAuth2\Request::createFromGlobals(), $this->getDefaultResponse());
	}
}