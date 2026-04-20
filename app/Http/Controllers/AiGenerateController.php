<?php

namespace App\Http\Controllers;

use App\Services\AiService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Exception;

class AiGenerateController extends Controller
{
    public function __construct(private AiService $aiService) {}

    public function generate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_name'   => 'required|string|max:255',
            'description'    => 'required|string|max:2000',
            'key_features'   => 'required|array|min:1|max:10',
            'key_features.*' => 'string|max:200',
            'target_audience'=> 'required|string|max:500',
            'price'          => 'required|string|max:100',
            'usps'           => 'required|array|min:1|max:8',
            'usps.*'         => 'string|max:200',
            'template_style' => 'required|in:minimalist,corporate,high-energy',
        ]);

        try {
            $generated = $this->aiService->generateSalesPage($validated);

            return response()->json([
                'success' => true,
                'data'    => $generated,
            ]);
        } catch (Exception $e) {
            report($e);

            return response()->json([
                'success' => false,
                'error'   => 'AI generation failed. Please try again.',
                'details' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    public function regenerateSection(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'section'          => 'required|string|in:headline,sub_headline,hero_description,benefits,features,social_proof,cta,faq,closing_section',
            'product_input'    => 'required|array',
            'existing_content' => 'required|array',
        ]);

        try {
            $generated = $this->aiService->regenerateSection(
                $validated['product_input'],
                $validated['existing_content'],
                $validated['section']
            );

            return response()->json([
                'success' => true,
                'section' => $validated['section'],
                'data'    => $generated,
            ]);
        } catch (Exception $e) {
            report($e);

            return response()->json([
                'success' => false,
                'error'   => 'Section regeneration failed. Please try again.',
                'details' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }
}