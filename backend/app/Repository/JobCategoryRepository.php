<?php

namespace App\Repository;

use App\Interface\JobCategoryInterface;
use App\Models\JobCategory;


class JobCategoryRepository implements JobCategoryInterface
{

    public function index()
    {
        return JobCategory::with("Jobs.Company")->get();
    }

    public function create()
    {
        return "create";
    }
    public function edit($id)
    {
        return "edit";
    }
    public function show($id)
    {
        return JobCategory::findOrFail($id);
    }

    public function store($request)
    {
        $request->validate([
            'Name' => 'required'
        ]);

        JobCategory::updateOrCreate([
            'Name' => $request->Name
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'category Added Successfully'
        ]);
    }
    public function update($request, $id)
    {
        $category = JobCategory::FindOrFail($id);
        $category->Name = $request->Name;
        $category->save();

        return response()->json([
            'status' => 200
        ]);
    }
}
