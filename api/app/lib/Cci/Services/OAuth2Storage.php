<?php

namespace Cci\Services;

use OAuth2\Storage\Pdo;

class OAuth2Storage extends \OAuth2\Storage\Pdo {
	
	public function getConfig() {
		return $this->config;
	}
}