<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Employer extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];

    public function jobs()
    {
        return $this->hasMany("\App\Models\Job", "Company_id");
    }
}
