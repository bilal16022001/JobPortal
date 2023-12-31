<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class JobCategory extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['Name'];

    public function Jobs()
    {
        return $this->hasMany("\App\Models\Job", "Category_id");
    }
}
