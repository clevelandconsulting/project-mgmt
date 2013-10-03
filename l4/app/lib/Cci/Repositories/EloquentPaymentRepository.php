<?php

namespace Cci\Repositories;

use Payment;

class EloquentPaymentRepository implements Interfaces\PaymentRepositoryInterface {

	public function all() {
		return Payment::all();
	}

	public function find($id) {
		return Payment::find($id);
	}
	
	public function count() {
		return (integer) Payment::count();
	}

}