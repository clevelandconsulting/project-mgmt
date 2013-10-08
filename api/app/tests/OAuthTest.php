<?php

//use OAuth2\Server as OAuth2Server;

/*
OAuth table structure
array(
            'client_table' => 'oauth_clients',
            'access_token_table' => 'oauth_access_tokens',
            'refresh_token_table' => 'oauth_refresh_tokens',
            'code_table' => 'oauth_authorization_codes',
            'user_table' => 'oauth_users',
            'jwt_table'  => 'oauth_jwt',
            'scope_table'  => 'oauth_scopes',
            'public_key_table'  => 'oauth_public_keys',
        )
        
*/

class OAuthTest extends TestCase {
	
	protected $server;
	
	public function test_passes() {
		$this->assertTrue(true);
	}
	
	public function setup_OAuth2Server() {
		$dsn = "mysql:dbname:project_mgmt,host=localhost";
        $username = 'root';
        $password = '';
        
        $storage = new OAuth2\Storage\Pdo(array('dsn' => $dsn, 'username' => $username, 'password' => $password));
		//$storage = '';
	
		$grantTypes = array(
            'authorization_code' => new OAuth2\GrantType\AuthorizationCode($storage),
            'user_credentials'   => new OAuth2\GrantType\UserCredentials($storage),
        );
        
        $this->server = new OAuth2\Server($storage, array('enforce_state' => true, 'allow_implicit' => true), $grantTypes);
	}
	
	public function test_OAuth2Server_whenCalled_returnsCorrectObject() {
	
		$this->setup_OAuth2Server();
			
		$this->assertInstanceOf('OAuth2\Server',$this->server);
	}
	
	public function test_handleTokenRequest_whenCreatedFromGlobals_returnsValid() {
	
		$this->setup_OAuth2Server();
		
		$result = $this->server->handleTokenRequest(OAuth2\Request::createFromGlobals())->send();
		
		dd($result);
		
		$this->assertInstanceOf("OAuth2\Response",$result->send());
	}
}