<?php

use Cci\Models\CciEloquent;

class Project_user extends CciEloquent {
	protected $guarded = array();
	protected $table = 'project_user';
	
	public static $rules = array();
}
