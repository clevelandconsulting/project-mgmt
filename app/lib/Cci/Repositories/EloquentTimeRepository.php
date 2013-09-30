<?php

namespace Cci\Repositories;

use Time;

class EloquentTimeRepository implements Interfaces\TimeRepositoryInterface {

	public function all() {
		return Time::all();
	}

	public function find($id) {
		return Time::find($id);
	}

}