<?php

namespace Cci\Repositories;

use Project_user;

class EloquentProjectUserRepository implements Interfaces\ProjectUserRepositoryInterface {

	public function find($id) {
		return Project_user::find($id);
	}
	
	public function all() {
		return Project_user::all();
	}
	
	public function count() {
		return (integer) Project_user::count();
	}
	
	public function sync($userId,$projectId) {
		if ( $userId != null && $userId != '' && $projectId != '' && $projectId != null ) {
			$project_users = Project_user::where('user_id','=',$userId)->where('project_id','=',$projectId)->get();
			if ( sizeof($project_users) == 0 )  {
				
				$projectperson = new Project_user();
				$projectperson->user_id = $userId;
				$projectperson->project_id = $projectId;
				
				return $projectperson->save();
				
			} else {
				return true;
			}
		}
		return false;
	}

}