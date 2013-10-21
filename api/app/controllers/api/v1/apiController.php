<?php


namespace api\v1;

use Response;
use BaseController;

class apiController extends BaseController {

	public function missingMethod($parameters)
	{
	    return Response::json(array('flash'=>'Not a valid url'), 404);
	}
	
	public function json($content,$status=200,$headers=array()) {
		$headers['Content-Type'] = 'application/json';
		return Response::json($content,$status,$headers);
	}
}