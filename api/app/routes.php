<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/api', function()
{
	return View::make('hello');
});

Route::post('/api/oauthToken', function() {
	
	$dsn = "mysql:dbname=project_mgmt;host=localhost";
    $username = 'root';
    $password = '';
    
    $storage = new OAuth2\Storage\Pdo(array('dsn' => $dsn, 'username' => $username, 'password' => $password));
	//$storage = '';

	$grantTypes = array(
        'authorization_code' => new OAuth2\GrantType\AuthorizationCode($storage),
        'user_credentials'   => new OAuth2\GrantType\UserCredentials($storage),
        'client_credentials' => new OAuth2\GrantType\ClientCredentials($storage)
    );
    
    $server = new OAuth2\Server($storage, array('enforce_state' => true, 'allow_implicit' => true), $grantTypes);
    
    $server->handleTokenRequest(OAuth2\Request::createFromGlobals())->send();
	
});


//Route::disableFilters(true);

Route::group(array('prefix'=>'api/v1'), function() {

	
	Route::get('csrf', function() {
		return Response::json(array('csrf_token'=>csrf_token()),200);
	});
	
	Route::get('logout', 'api\v1\UsersController@logout');

	Route::group(array('before'=>'csrf'), function() {
		Route::post('login','api\v1\UsersController@login');	
	});
	
	Route::group(array('before'=>'api.auth'), function() {

		Route::resource('users', 'api\v1\UsersController');	
		Route::resource('projects', 'api\v1\ProjectsController');
		Route::resource('companies', 'api\v1\CompaniesController');
		Route::resource('payments', 'api\v1\PaymentsController');
		Route::resource('times', 'api\v1\TimesController');
		
		Route::get('projects/basecamp/update', 'api\v1\ProjectsController@syncBasecamp');
		Route::get('users/basecamp/update', 'api\v1\UsersController@syncBasecamp');
	});
});









