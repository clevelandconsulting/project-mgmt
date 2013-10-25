<?php

require_once('ControllerTestCase.php');

use api\v1\apiController;

class ResourceControllerTestCase extends ControllerTestCase {
	protected $mockedRepository;
	protected $status = array(
		'index'=>200,
		'show' => 200,
		'update' => 200,
		'create' => 201,
		'edit'=>404,
		'store' => 200,
		'destroy'=>200,
	);
	
	  /**************************************************************
	  *
	  *  INDEX FUNCTIONS
	  *
	  **************************************************************/
	
	public function test_index_whenCalledWithXmlMediaType_returns415NotSupported() {
	    if($this->status['index']==200) $this->mockedRepository->shouldReceive('all')->never();

		$response = $this->apiCall('GET', '', true, array(), array(), array("HTTP_Accept"=>"application/xml"));
		
		$this->assertEquals(415,$response->getStatusCode());
		
	}
	
	public function test_index_whenCalledWithNoMediaType_returns200() {
	    if($this->status['index']==200) $this->mockedRepository->shouldReceive('all')->once();

		$this->apiCall('GET', '', true, array(), array(), array("HTTP_Accept"=>''));
		
		$this->assertResponseStatus($this->status['index']);
		
	}
	
	public function test_index_whenCalledWithProperAccept_returnsApplicationContentType() {
		if($this->status['index']==200) $this->mockedRepository->shouldReceive('all')->once();

		$response = $this->apiCall('GET', '');

		foreach($response->headers as $key => $value) {
			if ( strtolower($key) === "content-type") {
				$content_type = $value[0];
			}
		}
		
		$this->assertEquals(apiController::contentType() . "+json",$content_type);

	}
	
	public function test_index_whenCalledWithProperAccept_returnsOK() {
		if($this->status['index']==200) $this->mockedRepository->shouldReceive('all')->once();
		
		$response = $this->apiCall('GET','');
		$this->assertResponseStatus($this->status['index']);
	}
	
	public function test_index_whenCalledWithProperAccept_returnsAll() {
		if ( $this->status['index']==200 ) {
			$all = 'foo';
			$this->mockedRepository->shouldReceive('all')->once()->andReturn($all);
			
			$response = $this->apiCall("GET",'');
			$content = json_decode($response->getContent());
			
			$this->assertEquals($all,$content);//$response->original);
		}
	}
	
	
	
	  /**************************************************************
	  *
	  *  SHOW FUNCTIONS
	  *
	  **************************************************************/
	  
	public function test_show_whenCalledWithXmlMediaType_returns415NotSupported() {
	    $id = 1;
		if($this->status['show']==200) $this->mockedRepository->shouldReceive('find')->never();
		
		$response = $this->apiCall('GET','/' . $id, true, array(), array(), array("HTTP_Accept"=>"application/xml"));
		
		$this->assertEquals(415,$response->getStatusCode());
		
	}
	
	public function test_show_whenCalledWithNoMediaType_returns200() {
		$id = 1;
		if($this->status['show']==200) $this->mockedRepository->shouldReceive('find')->once()->with($id);
		
		$response = $this->apiCall('GET','/' . $id,true, array(), array(), array("HTTP_Accept"=>''));
		$this->assertResponseStatus($this->status['show']);
		
	}
	
	public function test_show_whenCalledWithProperAccept_returnsApplicationContentType() {
		$id = 1;
		if($this->status['show']==200) $this->mockedRepository->shouldReceive('find')->once()->with($id);
		
		$response = $this->apiCall('GET','/' . $id);

		foreach($response->headers as $key => $value) {
			if ( strtolower($key) === "content-type") {
				$content_type = $value[0];
			}
		}
		
		$this->assertEquals(apiController::contentType() . "+json",$content_type);

	}
	  
	
	public function test_show_whenCalled_returnsOK() {
		$id = 1;
		if($this->status['show']==200) $this->mockedRepository->shouldReceive('find')->once()->with($id);
		
		$response = $this->apiCall('GET','/' . $id);
		$this->assertResponseStatus($this->status['show']);
	}
	
	public function test_show_whenCalled_returnsfind() {
		if ( $this->status['show']==200 ) {
			$find = 'foo';
			$id = 1;
			$this->mockedRepository->shouldReceive('find')->once()->with($id)->andReturn($find);
			
			$response = $this->apiCall("GET",'/' . $id);
			$content = json_decode($response->getContent());
			
			$this->assertEquals($find,$content);
		}
	}
	
	  /**************************************************************
	  *
	  *  UPDATE FUNCTIONS
	  *
	  **************************************************************/
	
	public function test_update_whenSaves_returnsOK() {
		$id = 1;
		
		if($this->status['update']==200) {
			$this->mockedRepository->shouldReceive('find')->once()->with($id)->andReturn($this->mockedRepository);
			$this->mockedRepository->shouldReceive('save')->once()->andReturn(true);
		}
		
		$response = $this->apiCall('PUT','/' . $id);
		$this->assertResponseStatus($this->status['update']);
	}
	
	public function test_update_whenFailsSaving_returns500() {
		$id = 1;
		
		if($this->status['update']==200) {
			$this->mockedRepository->shouldReceive('find')->once()->with($id)->andReturn($this->mockedRepository);
			$this->mockedRepository->shouldReceive('save')->once()->andReturn(false);
			
			$response = $this->apiCall('PUT','/' . $id);
			$this->assertResponseStatus(500);
		}
	}	
	
	  /**************************************************************
	  *
	  *  CREATE FUNCTIONS
	  *
	  **************************************************************/
	
	
	public function test_create_whenCalled_returnsOK() {
		$response = $this->apiCall('GET','/create');
		$this->assertResponseStatus($this->status['create']);
	}
	
	  /**************************************************************
	  *
	  *  EDIT FUNCTIONS
	  *
	  **************************************************************/
	
	public function test_edit_whenCalled_returnsOK() {
		$response = $this->apiCall('GET','/1/edit');
		$this->assertResponseStatus($this->status['edit']);
	}
	
	  /**************************************************************
	  *
	  *  STORE FUNCTIONS
	  *
	  **************************************************************/
	
	public function test_store_whenCalled_returnsOK() {
		$response = $this->apiCall('POST','');
		$this->assertResponseStatus($this->status['store']);
	}
	
	  /**************************************************************
	  *
	  *  DESTROY FUNCTIONS
	  *
	  **************************************************************/
	
	public function test_destroy_whenCalled_returnsOK() {
		$response = $this->apiCall('DELETE','/1');
		$this->assertResponseStatus($this->status['destroy']);
	}

}