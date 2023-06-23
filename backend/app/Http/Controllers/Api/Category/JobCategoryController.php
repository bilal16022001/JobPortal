<?php

namespace App\Http\Controllers\Api\Category;

use App\Http\Controllers\Controller;
use App\Models\JobCategory;
use Illuminate\Http\Request;
use App\Interface\JobCategoryInterface;

class JobCategoryController extends Controller
{
    protected $jobCategory;

    public function __construct(JobCategoryInterface $jobCategory)
    {
        $this->jobCategory = $jobCategory;
    }

    public function index()
    {
        return $this->jobCategory->index();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return $this->jobCategory->create();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        return $this->jobCategory->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->jobCategory->show($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return $this->jobCategory->edit($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        return $this->jobCategory->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        JobCategory::destroy($id);

        return response()->json([
            'status' => 200
        ]);
    }
}
