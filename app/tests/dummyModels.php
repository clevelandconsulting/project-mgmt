<?php

class dummyModels {
	
	public static function dummyPayment($project_id,$amount) {
		$payment = new Payment();
		$payment->project_id = $project_id;
		$payment->user_id = 1;
		$payment->hrs = $amount;
		$payment->amount = 175*$amount;
		$payment->date = new DateTime();
		$payment->comment = 'foo';
		$payment->save();
		
		return $payment;
	}
	
	public static function dummyTime($project_id,$amount) {
		$time = new Time();
		$time->project_id = $project_id;
		$time->user_id = 1;
		$time->hrs = $amount;
		$time->date = new DateTime();
		$time->comment = 'foo';
		$time->save();
		
		return $time;
	}
	
	public static function dummyProject() {
		$project = new Project();
		$project->company_id = 1;
		$project->basecamp_id = 1;
		$project->basecamp_url='foo';
		$project->name = 'foo';
		$project->status='foo';
		$project->save();
		
		return $project;
	}
	
}