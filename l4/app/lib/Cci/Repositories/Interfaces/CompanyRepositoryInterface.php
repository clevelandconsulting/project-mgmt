<?php

namespace Cci\Repositories\Interfaces;

interface CompanyRepositoryInterface extends ResourceRepositoryInterface {
	public function sync($basecamp_company);
}