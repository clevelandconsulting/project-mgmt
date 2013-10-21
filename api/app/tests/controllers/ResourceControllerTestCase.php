<?php

require_once('ControllerTestCase.php');

class ResourceControllerTestCase extends ControllerTestCase {
	protected $mockedRepository;
	protected $status = array(
		'index'=>200,
		'show' => 200,
		'update' => 200,
		'create' => 200,
		'edit'=>404,
		'store' => 200,
		'destroy'=>200,
	);
	
	public function test_index_whenCalled_returnsOK() {
		if($this->status['index']==200) $this->mockedRepository->shouldReceive('all')->once();
		
		$response = $this->apiCall('GET','');
		$this->assertResponseStatus($this->status['index']);
	}
	
	public function test_show_whenCalled_returnsOK() {
		$id = 1;
		if($this->status['show']==200) $this->mockedRepository->shouldReceive('find')->once()->with($id);
		
		$response = $this->apiCall('GET','/' . $id);
		$this->assertResponseStatus($this->status['show']);
	}
	
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
	
	
	public function test_create_whenCalled_returnsOK() {
		$response = $this->apiCall('GET','/create');
		$this->assertResponseStatus($this->status['create']);
	}
	
	public function test_edit_whenCalled_returnsOK() {
		$response = $this->apiCall('GET','/1/edit');
		$this->assertResponseStatus($this->status['edit']);
	}
	
	public function test_store_whenCalled_returnsOK() {
		$response = $this->apiCall('POST','');
		$this->assertResponseStatus($this->status['store']);
	}
	
	public function test_destroy_whenCalled_returnsOK() {
		$response = $this->apiCall('DELETE','/1');
		$this->assertResponseStatus($this->status['destroy']);
	}
	
	
	public function test_index_whenCalled_returnsAll() {
		if ( $this->status['index']==200 ) {
			$all = 'foo';
			$this->mockedRepository->shouldReceive('all')->once()->andReturn($all);
			
			$response = $this->apiCall("GET",'');
			$content = json_decode($response->getContent());
			
			$this->assertEquals($all,$content);//$response->original);
		}
	}
	
	public function test_show_whenCalled_returnsfind() {
		if ( $this->status['show']==200 ) {
			$find = 'foo';
			$id = 1;
			$this->mockedRepository->shouldReceive('find')->once()->with($id)->andReturn($find);
			
			$response = $this->apiCall("GET",'/' . $id);
			
			$this->assertEquals($find,$response->original);
		}
	}
}