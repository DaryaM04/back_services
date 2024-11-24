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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_id');
            $table->unsignedBigInteger('user_id');
            $table->string('description')->nullable();
            $table->unsignedSmallInteger('status')->default(0);
            $table->string('employer_feedback')->nullable();
            $table->string('employee_feedback')->nullable();
            $table->json('options')->nullable();
            $table->dateTime('closed_at')->nullable();
            $table->timestamps();

            $table->foreign('job_id')->references('id')->on('jobs')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreign('user_id')->references('id')->on('users')->restrictOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
