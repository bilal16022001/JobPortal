<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo("\App\Models\User", "User_id");
    }
    public function job()
    {
        return $this->belongsTo("\App\Models\Job", "Job_id");
    }
}
