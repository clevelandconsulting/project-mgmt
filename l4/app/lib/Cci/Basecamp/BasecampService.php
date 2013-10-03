<?php

namespace Cci\Basecamp;

use Sirprize\Basecamp\Id;

class BasecampService {
	
	protected $sirprize;
	
	public function __construct(SirprizeServiceInterface $sirprize) {
		$this->sirprize = $sirprize;
	}
	
	public function getUrl() {
		return $this->sirprize->getBaseUri();
	}
	
	public function getProjects() {
		$projectInstance = $this->sirprize->getProjectsInstance();

		$bc_projects = $projectInstance->startAll();
		
		if ($projectInstance->getResponse()->isError() ) {
			return null;
		}
	
		$projects = array();
	
		foreach($bc_projects as $bc_project)
		{
			//dd($bc_project->getId());
			$id = $bc_project->getId()->get();
			$name = $bc_project->getName();
			
			$project = array(
				'name' 		=> $name,
				'company'	=> $bc_project->getCompany(),
				'id'		=> (integer) $id,
				'status'	=> $bc_project->getStatus(),
				'start_page'=> $id . "-" . str_replace(array(" ","/"), "-", strtolower($name)) . "/" . $bc_project->getStartPage(),
				'__id'		=> $bc_project->getId()
			);
			
			array_push($projects,$project);
		}
		
		return $projects;
	}
	
	public function getCompanies() {
		$projectInstance = $this->sirprize->getProjectsInstance();
		$projects = $projectInstance->startAll();
	
		if ($projectInstance->getResponse()->isError() ) {
			return null;
		}
	
		$companies = array();
		$ids = array();
	
		foreach($projects as $project)
		{
			$bc_company = $project->getCompany();
			//dd((string) $bc_company->id[0]);
			//dd($bc_project->getId());
			$id = (integer) $bc_company->id[0];
			
			if ( !in_array($id,$ids) ) {
				array_push($ids,$id);
				
				$name = (string) $bc_company->name[0];
				$company = array(
					'id'		=> $id,
					'name' 		=> $name
				);
				
				array_push($companies,$company);
			}
		}
		
		return $companies;
	}
	
	public function getProjectPersons($projectId) {
		$projectInstance = $this->sirprize->getPersonsInstance();
		$people = $projectInstance->startAllByProjectId(new Id($projectId));
	
		if ($projectInstance->getResponse()->isError() ) {
			return null;
		}
		
		$ids = array();
		
		foreach($people as $person) {
			array_push($ids, $person->getId());
		}
		
		return $ids;
	}
	
	public function getPeople() {
		$projectInstance = $this->sirprize->getPersonsInstance();
		$people = $projectInstance->startAll();
	
		if ($projectInstance->getResponse()->isError() ) {
			return null;
		}
		
		$persons = array();
		
		foreach($people as $person) {
			array_push($persons, $person);
		}
		
		return $persons;
	}
}