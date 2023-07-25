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
    }
    public function update($request, $id)
    {
        if ($request->check == 1) {
            $application = Application::FindOrFail($id);
            $application->Status = 1;
            $application->save();
        } else {
            $application = Application::FindOrFail($id);
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
