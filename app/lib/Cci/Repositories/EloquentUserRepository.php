<?php

namespace Cci\Repositories;

use User;

class EloquentUserRepository implements Interfaces\UserRepositoryInterface {

	public function find($id) {
		return User::find($id);
	}

}