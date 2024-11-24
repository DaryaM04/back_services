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
            $table->string('name');
            $table->string('category');
            $table->unsignedSmallInteger('status')->default(0);
            $table->string('address')->nullable();
            $table->date('date_to')->nullable();
            $table->string('photo')->nullable();
            $table->string('description')->nullable();
            $table->string('tel')->nullable();
            $table->unsignedSmallInteger('type')->default(0);
            $table->json('options')->nullable();
            $table->timestamps();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        });

        Schema::create('job_service', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_id');
            $table->unsignedBigInteger('service_id');
            $table->integer('price')->nullable();
            $table->timestamps();

            $table->foreign('job_id')->references('id')->on('jobs')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('service_id')->references('id')->on('services')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_service');
        Schema::dropIfExists('jobs');
    }
};
