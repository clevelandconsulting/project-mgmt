<?php

namespace Cci\Repositories;

use Project;
use Cci\Services\Basecamp\BasecampService;
use Cci\Repositories\Interfaces\CompanyRepositoryInterface;
use Cci\Repositories\Interfaces\UserRepositoryInterface;
use Cci\Repositories\Interfaces\ProjectUserRepositoryInterface;

class EloquentProjectRepository implements Interfaces\ProjectRepositoryInterface {

	protected $basecampService;
	protected $companyRepository;
	protected $userRepository;
	protected $projectUserRepository;

	public function __construct(BasecampService $bs=null, 
								CompanyRepositoryInterface $companyRepository, 
								UserRepositoryInterface $userRepository,
								ProjectUserRepositoryInterface $projectUserRepository
								) {
		$this->basecampService = $bs;
		$this->companyRepository = $companyRepository;
		$this->userRepository = $userRepository;
		$this->projectUserRepository = $projectUserRepository;
	}
	
	//Interface Methods

	public function all() {
		return Project::all();
	}

	public function find($id) {
		return Project::find($id);
	}
	
	public function count() {
		return (integer) Project::count();
	}
	
	//Specific methods
	
	public function sync($projectArray) {
		$basecamp_id = $projectArray['id'];
		
		$existingProjects = Project::where('basecamp_id','=',$basecamp_id)->get();
			
		if($existingProjects->count()>0) {
			$p = $existingProjects->first();
		}
		else {
			$p = new Project();
			$p->basecamp_id = $basecamp_id;
		}
		
		$p->company_id = $projectArray['company_id'];
		$p->name = $projectArray['name'];
		$p->status = $projectArray['status'];
		$p->basecamp_url = $projectArray['start_page'];
		
		$p->save();
		
		return $p->id;
	}
	
	//public function 
	
	public function basecampUpdate() {
		$projects = $this->basecampService->getProjects();
		
		if ( $projects == null ) {
			return false;	
		}
		else {
			foreach($projects as $project) {
				$basecamp_company_id = $project['company']->id[0];
				//synchronize this company
				$company_id = $this->companyRepository->sync($project['company']);
				$project['company_id'] = $company_id;
				
				//synchronize this project
				$project_id = $this->sync($project);
				
				//synchronize the people on this project
				$project_person_basecamp_ids = $this->basecampService->getProjectPersons($project['__id']);
				
				foreach($project_person_basecamp_ids as $bc_person_id) {
					$id = $bc_person_id->get();
					$users = $this->userRepository->byBasecampId($id)->get();
					
					if ( $users->count()>0 ) {			
						$user_id = $users->first()->id;
						$projectpersons = $this->projectUserRepository->sync($user_id,$project_id);
					}
				}
				 
			}
			return true;
		}
		
		
	}

}