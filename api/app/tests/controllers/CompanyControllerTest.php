<?php

require_once('ResourceControllerTestCase.php');


function apache_request_headers() {
  $arh = array();
  $rx_http = '/\AHTTP_/';
  foreach($_SERVER as $key => $val) {
    if( preg_match($rx_http, $key) ) {
      $arh_key = preg_replace($rx_http, '', $key);
      $rx_matches = array();
      // do some nasty string manipulations to restore the original letter case
      // this should work in most cases
      $rx_matches = explode('_', $arh_key);
      if( count($rx_matches) > 0 and strlen($arh_key) > 2 ) {
        foreach($rx_matches as $ak_key => $ak_val) $rx_matches[$ak_key] = ucfirst($ak_val);
        $arh_key = implode('-', $rx_matches);
      }
      $arh[$arh_key] = $val;
    }
  }
  return( $arh );
}

class CompanyControllerTest extends ResourceControllerTestCase {

	public function setUp() {
		parent::setUp();
		$this->route = '/companies';
		$this->mockedRepository = $this->mock('Cci\Repositories\Interfaces\CompanyRepositoryInterface');
		$this->status = array_merge( $this->status,
									 array(
											'create'=>404,
											'destroy'=>404,
											'store'=>404,
										));
	}
	
	public function test_fails() {
		if($this->status['index']==200) $this->mockedRepository->shouldReceive('all')->once();

		$response = $this->call('GET', '/api/v1/companies', array(), array(), array("HTTP_ACCEPT"=>"application/json"));

		foreach($response->headers as $key => $value) {
			if ( strtolower($key) === "content-type") {
				$content_type = $value[0];
			}
		}
		
		$this->assertEquals('application/json',$content_type);

	}
	
	
}