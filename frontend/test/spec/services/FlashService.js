'use strict';

describe('Service: FlashService', function () {

  var msg = 'This is an example message, it does not matter what it is.';
  var level = 1;
  
  var flashLevels = {
	  error: 1,
	  warning: 2,
	  info: 3,
	  success: 4
  };

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var FlashService;
  beforeEach(inject(function (_FlashService_) {
    FlashService = _FlashService_;
  }));

  it('should have a way to set the current flash', function () {
    expect(FlashService.set).toBeDefined();
  });
  
  it('should have a way to configure the service', function() {
	  expect(FlashService.configure).toBeDefined();
  });
  
  it('should have a way to clear the flash message', function() {
	  expect(FlashService.clear).toBeDefined();
  });
  
  it('should have a way to get the flash message', function() { 
  	  expect(FlashService.current).toBeDefined();
  });
  
  it('should have a way to get a class based on the flash level', function() {
	  expect(FlashService.current.class).toBeDefined();
  });
  
  it('should have a quick success function to set a message with success', function() {
	 expect(FlashService.success).toBeDefined(); 
  });
  
  it('should have a quick error function to set a message with error', function() {
	 expect(FlashService.error).toBeDefined(); 
  });
  
  it('should have a isset function', function() { 
  	expect(FlashService.isset).toBeDefined();
  });
  
  describe('when calling isset when there is a message', function() {
  	
  	beforeEach(function() {
	  	FlashService.set(msg,level);
  	});
  
  	afterEach(function() {
	  	FlashService.clear();
  	});
  	
  	it('should return true', function() { 
  		expect(FlashService.isset()).toEqual(true);
  	});
  
  });
  
  describe('when calling isset when there is no message', function() {
  	
  	beforeEach(function() {
	  	FlashService.clear();
  	});
  	
  	it('should return false', function() { 
  		expect(FlashService.isset()).toEqual(false);
  	});
  
  });
  
  describe('when calling error', function() {
  	
  	beforeEach(function() {
	  	FlashService.error(msg);
  	});
  
  	afterEach(function() {
	  	FlashService.clear();
  	});
  	
  	it('should set the message apporpriately', function() { 
  		expect(FlashService.current.message).toEqual(msg);
  	});
  
  	it('should set the level to error', function() {
	  	expect(FlashService.current.level).toEqual(FlashService.options.levels.error);	
  	})
  
  });
  
  describe('when calling success', function() {
  	
  	beforeEach(function() {
	  	FlashService.success(msg);
  	});
  
  	afterEach(function() {
	  	FlashService.clear();
  	});
  	
  	it('should set the message apporpriately', function() { 
  		expect(FlashService.current.message).toEqual(msg);
  	});
  
  	it('should set the level to success', function() {
	  	expect(FlashService.current.level).toEqual(FlashService.options.levels.success);	
  	})
  
  });
  
  describe('when configuring the service', function() {
  	
  	var configuration = {
  		classes: {
		  	error: 'custom_error',
		  	info: 'custom_info',
		  	success: 'custom_success',
		  	warning: 'custom_warning'
	  	}
  	}
  	
  	beforeEach(function() {
	  	FlashService.configure(configuration);
  	});
  
  	afterEach(function() {
	  	FlashService.clear();
  	});
  	
  	it('should cause an error to return the error class', function() {
  		FlashService.set(msg,flashLevels.error);
  		expect(FlashService.current.class).toEqual(configuration.classes.error);
  	});
  	
  	it('should cause an info to return the info class', function() {
  		FlashService.set(msg,flashLevels.info);
  		expect(FlashService.current.class).toEqual(configuration.classes.info);
  	});
  	
  	it('should cause a warning to return the warning class', function() {
  		FlashService.set(msg,flashLevels.warning);
  		expect(FlashService.current.class).toEqual(configuration.classes.warning);
  	});
  	
  	it('should cause ansuccess to return the success class', function() {
  		FlashService.set(msg,flashLevels.success);
  		expect(FlashService.current.class).toEqual(configuration.classes.success);
  	});
  
  });
  
  describe('when the flash is an error', function() {
  	
  	beforeEach(function() {
	  	FlashService.set(msg,flashLevels.error);
  	});
  
  	afterEach(function() {
  
  	});
  	
  	it('should return the flash error class', function() { 
  		expect(FlashService.current.class).toEqual(FlashService.options.classes.error);
  	});
  
  });
  
  describe('when the flash is an info', function() {
  	
  	beforeEach(function() {
	  	FlashService.set(msg,flashLevels.info);
  	});
  
  	afterEach(function() {
  
  	});
  	
  	it('should return the flash info class', function() { 
  		expect(FlashService.current.class).toEqual(FlashService.options.classes.info);
  	});
  
  });
  
  describe('when the flash is an warning', function() {
  	
  	beforeEach(function() {
	  	FlashService.set(msg,flashLevels.warning);
  	});
  
  	afterEach(function() {
  
  	});
  	
  	it('should return the flash warning class', function() { 
  		expect(FlashService.current.class).toEqual(FlashService.options.classes.warning);
  	});
  
  });
  
   describe('when the flash is an success', function() {
  	
  	beforeEach(function() {
	  	FlashService.set(msg,flashLevels.success);
  	});
  
  	afterEach(function() {
  
  	});
  	
  	it('should return the flash success class', function() { 
  		expect(FlashService.current.class).toEqual(FlashService.options.classes.success);
  	});
  
  });
  
  describe('when setting the flash', function() {
	 
	 beforeEach(function() {
		FlashService.set(msg,level); 
	 });
	 
	 it('should set the current flash message to what was sent', function() { 
	 	expect(FlashService.current.message).toEqual(msg);
	 }); 
	 
	 it('should set the current flash level to what was sent', function() { 
	 	expect(FlashService.current.level).toEqual(level);
	 });
	 
  });
  
  describe('when clearing the flash', function() {
  	
  	var orgFlash, newFlash;
  	
  	beforeEach(function() {
	  	FlashService.set(msg, level);
	  	orgFlash = {
	  		message: FlashService.current.message,
	  		level: FlashService.current.level,
	  		class: FlashService.current.class
	  	};
	  	
	  	FlashService.clear();
	  	
	  	newFlash = {
	  		message: FlashService.current.message,
	  		level: FlashService.current.level,
	  		class: FlashService.current.class
	  	};
  	});
  
  	afterEach(function() {
  
  	});
  	
  	it('the new message should not be the same as the old message', function() { 
  		expect(newFlash).toNotEqual(orgFlash);
  	});
  	
  	
  	it('should reset any message', function() {
  		
  		var expectedMsg = null;
  		expect(expectedMsg).toEqual(newFlash.message);
  	});
  	
  	it('should reset any level', function() { 
  		var expectedLevel = 0;
  		expect(expectedLevel).toEqual(newFlash.level);
  	});
  
  });

});
