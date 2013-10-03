<?php

namespace Cci\Repositories\Interfaces;

interface ProjectRepositoryInterface extends ResourceRepositoryInterface {
	public function sync($projectArray);
	public function basecampUpdate();
}