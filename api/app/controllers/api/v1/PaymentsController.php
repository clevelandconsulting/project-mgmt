<?php

namespace api\v1;


use Cci\Repositories\Interfaces\PaymentRepositoryInterface;
use Response;

class PaymentsController extends apiController {

	protected $payment;

	public function __construct(PaymentRepositoryInterface $payment) {
		parent::__construct();
		$this->payment = $payment;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return $this->response(function($object) {
			return $object->all();
		}, $this->payment);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
       return $this->json('',201);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
	
		return $this->response(function($object, $id) {
			return $object->find($id);
		}, $this->payment, $id);
       //return $this->payment->find($id);
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$payment = $this->payment->find($id);
		
		if ( $payment->save() ) {
			$flash = "Payment was successfully saved.";
			$status = 200;
		}
		else {
			$flash = "Could not save payment.";
			$status = 500;
		}
		
		return Response::json(array('flash'=>$flash),$status);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
