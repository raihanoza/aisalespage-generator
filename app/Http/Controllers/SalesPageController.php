<?php

namespace App\Http\Controllers;

use App\Models\SalesPage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SalesPageController extends Controller
{
    
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $pages = SalesPage::forUser(auth()->id())
            ->when($search, function ($query, $search) {
                $query->where('product_name', 'like', "%{$search}%");
            })
            ->orderByDesc('created_at')
            ->select(['id', 'product_name', 'template_style', 'status', 'created_at', 'updated_at'])
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('History/Index', [
            'pages' => $pages,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name'      => 'required|string|max:255',
            'raw_input'         => 'required|array',
            'generated_content' => 'nullable|array',
            'template_style'    => 'required|in:minimalist,corporate,high-energy',
            'status'            => 'nullable|string|in:draft,generated',
        ]);

        $page = SalesPage::create([
            ...$validated,
            'user_id' => auth()->id(),
            'status'  => $validated['generated_content'] ? 'generated' : 'draft',
        ]);

        return response()->json([
            'success' => true,
            'page'    => $page,
        ], 201);
    }

    public function show(SalesPage $salesPage): Response
    {
        abort_if($salesPage->user_id !== auth()->id(), 403);

        return Inertia::render('Generator/Show', [
            'page' => $salesPage,
        ]);
    }

    public function update(Request $request, SalesPage $salesPage)
    {
        abort_if($salesPage->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'product_name'      => 'sometimes|string|max:255',
            'raw_input'         => 'sometimes|array',
            'generated_content' => 'sometimes|array',
            'template_style'    => 'sometimes|in:minimalist,corporate,high-energy',
        ]);

        $salesPage->update([
            ...$validated,
            'status' => 'generated',
        ]);

        return response()->json([
            'success' => true,
            'page'    => $salesPage->fresh(),
        ]);
    }

    public function destroy(SalesPage $salesPage)
    {
        abort_if($salesPage->user_id !== auth()->id(), 403);

        $salesPage->delete();

        return redirect('/history');
    }

    public function export(SalesPage $salesPage)
    {
        abort_if($salesPage->user_id !== auth()->id(), 403);

        $content  = $salesPage->generated_content;
        $template = $salesPage->template_style;
        $product  = $salesPage->product_name;

        if (!$content) {
            return response()->json(['error' => 'No generated content to export'], 422);
        }

        $html = view('exports.sales-page', [
            'content'  => $content,
            'template' => $template,
            'product'  => $product,
        ])->render();

        $filename = str($product)->slug() . '-sales-page.html';

        return response($html, 200, [
            'Content-Type'        => 'text/html',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }
}