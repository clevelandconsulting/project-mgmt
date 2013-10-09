<?php 

namespace Cci\ServiceProviders;
 
use Illuminate\Support\ServiceProvider;
 
class LoginServiceProvider extends ServiceProvider {
 
  public function register()
  {
  
    $this->app->bind(
      'Cci\Services\LoginServiceInterface',
      'Cci\Services\cciLoginService'
    );
        
  }
 
}