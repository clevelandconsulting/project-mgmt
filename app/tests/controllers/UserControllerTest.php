<?php

use Cci\Services\LoginServiceInterface;

require_once('ResourceControllerTestCase.php');

class UserControllerTest extends ResourceControllerTestCase {

	protected $loginService;
	protected $user;

	public function setUp() {
		parent::setUp();
		
		$this->route = '/users';
		$this->mockedRepository = $this->mock('Cci\Repositories\Interfaces\UserRepositoryInterface');
		$this->loginService = $this->mock('Cci\Services\LoginServiceInterface');
		$this->status = array_merge( $this->status,
									 array(
											'create'=>404,
											'destroy'=>404,
											'index'=>404,
											'edit'=>404,
											'store'=>404,
										));
			
	}
	
	public function buildResponseArray($status,$hasFlash,$hasUser,$user_id=null) {
		$result = array("status"=>$status,"hasFlash"=>$hasFlash,"hasUser"=>$hasUser);
		if ( $user_id != null) {
			$result['user_id'] = $user_id;
		}
		
		return $result;
	}
	
	public function buildActualResponseArray($response, $user_id=false) {
		$code = $response->getStatusCode();
		$content = json_decode($response->getContent());
		
		//dd($response);
		
		if(is_object($content)) {
			$hasUser = property_exists($content,"user") && ( is_object($content->user ) || is_array($content->user) );

			$result = $this->buildResponseArray(
							$status=$code,
							$hasFlash=property_exists($content, "flash"), 
							$hasUser=$hasUser
			);
			
			if ( $hasUser && $user_id ) {
				
				$result['user_id'] = is_object($content->user) ? $content->user->id : $content->user['id'];
			}
			return $result;
		}
		else {
			return $this->buildResponseArray($status=$code,false,false);
		}
	}

	public function test_login_badlogin_returnsNoAuthAndFlash() {
		$this->loginService->shouldReceive('login')->once()->andReturn(false);
		
		$expectedResponse = $this->buildResponseArray($status=401,$hasFlash=true,$hasUser=false);
		
		$actualResponse = $this->buildActualResponseArray($this->apiCall('POST','/login', false));
		
		$this->assertEquals($expectedResponse,$actualResponse);
		
	}
	
	public function test_login_goodLogin_returnsOkAndFlashAndUser() {
		//setup the mocked login service
		$this->loginService->shouldReceive('login')->once()->andReturn(true);
		
		//setup a mock user to be returned from Auth should be returned
		//$this->user->id = 2;
		$this->mockedRepository->shouldReceive('toArray')->once()->andReturn(array('id'=>2));
		Auth::shouldReceive('user')->once()->andReturn($this->mockedRepository);
		

		$expectedResponse = $this->buildResponseArray($status=200,$hasFlash=true,$hasUser=true,2);
		
		$actualResponse = $this->buildActualResponseArray($this->apiCall('POST','/login', false),true);
		
		
		$this->assertEquals($expectedResponse,$actualResponse);
	}
	
	public function test_logout_whenCalled_returnsOKAndFlash() {
		$this->loginService->shouldReceive('logout')->once()->andReturn(true);
		
		$expectedResponse = $this->buildResponseArray($status=200,$hasFlash=true,$hasUser=false);
		
		$actualResponse = $this->buildActualResponseArray($this->apiCall('get','/logout', false));
		
		$this->assertEquals($expectedResponse,$actualResponse);
	}
	
	
	
	
	public function test_update_successfull_returnsHttpOK() {
		$user_id = 2;
		
		$this->mockedRepository->shouldReceive('find')->with($user_id)->once()->andReturn($this->mockedRepository);
		$this->mockedRepository->shouldReceive('save')->once()->andReturn(true);
		
		$expectedResponse = $this->buildResponseArray($status=200,$hasFlash=true,$hasUser=false);
		
		$actualResponse = $this->buildActualResponseArray($this->apiCall('PUT', '/2'));
		
		$this->assertEquals($expectedResponse,$actualResponse);
	}
	
	public function test_update_unSuccessfull_returnsHttpError() {
		$user_id = 2;
		
		$this->mockedRepository->shouldReceive('find')->with($user_id)->once()->andReturn($this->mockedRepository);
		$this->mockedRepository->shouldReceive('save')->once()->andReturn(false);
		
		$expectedResponse = $this->buildResponseArray($status=500,$hasFlash=true,$hasUser=false);
		
		$actualResponse = $this->buildActualResponseArray($this->apiCall('PUT', '/2'));
		
		$this->assertEquals($expectedResponse,$actualResponse);
	}
	
	
}