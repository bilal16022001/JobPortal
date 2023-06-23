<?php

namespace App\Repository;

use App\Interface\AboutInterface;
use App\Models\About;



class AboutRepository implements AboutInterface
{
    public function index()
    {
        return About::all()->first();
    }
    public function store($request)
    {
        $about = About::count();
        if ($about == 0) {
            About::create([
                'Title' => $request->Title,
                'Description' => $request->Description
            ]);

            return response()->json([
                'status' => 200,
                'message' => 'data added successfully!'
            ]);
        } else {
            $UpdateAbout = About::all()->first();
            $UpdateAbout->Title = $request->Title;
            $UpdateAbout->Description = $request->Description;
            $UpdateAbout->save();
            return response()->json([
                'status' => 201,
                'message' => 'data updated successfully!'
            ]);
        }
    }
}
