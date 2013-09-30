<?php

namespace Cci\Repositories;

use Project;
use Cci\Services\BasecampService;

class EloquentProjectRepository implements Interfaces\ProjectRepositoryInterface {

	protected $basecampService;

	public function __construct(BasecampService $bs) {
		$this->basecampService = $bs;
	}
	
	public function getBS() {
		return $this->basecampService;
	}

	public function all() {
		return Project::all();
	}

	public function find($id) {
		return Project::find($id);
	}
	
	public function basecampUpdate() {
		return $this->basecampService->getProjects();
	}

}