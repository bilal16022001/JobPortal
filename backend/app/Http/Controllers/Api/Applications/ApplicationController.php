<?php

namespace App\Http\Controllers\Api\Applications;

use App\Http\Controllers\Controller;
use App\Interface\ApplicationInterface;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    protected $application;

    public function __construct(ApplicationInterface $application)
    {
        $this->application = $application;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->application->index();
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
        return $this->application->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Application $application)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        return $this->application->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        return $this->application->destroy($id);
    }
}
