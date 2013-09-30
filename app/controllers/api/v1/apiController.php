<?php


namespace api\v1;

use Response;
use BaseController;

class apiController extends BaseController {

	public function missingMethod($parameters)
	{
	    return Response::json(array('flash'=>'Not a valid url'), 404);
	}
}