<?php

namespace App\Http\Controllers\Api\Job;

use App\Http\Controllers\Controller;
use App\Interface\JobInterface;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public $job;

    public function __construct(JobInterface $job)
    {
        $this->job = $job;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->job->index();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->job->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->job->show($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job $job)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        return $this->job->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        return $this->job->destroy($id);
    }
}
