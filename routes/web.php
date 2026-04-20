<?php

use App\Http\Controllers\SalesPageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::post('/api/generate', [\App\Http\Controllers\AiGenerateController::class, 'generate'])
        ->name('api.generate');
    Route::post('/api/generate/section', [\App\Http\Controllers\AiGenerateController::class, 'regenerateSection'])
        ->name('api.generate.section');

    Route::get('/generator', function () {
        return Inertia::render('Generator/Index');
    })->name('generator');

    Route::resource('sales-pages', SalesPageController::class)
        ->except(['create', 'edit']);

    Route::get('/sales-pages/{salesPage}/export', [SalesPageController::class, 'export'])
        ->name('sales-pages.export');

    Route::get('/history', [SalesPageController::class, 'index'])
        ->name('history');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';