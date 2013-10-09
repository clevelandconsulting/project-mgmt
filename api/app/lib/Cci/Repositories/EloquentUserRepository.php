<?php

namespace Cci\Repositories;

use User;
use Hash;
use Cci\Services\Basecamp\BasecampService;

class EloquentUserRepository implements Interfaces\UserRepositoryInterface {

	public static $tempPass = 'pass';
	
	public $basecampService;
	
	public function __construct(BasecampService $basecampService) {
		$this->basecampService = $basecampService;
	}

	public function find($id) {
		return User::find($id);
	}
	
	public function all() {
		return User::all();
	}
	
	public function count() {
		return (integer) User::count();
	}
	
	public function byBasecampId($basecamp_id) {
		return User::where('basecamp_id','=',$basecamp_id);
	}
	
	public function basecampUpdate() {
		$people = $this->basecampService->getPeople();
		
		foreach($people as $person) {
			$this->sync((integer)$person->getId()->get(), $person->getUsername(), $person->getFirstname(), $person->getLastname(), $person->getEmailAddress());
		}
		
		return true;
	}
	
	public function sync($basecampId, $username, $firstName, $lastName, $email) {
		
		if ( is_integer($basecampId) ) {

			$users = User::where('basecamp_id','=',$basecampId)->get();
					
			if($users->count()>0) {
				$user = $users->first();
			}
			else {
				$user = new User();
				$user->basecamp_id = $basecampId;
				$user->password = Hash::make(self::$tempPass);
			}	
				
			$user->username = $username;
			$user->first_name = $firstName;
			$user->last_name = $lastName;
			$user->email = $email;
			
			$user->save();
			
			return (integer) $user->id;
		}
		else {
			return null;
		}

	}

}