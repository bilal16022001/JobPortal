<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|max:191'
        ]);

        $admin = Admin::where("email", $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid Credintials'
            ]);
        } else {
            $token = $admin->createToken($admin->email . '_AdminToken', ['server:admin'])->plainTextToken;
        }

        return response()->json([
            'status' => 200,
            'name' => $admin->name,
            'token' => $token,
            'message' => 'login successfully'
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => ['required', Rule::unique("admins", "email")->ignore(auth()->user()->id),]

        ]);

        $admin = Admin::FindOrFail(auth()->user()->id);
        $admin->name = $request->name;
        $admin->email = $request->email;

        if (Hash::needsRehash($request->password)) {
            $pass = Hash::make($request->password);
        } else {
            $pass = $request->password;
        }
        if (empty($request->file("profile"))) {
            $img = $request->profile;
        } else {
            $file = $request->profile;
            $ex = $file->getClientOriginalExtension();
            $fileName = Str::random() . "." . $ex;
            $file->move("attachments/Profile", $fileName);
            $img = "attachments/Profile/" . $fileName;

            $imagePath = public_path($admin->profile);
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }
        }

        $admin->password = $pass;
        $admin->profile = $img;
        $admin->save();

        return response()->json([
            'status' => 200,
            'message' => 'Your Data Updated Successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        //
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
