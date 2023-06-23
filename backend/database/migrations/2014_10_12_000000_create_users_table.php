<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('Name');
            $table->string("Job");
            $table->integer("Phone");
            $table->string('Email')->unique();
            $table->string("Gender");
            $table->date("Birthday");
            $table->timestamp('email_verified_at')->nullable();
            $table->string('Password');
            $table->string("Profile")->nullable();
            $table->string("Resume");
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
