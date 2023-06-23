<?php

namespace App\Http\Controllers\Api\Employers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interface\EmployerInterface;

class employerController extends Controller
{
    protected $employer;

    public function __construct(EmployerInterface $employer)
    {
        $this->employer = $employer;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->employer->index();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return $this->employer->create();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->employer->store($request);
    }

    public function RegisterEmp(Request $request)
    {
        return $this->employer->RegisterEmp($request);
    }

    public function login_E(Request $request)
    {
        return $this->employer->login_E($request);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->employer->show($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // return $this->employer->edit($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // return $this->employer->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        return $this->employer->destroy($id);
    }
}
