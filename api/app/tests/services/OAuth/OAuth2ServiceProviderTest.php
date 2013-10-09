<?php

class OAuth2ServiceProviderTest extends TestCase {
	
	public function test_passes() {
		$this->assertTrue(true);
	}
	
	public function test_OAuth2ServiceProvider_whenAppMakeCalled_makesOAuth2ServiceAvailable() {
		$service = App::make("OAuth2Service");
		
		$this->assertInstanceOf('Cci\Services\OAuth2Service', $service);
	}
	
	public function test_OAuth2ServiceProvider_whenAppMakeCalled_makesSameOAuth2Service() {
		$this->assertSame(App::make('OAuth2Service'),App::make('OAuth2Service'));
	}
	
	public function test_OAuth2ServiceProvider_whenAppMakeCalled_returnsConfiguredService() {
	
		//find the database configured prefix
		$db_to_use = 'mysql'; Config::get('database.default');
		$db_config_entry = 'database.connections.' . $db_to_use . '.';
		$prefix = Config::get($db_config_entry . 'prefix');
		
		//setup the expected client table
		$expectedClientTable = $prefix . 'oauth_clients';
		
		//get the oAuthServer Storage Config
		$storageConfig = App::make("OAuth2Service")->getServer()->getStorage('client_credentials')->getConfig();

		
		//assert the client table is the expected table
		$this->assertEquals($expectedClientTable, $storageConfig['client_table']);
		
		
	}
}