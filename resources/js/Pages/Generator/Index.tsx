import { useState } from "react";
import { Head } from "@inertiajs/react";
import { useMutation } from "@tanstack/react-query";
import AppLayout from "@/Layouts/AppLayout";
import ProductForm from "@/Components/Generator/ProductForm";
import LoadingState from "@/Components/Generator/LoadingState";
import LivePreview from "@/Components/Preview/LivePreview";
import { AlertCircle, Sparkles, Save } from "lucide-react";

export default function GeneratorIndex() {
    const [generatedContent, setGeneratedContent] = useState<any>(null);
    const [productInput, setProductInput] = useState<any>(null);
    const [currentTemplate, setCurrentTemplate] = useState("minimalist");

    const generateMutation = useMutation({
        mutationFn: async (formData) => {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-XSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const data = await res.json();
            if (!data.success)
                throw new Error(data.error || "Generation failed");
            return data.data;
        },
        onSuccess: (data) => {
            setGeneratedContent(data);
        },
    });

    const saveMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/sales-pages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-XSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify({
                    product_name: productInput.product_name,
                    raw_input: productInput,
                    generated_content: generatedContent,
                    template_style: currentTemplate,
                    status: "generated",
                }),
                credentials: "include",
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.error || "Save failed");
            return data;
        },
    });

    const handleGenerate = (formData: any) => {
        setProductInput(formData);
        setCurrentTemplate(formData.template_style);
        generateMutation.mutate(formData);
    };

    const handleSectionRegenerated = (section: string, newData: any) => {

        const updates =
            typeof newData === "object" && !Array.isArray(newData)
                ? newData
                : { [section]: newData };

        setGeneratedContent((prev: any) => ({
            ...prev,
            ...updates,
        }));
    };

    const handleExport = () => {
        const product = productInput?.product_name || "Sales Page";

        const previewElement = document.getElementById(
            "template-export-container",
        );

        if (!previewElement) {
            alert("No preview content found to export.");
            return;
        }

        const clone = previewElement.cloneNode(true) as HTMLElement;
        const regenButtons = clone.querySelectorAll("button");
        regenButtons.forEach((btn) => btn.remove()); 

        const previewHtml = clone.innerHTML;

        const html = `<!DOCTYPE html>
<html lang="en" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${generatedContent?.seo?.meta_title || product}</title>
    <meta name="description" content="${generatedContent?.seo?.meta_description || ""}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
        }
    </script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { margin: 0; font-family: ui-sans-serif, system-ui, sans-serif; }
    </style>
</head>
<body class="bg-white text-gray-900">
    ${previewHtml}
</body>
</html>`;

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${product.toLowerCase().replace(/\s+/g, "-")}-sales-page.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <AppLayout title="AI Generator">
            <Head title="Generator" />

            <div className="max-w-7xl mx-auto">
                {!generatedContent ? (
                    
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400/70 text-xs font-medium tracking-widest uppercase mb-3">
                                <Sparkles className="w-3 h-3" />
                                AI-Powered Generator
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Create Your Sales Page
                            </h1>
                            <p className="text-gray-500 dark:text-white/50 text-sm">
                                Fill in your product details and let AI craft a
                                professional, high-converting sales page.
                            </p>
                        </div>

                        {generateMutation.isError && (
                            <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                                <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">
                                        Generation Failed
                                    </p>
                                    <p className="text-xs text-red-600 dark:text-red-400/80">
                                        {generateMutation.error?.message ||
                                            "Something went wrong. Please try again."}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-8 shadow-sm dark:shadow-none">
                            {generateMutation.isPending && <LoadingState />}
                            <div
                                className={
                                    generateMutation.isPending
                                        ? "hidden"
                                        : "block"
                                }
                            >
                                <ProductForm
                                    onGenerate={handleGenerate}
                                    isLoading={generateMutation.isPending}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    
                    <div className="space-y-4">
                        {}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                    {productInput?.product_name}
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-white/40">
                                    Generated sales page •{" "}
                                    {new Date().toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        setGeneratedContent(null);
                                        setProductInput(null);
                                    }}
                                    className="px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] transition-all"
                                >
                                    ← Back to Form
                                </button>
                                <button
                                    onClick={() => saveMutation.mutate()}
                                    disabled={saveMutation.isPending}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/25 transition-all disabled:opacity-50"
                                >
                                    <Save className="w-3.5 h-3.5" />
                                    {saveMutation.isPending
                                        ? "Saving..."
                                        : saveMutation.isSuccess
                                          ? "Saved ✓"
                                          : "Save Page"}
                                </button>
                            </div>
                        </div>

                        {}
                        <div
                            id="sales-page-preview-content"
                            className="rounded-2xl overflow-hidden bg-white dark:bg-[#1a1a2e]/50 border border-gray-200 dark:border-white/[0.08] shadow-sm dark:shadow-2xl"
                            style={{ height: "calc(100vh - 240px)" }}
                        >
                            <LivePreview
                                content={generatedContent}
                                productInput={productInput}
                                template={currentTemplate}
                                onRegenerated={handleSectionRegenerated}
                                onExport={handleExport}
                            />
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

function getCsrfToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "";
}
