<?php

namespace Cci\Repositories\Interfaces;

interface ResourceRepositoryInterface {
	public function find($id);
	public function all();
	public function count();
}