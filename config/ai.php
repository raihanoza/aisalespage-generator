<?php

return [
    /*
    |--------------------------------------------------------------------------
    | AI Provider Configuration
    |--------------------------------------------------------------------------
    |
    | Supported providers: "openai", "gemini", "groq"
    |
    */

    'provider' => env('AI_PROVIDER', 'gemini'),

    'model' => env('AI_MODEL', 'gemini-2.5-flash'),

    'api_key' => match(env('AI_PROVIDER', 'gemini')) {
        'gemini' => env('GEMINI_API_KEY'),
        'groq' => env('GROQ_API_KEY'),
        default => env('GEMINI_API_KEY'),
    },
];