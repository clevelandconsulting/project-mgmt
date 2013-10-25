<?php

namespace api\v1;

use Cci\Services\LoginServiceInterface;
use Cci\Repositories\Interfaces\UserRepositoryInterface as User;

use Auth;
use Response;

class UsersController extends apiController {

	public function __construct(LoginServiceInterface $ls, User $user) {
		parent::__construct();
		$this->loginService = $ls;
		$this->user = $user;
	}


	public function login() {
	
		if($this->loginService->login()) {
			$this->user = Auth::user()->toArray();
			return Response::json(array('flash'=>'You made it!', 'user'=>$this->user),200);
		}
		else return Response::json(array('flash'=>'Your username/password combination was incorrect!'), 401);
	}
	
	public function logout() {
		if ( $this->loginService->logout() ) {
			return Response::json(array('flash'=>'You have been succesfully logged out!'),200);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
	
		return $this->response(function($object, $id) {
			return $object->find($id);
		}, $this->user, $id);
		//return $this->user->find($id);
		//$user = $this->user->find($id)->toArray();
		//dd($user);
        //return Response::json(array('user'=>$user));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$user = $this->user->find($id);
		
		if ( $user->save() ) {
			$flash = "User was successfully saved.";
			$status = 200;
		}
		else {
			$flash = "Could not save user.";
			$status = 500;
		}
		
		return Response::json(array('flash'=>$flash),$status);
	}
	
	public function syncBasecamp() {
		$result = $this->user->basecampUpdate();
		if ( $result ) {
			return Response::json('',200);
		} else {
			return Response::json('',500);
		}
	}

}
