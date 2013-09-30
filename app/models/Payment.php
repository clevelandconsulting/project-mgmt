<?php

use Cci\Models\CciEloquent;

class Payment extends CciEloquent {
	protected $guarded = array();

	public static $rules = array();
	
	public function project() {
		return $this->belongsTo('Project');
	}
	
	public function user() {
		return $this->belongsTo('User');
	}
}
