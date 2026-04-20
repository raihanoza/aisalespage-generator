<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class AiService
{
    private string $provider;
    private string $model;
    private string $apiKey;

    public function __construct()
    {
        $this->provider = config('ai.provider', 'gemini');
        $this->model    = config('ai.model', 'gemini-2.5-flash');
        $this->apiKey   = config('ai.api_key', '');
    }

    // ─── Full Page Generation ────────────────────────────────────
    public function generateSalesPage(array $input): array
    {
        $prompt = $this->buildFullPagePrompt($input);
        $raw    = $this->callLLM($prompt);

        return $this->parseJsonResponse($raw);
    }

    // ─── Section Regeneration ────────────────────────────────────
    public function regenerateSection(array $input, array $existingContent, string $section): array
    {
        $prompt = $this->buildSectionPrompt($input, $existingContent, $section);
        $raw    = $this->callLLM($prompt);

        return $this->parseJsonResponse($raw);
    }

    // ─── Prompt Builders ─────────────────────────────────────────
    private function buildFullPagePrompt(array $input): string
    {
        $features    = implode(', ', $input['key_features'] ?? []);
        $usps        = implode(', ', $input['usps'] ?? []);
        $templateMap = [
            'minimalist'  => 'clean, elegant, minimal — focused on clarity and trust',
            'corporate'   => 'professional, authoritative, trust-building — enterprise feel',
            'high-energy' => 'bold, dynamic, urgency-driven — high-conversion, punchy copywriting',
        ];
        $templateDesc = $templateMap[$input['template_style'] ?? 'minimalist'] ?? $templateMap['minimalist'];

        return <<<PROMPT
You are an elite sales copywriter and conversion rate optimization expert. Your task is to create a high-converting sales page for the following product.

**Product Details:**
- Name: {$input['product_name']}
- Description: {$input['description']}
- Key Features: {$features}
- Target Audience: {$input['target_audience']}
- Price: {$input['price']}
- Unique Selling Points: {$usps}

**Tone/Style:** {$templateDesc}

Generate a complete, professional sales page. Return ONLY valid JSON (no markdown, no backticks, no explanation) in this EXACT structure:

{
  "headline": "Main attention-grabbing headline (max 12 words, powerful and benefit-driven)",
  "sub_headline": "Supporting sub-headline that clarifies the value (1-2 sentences)",
  "hero_description": "Hero section paragraph — vivid, emotional, draws the reader in (2-3 sentences)",
  "benefits": [
    {
      "icon": "emoji icon (single emoji)",
      "title": "Benefit title (3-5 words)",
      "description": "Benefit description (1-2 sentences)"
    }
  ],
  "features": [
    {
      "title": "Feature name",
      "description": "What it does and why it matters (1-2 sentences)"
    }
  ],
  "social_proof": [
    {
      "name": "Fictional but realistic customer name",
      "role": "Job title or descriptor",
      "company": "Company or context",
      "quote": "Specific, detailed testimonial (2-3 sentences, results-focused)",
      "rating": 5
    }
  ],
  "pricing": {
    "price": "{$input['price']}",
    "billing_period": "one-time / per month / per year",
    "tagline": "Value reinforcement tagline near the price",
    "includes": ["List of what's included"],
    "guarantee": "Money-back or satisfaction guarantee statement"
  },
  "cta": {
    "primary_text": "Primary CTA button text (action verb, benefit-focused)",
    "secondary_text": "Secondary CTA text (softer option)",
    "urgency": "Urgency/scarcity statement (optional, keep authentic)"
  },
  "faq": [
    {
      "question": "Common objection as a question",
      "answer": "Empathetic, reassuring answer (2-3 sentences)"
    }
  ],
  "closing_section": {
    "headline": "Closing CTA headline (reinforces transformation)",
    "body": "Final persuasive paragraph before the last CTA (2-3 sentences)",
    "cta_text": "Final CTA button text"
  },
  "seo": {
    "meta_title": "SEO-optimized page title",
    "meta_description": "SEO meta description (150-160 chars)"
  }
}

IMPORTANT STRICT RULES:
1. Generate exactly 4 benefits, 4-6 features, 3 testimonials, and 3-4 FAQ items. 
2. Make everything specific, compelling, and authentic to the product.
3. DO NOT include raw newlines/line breaks inside any JSON string values. All strings must be on a single line. Use \\n only if absolutely necessary.
PROMPT;
    }

    private function buildSectionPrompt(array $input, array $existing, string $section): string
    {
        $sectionSchemas = [
            'headline'        => '{"headline": "New headline"}',
            'sub_headline'    => '{"sub_headline": "New sub-headline"}',
            'hero_description'=> '{"hero_description": "New hero description"}',
            'benefits'        => '{"benefits": [{"icon":"emoji","title":"...","description":"..."}]}',
            'features'        => '{"features": [{"title":"...","description":"..."}]}',
            'social_proof'    => '{"social_proof": [{"name":"...","role":"...","company":"...","quote":"...","rating":5}]}',
            'cta'             => '{"cta": {"primary_text":"...","secondary_text":"...","urgency":"..."}}',
            'faq'             => '{"faq": [{"question":"...","answer":"..."}]}',
            'closing_section' => '{"closing_section": {"headline":"...","body":"...","cta_text":"..."}}',
        ];

        $schema  = $sectionSchemas[$section] ?? '{}';
        $current = json_encode($existing[$section] ?? '', JSON_PRETTY_PRINT);

        return <<<PROMPT
You are an elite sales copywriter. Regenerate ONLY the "{$section}" section for this product.

**Product:** {$input['product_name']}
**Description:** {$input['description']}
**Target Audience:** {$input['target_audience']}
**Template Style:** {$input['template_style']}

**Current version (improve upon this):**
{$current}

Return ONLY valid JSON matching this schema (no markdown, no backticks):
{$schema}

Make it more compelling, specific, and conversion-focused than the current version. Be creative and different.
PROMPT;
    }

    private function callLLM(string $prompt): string
    {
        return match ($this->provider) {
            'gemini' => $this->callGemini($prompt),
            'groq'   => $this->callGroq($prompt),
            default  => $this->callOpenAI($prompt),
        };
    }

    private function callGroq(string $prompt): string
    {
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$this->apiKey}",
            'Content-Type'  => 'application/json',
        ])->timeout(60)->post('https://api.groq.com/openai/v1/chat/completions', [
            'model'       => $this->model,
            'messages'    => [
                ['role' => 'system', 'content' => 'You are an expert sales copywriter. Always respond with valid JSON only. No markdown fences, no explanation, just pure JSON.'],
                ['role' => 'user',   'content' => $prompt],
            ],
            'temperature'      => 0.7,
            'max_tokens'       => 3000,
            'response_format'  => ['type' => 'json_object'],
        ]);

        if ($response->failed()) {
            throw new Exception('Groq API error: ' . $response->body());
        }

        return $response->json('choices.0.message.content', '{}');
    }

    private function callOpenAI(string $prompt): string
    {
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$this->apiKey}",
            'Content-Type'  => 'application/json',
        ])->timeout(60)->post('https://api.openai.com/v1/chat/completions', [
            'model'       => $this->model,
            'messages'    => [
                ['role' => 'system', 'content' => 'You are an expert sales copywriter. Always respond with valid JSON only. No markdown fences, no explanation, just pure JSON.'],
                ['role' => 'user',   'content' => $prompt],
            ],
            'temperature'      => 0.8,
            'max_tokens'       => 3000,
            'response_format'  => ['type' => 'json_object'],
        ]);

        if ($response->failed()) {
            throw new Exception('OpenAI API error: ' . $response->body());
        }

        return $response->json('choices.0.message.content', '{}');
    }

private function callGemini(string $prompt): string
    {
        $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}";

        $response = Http::timeout(60)->post($endpoint, [
            'contents' => [
                ['parts' => [['text' => $prompt]]],
            ],
            'generationConfig' => [
                'temperature'     => 0.8,
                'maxOutputTokens' => 8192,
                'responseMimeType'=> 'application/json',
            ],
        ]);

        if ($response->failed()) {
            throw new Exception('Gemini API error: ' . $response->body());
        }

        return $response->json('candidates.0.content.parts.0.text', '{}');
    }

    private function parseJsonResponse(string $raw): array
    {
        
        $cleaned = preg_replace('/^```(?:json)?\s*/m', '', $raw);
        $cleaned = preg_replace('/\s*```$/m', '', $cleaned);
        $cleaned = trim($cleaned);

        $decoded = json_decode($cleaned, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $errorMsg = json_last_error_msg();

            // Fix unescaped control characters before failing entirely
            $cleanedFixed = preg_replace('/[\x00-\x1F\x7F]/u', '', $cleaned);
            $decodedFixed = json_decode($cleanedFixed, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                $finalError = json_last_error_msg();
                Log::error('AI JSON parse error', ['raw' => $raw, 'first_error' => $errorMsg, 'final_error' => $finalError]);
                throw new Exception('Failed to parse AI response as JSON: ' . $finalError . ' (Original: ' . $errorMsg . ')');
            }
            
            $decoded = $decodedFixed;
        }

        if (!is_array($decoded)) {
            throw new Exception('Failed to parse AI response: Output is not a valid JSON object.');
        }

        return $decoded;
    }
}