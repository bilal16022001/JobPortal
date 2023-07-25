<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo("\App\Models\JobCategory", "Category_id");
    }
    public function Company()
    {
        return $this->belongsTo("\App\Models\Employer", "Company_id");
    }
    public function application()
    {
        return $this->hasMany("\App\Models\Application", "Job_id");
    }
    public function filterApplicationsByStatus($status)
    {
        return $this->applications()->where('Status', $status);
    }
}
