<?php

namespace App\Repository;

use App\Interface\JobInterface;
use App\Models\Job;

class JobRepository implements JobInterface
{
    public function index()
    {
        return Job::with("Category", "Company", "application")->get();
    }
    public function show($id)
    {
        return Job::with("Category", "Company", "application")->FindOrFail($id);
    }
    public function store($request)
    {
        $request->validate([
            'Job' => 'required',
            'Category_id' => 'required|numeric',
            'Type' => 'required',
            'Level' => 'required',
            'Salary' => 'required',
            'Hours' => 'required',
            'Rate' => 'required',
            'Skills' => 'required',
            'Experience' => 'required',
            'Location' => 'required',
            'Place' => 'required',
            'Expired_Date' => 'required',
            'Description' => 'required',
            'Responsibilities' => 'required',
            'Status' => 'required'
        ]);

        Job::create([
            'Job' => $request->Job,
            'Category_id' => $request->Category_id,
            'Company_id' => auth()->user()->id,
            'Type' => $request->Type,
            'Level' => $request->Level,
            'Salary' => $request->Salary,
            'Hours' => $request->Hours,
            'Rate' => $request->Rate,
            'Skills' => $request->Skills,
            'Experience' => $request->Experience,
            'Location' => $request->Location,
            'Place' => $request->Place,
            'Expired_Date' => $request->Expired_Date,
            'Description' => $request->Description,
            'Responsibilities' => $request->Responsibilities,
            'Status' => $request->Status,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'job added Successfully!'
        ]);
    }
    public function update($request, $id)
    {
        $job = Job::findorfail($id);
        $job->Job = $request->Job;
        $job->Category_id = $request->Category_id;
        $job->Level = $request->Level;
        $job->Salary = $request->Salary;
        $job->Hours = $request->Hours;
        $job->Rate = $request->Rate;
        $job->Skills = $request->Skills;
        $job->Experience = $request->Experience;
        $job->Location = $request->Location;
        $job->Place = $request->Place;
        $job->Expired_Date = $request->Expired_Date;
        $job->Description = $request->Description;
        $job->Responsibilities = $request->Responsibilities;
        $job->Status = $request->Status;
        $job->save();

        return response()->json([
            'status' => 200,
            'message' => "Job Updated Successfully!"
        ]);
    }
    public function destroy($id)
    {
        Job::destroy($id);

        return response()->json([
            'status' => 200,
            'message' => 'job Deleted Successfully!'
        ]);
    }
}
