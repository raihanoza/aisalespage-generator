<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SalesPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_name',
        'raw_input',
        'generated_content',
        'template_style',
        'status',
    ];

    protected $casts = [
        'raw_input'         => 'array',
        'generated_content' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeGenerated($query)
    {
        return $query->where('status', 'generated');
    }

    public function getPreviewUrlAttribute(): string
    {
        return route('sales-pages.show', $this->id);
    }

    public function getExportUrlAttribute(): string
    {
        return route('sales-pages.export', $this->id);
    }
}