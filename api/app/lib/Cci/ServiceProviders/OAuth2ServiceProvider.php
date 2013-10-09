<?php

namespace Cci\ServiceProviders;

use Illuminate\Support\ServiceProvider as ServiceProvider;
use Cci\Services\OAuth2Service as OAuth2Service;
use Cci\Services\OAuth2Storage as OAuth2Storage;
use Config;

class OAuth2ServiceProvider extends ServiceProvider {
	
	public function register()
	{
		
		//$this->app->bind('OAuth2Service', function() {
		
		$this->app['OAuth2Service'] = $this->app->share(function() {
		
			$db_to_use = 'mysql'; Config::get('database.default');
	
			$db_config_entry = 'database.connections.' . $db_to_use . '.';
			$prefix = Config::get($db_config_entry . 'prefix');
			$dbDriver =  Config::get($db_config_entry . 'driver');
			$dbName = Config::get($db_config_entry . 'database');
			$dbHost = Config::get($db_config_entry . 'host');
			$username = Config::get($db_config_entry . 'username')?:'';
			$password = Config::get($db_config_entry . 'password')?:'';
			
			$tableConfig = array(
	            'client_table' => $prefix . 'oauth_clients',
	            'access_token_table' => $prefix . 'oauth_access_tokens',
	            'refresh_token_table' => $prefix . 'oauth_refresh_tokens',
	            'code_table' => $prefix . 'oauth_authorization_codes',
	            'user_table' => $prefix . 'oauth_users',
	            'jwt_table'  => $prefix . 'oauth_jwt',
	            'scope_table'  => $prefix . 'oauth_scopes',
	            'public_key_table'  => $prefix . 'oauth_public_keys',
			);
			
			$dsn = $dbDriver.":dbname=".$dbName.($dbHost!=null?";host=".$dbHost:"");
			
			$storage = new OAuth2Storage(array('dsn'=>$dsn,'username'=>$username,'password'=>$password), $tableConfig);
			
			$grantTypes = array(
	            'authorization_code' => new \OAuth2\GrantType\AuthorizationCode($storage),
	            'user_credentials'   => new \OAuth2\GrantType\UserCredentials($storage),
	            'client_credentials' => new \OAuth2\GrantType\ClientCredentials($storage)
	          );
			
			return new OAuth2Service($storage, $grantTypes);
			
		});

	}
}