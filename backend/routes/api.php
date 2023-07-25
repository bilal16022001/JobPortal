<?php

use App\Http\Controllers\Api\About\AboutController;
use App\Http\Controllers\Api\Applications\ApplicationController;
use App\Http\Controllers\Api\Auth\AdminController;
use App\Http\Controllers\Api\Auth\UserController;
use App\Http\Controllers\Api\Category\JobCategoryController;
use App\Http\Controllers\Api\Employers\EmployerController;
use App\Http\Controllers\Api\Contact\ContactController;
use App\Http\Controllers\Api\Job\JobController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post("/login", [AdminController::class, "login"]);
Route::post("/RegisterEmp", [EmployerController::class, "RegisterEmp"]);
Route::post("/login_E", [EmployerController::class, "login_E"]);
Route::post("/loginU", [UserController::class, "login"]);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource("Category", JobCategoryController::class);
    Route::apiResource("Users", UserController::class);
    Route::apiResource("Employers", EmployerController::class);

    // Route::apiResource("Applications", ApplicationController::class);
    Route::post("/logout", [UserController::class, "Logout"]);
});

Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {

    Route::get("/CheckAuth", function () {
        return response()->json([
            'message' => "YOU Are Admin",
            'status' => 200
        ]);
    });

    Route::apiResource("About", AboutController::class);
    Route::apiResource("Contact", ContactController::class);
});


Route::middleware(['auth:sanctum', 'isEmployer'])->group(function () {
    Route::get("/CheckEmployer", function () {
        return response()->json([
            'message' => "YOU Are Employer",
            'status' => 200,
            'user' => auth()->user()
        ]);
    });
    Route::apiResource("Applications", ApplicationController::class);
    Route::post("/ShortListApplication", [ApplicationController::class, "ShortListApplication"]);
    Route::get("/filterJobs", [JobController::class, "filterJobs"]);
});

Route::middleware(["auth:sanctum", "isCandidate"])->group(function () {

    Route::get("/CheckCnadidate", function () {
        return response()->json([
            'message' => "YOU Are candidate",
            'status' => 200,
            'user' => auth()->user()
        ]);
    });
});

Route::apiResource("Job", JobController::class);
