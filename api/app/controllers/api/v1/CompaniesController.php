<?php

namespace api\v1;

use Cci\Repositories\Interfaces\CompanyRepositoryInterface;
use Response;

class CompaniesController extends apiController {

	protected $company;

	public function __construct(CompanyRepositoryInterface $company) {
		$this->company = $company;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
	   $content = $this->company->all();
	   //$status = 200;
	   //$headers = array('Content-Type'=>'application/json');
	   return $this->json($content);//,$status,$headers);
        //return ;
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        return $this->company->find($id);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$company = $this->company->find($id);
		
		if ( $company->save() ) {
			$flash = "Company was successfully saved.";
			$status = 200;
		}
		else {
			$flash = "Could not save company.";
			$status = 500;
		}
		
		return Response::json(array('flash'=>$flash),$status);
	}

}
