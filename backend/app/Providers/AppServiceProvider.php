<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        $this->app->bind('App\Interface\JobCategoryInterface', 'App\Repository\JobCategoryRepository');
        $this->app->bind('App\Interface\EmployerInterface', 'App\Repository\EmployerRepository');
        $this->app->bind('App\Interface\ContactInterface', 'App\Repository\ContactRepository');
        $this->app->bind('App\Interface\AboutInterface', 'App\Repository\AboutRepository');
        $this->app->bind('App\Interface\JobInterface', 'App\Repository\JobRepository');
        $this->app->bind('App\Interface\ApplicationInterface', 'App\Repository\ApplicationRepository');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        //
    }
}
