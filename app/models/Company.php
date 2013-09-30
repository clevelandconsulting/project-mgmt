<?php

use Cci\Models\CciEloquent;

class Company extends CciEloquent {
	protected $guarded = array();

	public static $rules = array();
	
	public function projects() {
		return $this->hasMany('Project');
	}
}
