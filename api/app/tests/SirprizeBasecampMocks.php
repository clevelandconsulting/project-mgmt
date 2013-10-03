<?php

class SirprizeBasecampMocks {

	public static function mockId($number) {
		$id = Mockery::mock('sirprize\basecamp\Id');
		$id->shouldReceive('getId->get')->andReturn($number);
		$id->shouldReceive('get')->andReturn($number);
		
		return $id;
	}

	public static function mockCompany() {
		$c = Mockery::mock('sirprize\basecamp\Company');
		$c->id[0] = 8937497;  //any basecamp id will do here
		$c->name[0] = 'foo';
		
		return $c;
	}
		
	public static function mockProject() {
		$p = Mockery::mock('sirprize\basecamp\Project\Entity');
		$p->shouldReceive('getId->get')->andReturn('foo');
		$p->shouldReceive('getName')->andReturn('foo');
		$p->shouldReceive('getCompany')->andReturn(self::mockCompany());
		$p->shouldReceive('getStatus')->andReturn('foo');
		$p->shouldReceive('getStartPage')->andReturn('foo');
		$p->shouldReceive('getId')->andReturn('foo');
		
		return $p;
	}
	
	public static function mockPerson() {
		$p = Mockery::mock('sirprize\basecamp\Person\Entity');
		$p->shouldReceive('getId->get')->andReturn(67767);
		$p->shouldReceive('getUsername')->andReturn('foo');
		$p->shouldReceive('getCompanyId->get')->andReturn(435);
		$p->shouldReceive('getFirstname')->andReturn('foo');
		$p->shouldReceive('getLastname')->andReturn('foo');
		$p->shouldReceive('getEmailAddress')->andReturn('foo');
		
		return $p;
	}
	
	public static function mockPersons() {
		$a = array (
			self::mockPerson()
		);
		
		return $a;
		
		//return self::mockIteratorOver($a)->shouldReceive('getReponse->isError')->andReturn($errors);
	}
	
	public static function mockProjects() {
		$a = array (
			self::mockProject()
		);
		
		return $a;
		
		//return self::mockIteratorOver($a)->shouldReceive('getReponse->isError')->andReturn($errors);
	}
	
	public static function mockProjectInstance($errors=false) {
		$pi = Mockery::mock('sirprize\basecamp\ProjectInstance');
		$pi->shouldReceive('startAll')->andReturn(self::mockProjects($errors));
		$pi->shouldReceive('getResponse->isError')->andReturn($errors);
		
		return $pi;
	}
	
	public static function mockPersonsInstance($errors=false) {
		$pi = Mockery::mock('sirprize\basecamp\PersonsInstance');
		$pi->shouldReceive('startAll')->andReturn(self::mockPersons());
		$pi->shouldReceive('startAllByProjectId')->andReturn(self::mockPersons());
		$pi->shouldReceive('getResponse->isError')->andReturn($errors);
		
		return $pi;
	}
	
	public static function mockIteratorOver($a, $class = 'Iterator', $complete = true, $numElms = null)
	{
	  if ($complete === false && $numElms === null) {
	    throw new Exception("Must provide a number of elements for an " .
	      "incomplete iteration");
	  }
	 
	  if ($complete) {
	    $numElms = count($a);
	  }
	 
	  $m = \Mockery::mock($class);
	 
	  // The iterator will receive a call to `rewind` with no arguments
	  $m->shouldReceive('rewind')->withNoArgs();
	 
	  // The iterator will receive a call to `valid` for each element in the array
	  // and return true to indicate that that iteration should continue as well as
	  // one last time returning false to indicate the end of the iteration
	  $validVals = array();
	  for ($i = 0; $i < $numElms; $i++) {
	    $validVals[] = true;
	  }
	  if ($complete) {
	    $validVals[] = false;
	  }
	 
	  $exp = $m->shouldReceive('valid')->withNoArgs()->times(count($validVals));
	  call_user_func_array(array($exp, 'andReturn'), $validVals);
	 
	  // The iterator will receive a call to current for each element in the given
	  // array
	  $currentVals = array_values($a);
	  if (!$complete) {
	    $currentVals = array_slice($currentVals, 0, $numElms);
	  }
	  $exp = $m->shouldReceive('current')->withNoArgs()->times($numElms);
	  call_user_func_array(array($exp, 'andReturn'), $currentVals);
	 
	  // The iterator will receive a call to key for each element in the given array
	  $keyVals = array_keys($a);
	  if (!$complete) {
	    $keyVals = array_slice($keyVals, 0, $numElms);
	  }
	  $exp = $m->shouldReceive('key')->withNoArgs()->times($numElms);
	  call_user_func_array(array($exp, 'andReturn'), array_keys($a));
	 
	  // The iterator will be advanced for each element in the array
	  $m->shouldReceive('next')->withNoArgs()->times(($complete ? $numElms : $numElms - 1));
	 
	  return $m;
	}
}