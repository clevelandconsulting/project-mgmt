<?php

namespace api\v1;

use Cci\Repositories\Interfaces\CompanyRepositoryInterface;
use Response;
use Request;

class CompaniesController extends apiController {

	protected $company;

	public function __construct(CompanyRepositoryInterface $company) {
		parent::__construct();
		$this->company = $company;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return $this->response(function($object) {
			return $object->all();
		}, $this->company);
		/*
	   if ( $this->isValidMediaRequest('json') ) {
		   $content = $this->company->all();
		   return $this->json($content);
	   }
	   else {
		   return $this->badMediaType();
	   }*/
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return $this->response(function($object, $id) {
			return $object->find($id);
		}, $this->company, $id);
		/*
		if ( $this->isValidMediaRequest('json') ) {
	        return $this->json($this->company->find($id));
		}
		else {
			return $this->badMediaType();
		}
		*/
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
	
	  /**************************************************************
	  *
	  *  Return a valid response using a call back to get the content
	  *
	  **************************************************************/

}
