<?php

namespace api\v1;

use Cci\Repositories\Interfaces\TimeRepositoryInterface;
use Response;

class TimesController extends apiController {

	protected $time;
	
	public function __construct(TimeRepositoryInterface $time) {
		$this->time = $time;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        return $this->time->all();
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
        
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        return $this->time->find($id);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$time = $this->time->find($id);
		
		if ( $time->save() ) {
			$flash = "Time was successfully saved.";
			$status = 200;
		}
		else {
			$flash = "Could not save time.";
			$status = 500;
		}
		
		return Response::json(array('flash'=>$flash),$status);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
