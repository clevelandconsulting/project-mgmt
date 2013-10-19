<?php namespace Cci\ServiceProviders;

use Illuminate\Support\ServiceProvider;
use sirprize\basecamp\Service;
use Cci\Services\Basecamp\CciSirprizeService as CciSirprizeService;
use Config;

class BasecampServiceProvider extends ServiceProvider {

	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = false;

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
		
		$this->app->bind('Cci\Services\Basecamp\SirprizeServiceInterface', function() {
			$baseUri = Config::get('packages/cci/basecamp.basecamp_url');
			$un = Config::get('packages/cci/basecamp.username');
			$pw = Config::get('packages/cci/basecamp.password');
			
        	$config = array(
				'baseUri' => $baseUri,
				'username' => $un,
				'password' => $pw
			);
			
			return new CciSirprizeService($config);
		});

	}

}