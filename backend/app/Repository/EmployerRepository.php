<?php

namespace App\Repository;

use App\Interface\EmployerInterface;
use App\Models\Employer;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EmployerRepository implements EmployerInterface
{
    public function index()
    {
        return Employer::with("jobs")->get();
    }
    // public function create()
    // {
    //     return "create";
    // }
    // public function edit($id)
    // {
    //     return "edit";
    // }
    public function show($id)
    {
        return Employer::findOrFail($id);
    }

    public function store($request)
    {
        return "register emply";
    }
    public function login_E($request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required|max:191'
        ]);

        $Employer = Employer::where("email", $request->email)->first();
        if (!$Employer || !Hash::check($request->password, $Employer->Password)) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid Credintials'
            ]);
        } else {
            $token = $Employer->createToken($Employer->email . '_EmployerToken', ['server:Employer'])->plainTextToken;
        }

        return response()->json([
            'status' => 200,
            'token' => $token,
            'message' => 'login successfully'
        ]);
    }
    // public function update($request, $id)
    // {
    //     return "updt";
    // }
    public function RegisterEmp($request)
    {
        $request->validate([
            'Name' => 'required',
            'Phone' => "required",
            'email' => "required|email",
            'Password' => "required",
            'logo' => "required",
        ]);

        $employer = Employer::where("email", $request->email)->first();

        if ($employer) {
            return response()->json([
                'status' => 201,
                'message' => 'this Account is Founed'
            ]);
        }


        $file = $request->file("logo");
        $ex  =  $file->getClientOriginalExtension();
        $fileName = Str::random() . "." . $ex;
        $file->move("attachments/LogoCompany/", $fileName);

        Employer::create([
            'Name' => $request->Name,
            'Phone' => $request->Phone,
            'email' => $request->email,
            'Password' => Hash::make($request->Password),
            'logo' => "attachments/LogoCompany/" . $fileName,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'employer added successfully!',

        ]);
    }
    public function destroy($id)
    {
        Employer::destroy($id);

        return response()->json([
            'status' => 200
        ]);
    }
}
