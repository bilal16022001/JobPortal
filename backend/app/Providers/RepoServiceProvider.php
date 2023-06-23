<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepoServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        // $this->app->bind('App\Interface\JobCategoryInterface', 'App\Repository\JobCategoryRepository');
        // $this->app->bind('App\Interface\EmployerInterface', 'App\Repository\EmployerRepository');
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
        //
    }
}
