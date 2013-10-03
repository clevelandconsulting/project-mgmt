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
	
	public function count() {
		return (integer) Company::count();
	}
	
	public function sync($basecamp_company) {
		$company_basecamp_id = (integer)$basecamp_company->id[0];
			
		$companies = Company::where('basecamp_id','=',$company_basecamp_id);
		
		if($companies->count()>0) {
			$company = $companies->first();
		}
		else {
			$company = new Company();
			$company->basecamp_id = $company_basecamp_id;
		}
		
		$company->name = (string) $basecamp_company->name[0];
		
		$company->save();
		
		return (integer) $company->id;
	}

}