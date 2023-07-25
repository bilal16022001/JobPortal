<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;


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

    public function login(Request  $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|max:191'
        ]);

        $user = User::where("Email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->Password)) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid Credintials'
            ]);
        } else {
            $token = $user->createToken($user->Email . '_userToken', ['server:user'])->plainTextToken;
        }
        return response()->json([
            'status' => 200,
            'name' => $user->Name,
            'token' => $token,
            'message' => 'login successfully'
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
    public function update(Request $request, $id)
    {
        $request->validate([
            'Name' => 'required',
            'Email' => ['required', Rule::unique('users', 'Email')->ignore(auth()->user()->id),],
            'Phone' => ['required', Rule::unique("users", "Phone")->ignore(auth()->user()->id)],
            'Gender' => 'required',
            'Job' => 'required',
            'Birthday' => 'required',
        ]);

        $user = User::FindOrFail(auth()->user()->id);
        $user->Name = $request->Name;
        $user->Phone = $request->Phone;
        $user->Gender = $request->Gender;
        $user->Email = $request->Email;
        $user->Job = $request->Job;
        $user->Birthday = $request->Birthday;

        if (Hash::needsRehash($request->Password)) {
            $pass = Hash::make($request->Password);
        } else {
            $pass = $request->Password;
        }

        if (empty($request->file("Profile"))) {
            $img = $request->Profile;
        } else {
            $file = $request->Profile;
            $ex = $file->getClientOriginalExtension();
            $fileName = Str::random() . "." . $ex;
            $file->move("attachments/Profile", $fileName);
            $img = "attachments/Profile/" . $fileName;

            $imagePath = public_path($user->Profile);
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }
        }

        $user->Password = $pass;
        $user->Profile = $img;
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Your Data Updated Successfully!'
        ]);
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

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Logout Done Successfully'
        ]);
    }
}
