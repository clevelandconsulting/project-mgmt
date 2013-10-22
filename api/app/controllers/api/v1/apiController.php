<?php


namespace api\v1;

use Response;
use Request;
use BaseController;

class apiController extends BaseController {

	public static $resourceName = 'vnd.clevelandconsulting';
	public static $resourceVersion = 'v1';

	protected $mediaType;
	
	public function __construct() {
		$this->mediaType = Request::header('accept');
	}

	public function missingMethod($parameters)
	{
		if ( $this->isValidMediaRequest('json')) {
			return $this->json(array('flash'=>'Not a valid url'), 404);
		}
		else {
			return $this->badMediaType();
		}
	}
	
	public function badMediaType() {
		return $this->json(array('flash'=>$this->mediaType . 'is not supported.'), 415);
	}
	
	public function isValidMediaRequest($supportedType) {
		return $this->checkMediaSupport($this->mediaType,$supportedType);
	}
	
	public static function contentType() {
		return 'application/' . self::$resourceName . "." . self::$resourceVersion;
	}
	
	protected function response($func,$args) {
		if ( $this->isValidMediaRequest('json') ) {
			$args = array_slice(func_get_args(), 1);

	        $content = call_user_func_array($func,$args);
	        return $this->json($content,$status);
		
		}
		else {
			return $this->badMediaType();
		}
	}
	
	protected function json($content,$status=200,$headers=array()) {
		$headers['Content-Type'] = self::contentType() . '+json';
		return Response::json($content,$status,$headers);
	}
	
	private function checkMediaSupport($mediaType, $supportedType) {
		if ( $mediaType !== '') return (strpos($mediaType,$supportedType) !== false);
		else return true;
	}
}