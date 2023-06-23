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
// Route::post("/Register", [UserController::class, "Register"]);
Route::post("/RegisterEmp", [EmployerController::class, "RegisterEmp"]);
Route::post("/login_E", [EmployerController::class, "login_E"]);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource("Category", JobCategoryController::class);
    Route::apiResource("Users", UserController::class);
});

Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {

    Route::get("/CheckAuth", function () {
        return response()->json([
            'message' => "YOU Are Admin",
            'status' => 200
        ]);
    });

    Route::apiResource("Employers", EmployerController::class);
    Route::apiResource("About", AboutController::class);
    Route::apiResource("Contact", ContactController::class);
});


Route::middleware(['auth:sanctum', 'isEmployer'])->group(function () {
    Route::get("/CheckEmployer", function () {
        return response()->json([
            'message' => "YOU Are Employer",
            'status' => 200,
        ]);
    });
    Route::apiResource("Job", JobController::class);
    // Route::apiResource("Applications", ApplicationController::class);
});
Route::apiResource("Applications", ApplicationController::class);
