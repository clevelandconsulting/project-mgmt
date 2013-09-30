<?php

use Cci\Models\CciEloquent;

class Project extends CciEloquent {
	protected $guarded = array();

	public static $rules = array();

	public function company() {
		return $this->belongsTo('Company');
	}
	
	public function users() {
		return $this->belongsToMany('User');
	}
	
	public function payments() {
		return $this->hasMany('Payment');
	}
	
	public function times() {
		return $this->hasMany('Time');
	}
}
