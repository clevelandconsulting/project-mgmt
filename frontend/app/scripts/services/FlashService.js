'use strict';

angular.module('frontendApp')
  .factory('FlashService', function () {
    // Service logic
    // ...

	
	var	defaultMessage= null;
	var	defaultLevel= 0;
	var	defaultClass= null;

	var options = {
		levels: {
			error: 1,
			warning: 2,
			info: 3,
			success: 4
		},
		classes: {
			error: 'flash_error',
			success: 'flash_success',
			info: 'flash_info',
			warning: 'flash_warning',	
		},
	    getClass: function(level) {
	    	var c = null;
	    	
			switch(level) {
				case this.levels.error: c = this.classes.error; break;
				case this.levels.warning: c = this.classes.warning; break;
				case this.levels.info: c = this.classes.info; break;
				case this.levels.success: c = this.classes.success; break;
			}
			
			return c;
		}
	};
	
	

    // Public API here
    return {
      options: options,
      current: {
      	message: defaultMessage,
      	level: defaultLevel,
      	class: defaultClass
      },
      set: function (message, level) {
      	this.current.message = message;
      	this.current.level = level;
      	this.current.class = this.options.getClass(level);
      },
      clear: function() {
      	  
	      this.current = {
		      	message: defaultMessage,
		      	level: defaultLevel,
		      	class: defaultClass
	  	  };
      },
      configure: function(configuration) {
	      angular.extend(options,configuration);
      },
      success: function(message) {
	      this.set(message,options.levels.success);
      },
      error: function(message) {
	      this.set(message,options.levels.error);
      },
      isset: function() {
	      return this.current.message === defaultMessage ? false : true;
      }
    };
  });
