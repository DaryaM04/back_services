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
        Schema::create('review_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_ru');
            $table->string('name_he');
            $table->string('name_ar');
            $table->boolean('active')->default(true);
            $table->json('profile_type');
            $table->enum('type', ['common', 'service'])->default('common');
            $table->timestamps();
        });

        Schema::create('review_type_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('review_type_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->boolean('active')->default(true);
            $table->string('value');
            $table->string('value_ru');
            $table->string('value_he');
            $table->string('value_ar');
            $table->timestamps();
        });

        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('active');
            $table->foreignId('review_type_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('review_type_value_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->text('comment');
            $table->morphs('reviewable');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('review_type_values');
        Schema::dropIfExists('review_types');
    }
};
