<?php

namespace App\Http\Controllers\api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
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

        $request->validate([
            'Name' => 'required',
            'Job' => "required",
            'Phone' => "required",
            'Email' => "required|email",
            'Gender' => "required",
            'Birthday' => "required|date",
            'Password' => "required",
            'Profile' => "required",
            'Resume' => "required"
        ]);

        if (User::where("Email", $request->Email)->first()) {
            return response()->json([
                'status' => 201,
                'message' => 'this Account is Founed'
            ]);
        }

        $file = $request->file("Profile");
        $ex  =  $file->getClientOriginalExtension();
        $fileName = Str::random() . "." . $ex;
        $file->move("attachments/Profile/", $fileName);

        $fileRe = $request->file("Resume");
        $exRe =  $fileRe->getClientOriginalExtension();
        $fileNameRe = Str::random() . "." . $exRe;
        $fileRe->move("attachments/Resume", $fileNameRe);

        User::create([
            'Name' => $request->Name,
            'Job' => $request->Job,
            'Phone' => $request->Phone,
            'Email' => $request->Email,
            'Gender' => $request->Gender,
            'Birthday' => $request->Birthday,
            'Password' => Hash::make($request->Password),
            'Profile' => "attachments/Profile/" . $fileName,
            'Resume' => "attachments/Resume/" . $fileNameRe,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'User added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return User::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        User::destroy($id);

        return response()->json([
            'status' => 200
        ]);
    }
}
