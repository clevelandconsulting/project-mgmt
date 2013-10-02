<?php

namespace api\v1;

use Cci\Repositories\Interfaces\ProjectRepositoryInterface;
use Response;

class ProjectsController extends apiController {

	protected $project;

	public function __construct(ProjectRepositoryInterface $project) {
		$this->project = $project;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        return $this->project->all();
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        return $this->project->find($id);
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$project = $this->project->find($id);
		
		if ( $project->save() ) {
			$flash = "Project was successfully saved.";
			$status = 200;
		}
		else {
			$flash = "Could not save project.";
			$status = 500;
		}
		
		return Response::json(array('flash'=>$flash),$status);
	}
	
	public function syncBasecamp() {
		$result = $this->project->basecampUpdate();
		if ( $result ) {
			return Response::json('',200);
		} else {
			return Response::json('',500);
		}
		//$result = $this->project->updateBasecamp();
		
		
	}

}
