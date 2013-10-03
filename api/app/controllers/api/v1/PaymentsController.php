<?php

namespace api\v1;


use Cci\Repositories\Interfaces\PaymentRepositoryInterface;
use Response;

class PaymentsController extends apiController {

	protected $payment;

	public function __construct(PaymentRepositoryInterface $payment) {
		$this->payment = $payment;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        return $this->payment->all();
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
       
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
       return $this->payment->find($id);
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
