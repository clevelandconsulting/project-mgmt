<?php namespace Cci\ServiceProviders;

use Illuminate\Support\ServiceProvider;
use sirprize\basecamp\Service;
use Config;

class BasecampServiceProvider extends ServiceProvider {

	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = false;

	/**
	 * Bootstrap the application events.
	 *
	 * @return void
	 */
	 /*
	public function boot()
	{
		$this->package('clevelandconsulting/basecamp');
	}
*/
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
		
		/*
		$this->app->bind('Basecamp', function() {
			
			
			return new BasecampService(new Service($config));
			
		});
		
		/*
		$this->app['basecamp'] = $this->app->share(function($app)
        {
    		
            return new BasecampService();
        });
        */
	}

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	 /*
	public function provides()
	{
		return array('Cci\Basecamp');
	}
	*/

}