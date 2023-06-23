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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string("Job");
            $table->foreignId("Category_id")->references("id")->on("job_categories")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("Company_id")->references("id")->on("employers")->onDelete("cascade")->onUpdate("cascade");
            $table->string("Type");
            $table->string("Level");
            $table->string("Salary");
            $table->string("Hours");
            $table->string("Rate");
            $table->text("Skills");
            $table->text("Experience");
            $table->string("Location");
            $table->string("Place");
            $table->date("Expired_Date");
            $table->text("Description");
            $table->text("Responsibilities");
            $table->string("Status");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
