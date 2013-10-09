<?php

namespace Cci\Services;

use Auth;
use Input;

class cciLoginService implements LoginServiceInterface {
	
	public function __construct($input = null) {
		$this->input = $input ?: Input::all();
	}

	public function login() {
		
		if ( isset($this->input['username']) && isset($this->input['password'])) {
		
			$cred = array('username'=>$this->input['username'], 'password'=>$this->input['password']);
			
			return Auth::attempt($cred, true);
		} 
		return false;
	}
	
	public function logout() {
		Auth::logout();
	
		return true;
	}
}