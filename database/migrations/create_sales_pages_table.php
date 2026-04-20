<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sales_pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('product_name');
            $table->json('raw_input');        // Stores the original form input
            $table->json('generated_content')->nullable(); // Stores AI-generated content
            $table->string('template_style')->default('minimalist'); // minimalist | corporate | high-energy
            $table->string('status')->default('draft'); // draft | generated | published
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sales_pages');
    }
};