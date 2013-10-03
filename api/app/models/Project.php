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
	
	public function hoursToBeWorked() {
		if ( $this->times()->count() == 0 && $this->payments()->count() == 0 ) return 0;
		else {
			$hoursWorked = 0;
			$hoursPaid = 0;
			
			foreach($this->times()->get() as $time) {
				$hoursWorked += $time->hrs;
			}
			
			foreach($this->payments()->get() as $payment ) {
				$hoursPaid += $payment->hrs;	
			}
			
			return $hoursPaid - $hoursWorked;
			//return 3-2;
		}
	}
}
