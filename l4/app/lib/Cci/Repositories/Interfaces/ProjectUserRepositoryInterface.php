<?php

namespace Cci\Repositories\Interfaces;

interface ProjectUserRepositoryInterface extends ResourceRepositoryInterface {
	public function sync($userId,$projectId);
}