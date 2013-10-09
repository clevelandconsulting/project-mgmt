<?php 

namespace Cci\ServiceProviders;
 
use Illuminate\Support\ServiceProvider;
 
class RepositoryServiceProvider extends ServiceProvider {
 
  public function register()
  {
  
    $this->app->bind(
      'Cci\Services\LoginServiceInterface',
      'Cci\Services\LoginService'
    );
    
    $this->app->bind(
      'Cci\Repositories\Interfaces\CompanyRepositoryInterface',
      'Cci\Repositories\EloquentCompanyRepository'
    );
    
    $this->app->bind(
      'Cci\Repositories\Interfaces\PaymentRepositoryInterface',
      'Cci\Repositories\EloquentPaymentRepository'
    );
    
    $this->app->bind(
      'Cci\Repositories\Interfaces\ProjectRepositoryInterface',
      'Cci\Repositories\EloquentProjectRepository'
    );
    
    $this->app->bind(
      'Cci\Repositories\Interfaces\ProjectUserRepositoryInterface',
      'Cci\Repositories\EloquentProjectUserRepository'
    );
    
    $this->app->bind(
      'Cci\Repositories\Interfaces\TimeRepositoryInterface',
      'Cci\Repositories\EloquentTimeRepository'
    );
    
    $this->app->bind(
      'Cci\Repositories\Interfaces\UserRepositoryInterface',
      'Cci\Repositories\EloquentUserRepository'
    );
    
  }
 
}