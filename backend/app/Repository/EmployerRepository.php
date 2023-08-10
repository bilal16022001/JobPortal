<?php

namespace App\Repository;

use App\Interface\EmployerInterface;
use App\Models\Employer;
use Illuminate\Support\Facades\File;
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
    public function update($request, $id)
    {
        $employer = Employer::FindOrFail(auth()->user()->id);
        $employer->Name = $request->name;
        $employer->email = $request->email;
        $employer->Categories = $request->Categories;
        $employer->Phone = $request->Phone;
        $employer->Location = $request->Location;
        $employer->Indusrty = $request->Indusrty;
        $employer->CompanySize = $request->CompanySize;
        $employer->Founded = $request->Founded;
        $employer->WebSite = $request->WebSite;
        $employer->Address = $request->Address;
        $employer->Country = $request->Country;
        $employer->AboutCompany = $request->AboutCompany;

        if (Hash::needsRehash($request->Password)) {
            $pass = Hash::make($request->Password);
        } else {
            $pass = $request->Password;
        }

        if (empty($request->file("logo"))) {
            $img = $request->logo;
        } else {
            $file = $request->logo;
            $ex = $file->getClientOriginalExtension();
            $fileName =  Str::random() . "." . $ex;
            $file->move("attachments/LogoCompany", $fileName);
            $img = "attachments/LogoCompany/" . $fileName;
        }
        $imagePath = public_path($employer->logo);
        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }


        $employer->Password = $pass;
        $employer->logo = $img;
        $employer->save();

        return response()->json([
            'status' => 200,
            'message' => 'Your Data Updated Successfully!'
        ]);
    }

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
    public function logout($request)
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Logout Done Successfully'
        ]);
    }
}
