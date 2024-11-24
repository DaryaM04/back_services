<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('city_id')->nullable();
            $table->integer('is_verified')->default(0);
            $table->string('photo')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('name')->storedAs('CONCAT(first_name, " ", last_name)');
            $table->boolean('has_brigade')->default(false);
            $table->json('passport_data')->nullable();
            $table->json('options')->nullable();
            $table->timestamps();
            $table->foreign('city_id')->references('id')->on('cities')->nullOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
