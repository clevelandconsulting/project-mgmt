<?php

namespace Cci\Repositories\Interfaces;

interface UserRepositoryInterface extends ResourceRepositoryInterface {
	public function sync($basecampId, $username, $firstName, $lastName, $email);
	public function byBasecampId($basecamp_id);
	public function basecampUpdate();
}