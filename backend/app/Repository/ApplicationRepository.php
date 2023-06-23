<?php

namespace App\Repository;

use App\Interface\ApplicationInterface;
use App\Models\Application;

class ApplicationRepository implements ApplicationInterface
{
    public function index()
    {
        return Application::with("user", "job")->get();
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
