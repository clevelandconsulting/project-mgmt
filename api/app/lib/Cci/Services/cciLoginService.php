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
			if ( Auth::attempt($this->input) ) return true;
			
		} 
		return false;
	}
	
	public function logout() {
		Auth::logout();
	
		return true;
	}
}