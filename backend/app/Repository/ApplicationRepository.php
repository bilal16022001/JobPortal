<?php

namespace App\Repository;

use App\Interface\ApplicationInterface;
use App\Models\Application;

class ApplicationRepository implements ApplicationInterface
{
    public function index()
    {
        $applications = Application::with("job", "user")
            ->whereHas("job", function ($query) {
                $query->where("Company_id", auth()->user()->id);
            })
            ->get();

        return  $applications;
    }

    public function AppliedJobs()
    {
        return Application::with("job.Company", "user")->where("User_id", auth()->user()->id)->get();
    }
    public function ShortListApplication($request)
    {

        $applications = Application::with("job", "user")
            ->whereHas("job", function ($query) use ($request) {
                $query->where("Company_id", auth()->user()->id);
            })
            ->where("Status", $request->Status)
            ->get();

        return  $applications;
    }
    public function filterApplications()
    {
        return "filter";
    }

    public function store($request)
    {
        Application::create([
            'User_id' => auth()->user()->id,
            'Job_id' => $request->Job_id,
            'Status' => 0

        ]);

        return response()->json([
            'Status'  => 200,
            'message' => 'You Applied Successfully'
        ]);
    }
    public function update($request, $id)
    {
        if ($request->check == 1) {
            $application = Application::FindOrFail($id);
            // return $application;
            $application->Status = 1;
            $application->save();
        } else {
            $application = Application::FindOrFail($id);
            // return $application;
            $application->Status = 3;
            $application->save();
        }

        return response()->json([
            'status' => 200,
        ]);
    }
    public function destroy($id)
    {
        Application::destroy($id);

        return response()->json([
            'status' => 200
        ]);
    }
}
