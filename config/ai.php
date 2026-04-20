<?php

return [
    /*
    |--------------------------------------------------------------------------
    | AI Provider Configuration
    |--------------------------------------------------------------------------
    |
    | Supported providers: "openai", "gemini"
    |
    */

    'provider' => env('AI_PROVIDER', 'gemini'),

    'model' => env('AI_MODEL', 'gemini-2.5-flash'),

    'api_key' => env('AI_PROVIDER', 'openai') === 'gemini'
        ? env('GEMINI_API_KEY')
        : env('OPENAI_API_KEY'),
];