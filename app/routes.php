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

Route::get('/', function()
{
	return View::make('hello');
});


Route::disableFilters(true);

Route::group(array('prefix'=>'api/v1'), function() {

	Route::post('login','api\v1\UsersController@login');
	Route::get('logout', 'api\v1\UsersController@logout');
	
	Route::group(array('before'=>'api.auth'), function() {

		Route::resource('users', 'api\v1\UsersController');	
		Route::resource('projects', 'api\v1\ProjectsController');
		Route::resource('companies', 'api\v1\CompaniesController');
		Route::resource('payments', 'api\v1\PaymentsController');
		Route::resource('times', 'api\v1\TimesController');
		
		Route::get('projects/basecamp/update', 'api\v1\ProjectsController@syncBasecamp');
	});
});









