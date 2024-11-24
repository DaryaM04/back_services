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
        Schema::create('company_profile_service', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_profile_id');
            $table->integer('service_id')->index();
            $table->timestamps();
            $table->foreign('company_profile_id')->references('id')->on('company_profiles')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_profile_service');
    }
};
