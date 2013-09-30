<?php

namespace Cci\Repositories;

use Company;

class EloquentCompanyRepository implements Interfaces\CompanyRepositoryInterface {

	public function all() {
		return Company::all();
	}

	public function find($id) {
		return Company::find($id);
	}

}