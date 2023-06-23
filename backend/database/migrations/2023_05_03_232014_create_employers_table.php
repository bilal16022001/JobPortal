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
        Schema::create('employers', function (Blueprint $table) {
            $table->id();
            $table->string("Name");
            $table->string("Location")->nullable();
            $table->string("Categories")->nullable();
            $table->integer("Phone");
            $table->string("email")->unique();
            $table->string("Password");
            $table->string("Indusrty")->nullable();
            $table->string("CompanySize")->nullable();
            $table->string("Founded")->nullable();
            $table->string("logo");
            $table->string("WebSite")->nullable();
            $table->string("Address")->nullable();
            $table->string("Country")->nullable();
            $table->string("AboutCompany")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employers');
    }
};
