import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import LivePreview from "@/Components/Preview/LivePreview";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

export default function GeneratorShow({ page }: any) {
    const [content, setContent] = useState(page.generated_content);
    const [hasChanges, setHasChanges] = useState(false);

    const handleSectionRegenerated = (section: string, newData: any) => {
        
        const updates =
            typeof newData === "object" && !Array.isArray(newData)
                ? newData
                : { [section]: newData };

        setContent((prev: any) => ({
            ...prev,
            ...updates,
        }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        router.put(
            `/sales-pages/${page.id}`,
            {
                generated_content: content,
            },
            {
                preserveScroll: true,
                onSuccess: () => setHasChanges(false),
            },
        );
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this page?")) {
            router.delete(`/sales-pages/${page.id}`);
        }
    };

    const handleExport = () => {
        window.location.href = `/sales-pages/${page.id}/export`;
    };

    return (
        <AppLayout title={page.product_name}>
            <Head title={page.product_name} />

            <div className="max-w-7xl mx-auto space-y-4">
                {}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.visit("/history")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.05] border border-white/[0.08] transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-white">
                                {page.product_name}
                            </h1>
                            <p className="text-xs text-white/40 mt-0.5">
                                Last updated:{" "}
                                {new Date(page.updated_at).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {hasChanges && (
                            <span className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                Unsaved changes
                            </span>
                        )}
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/30 transition-all"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!hasChanges}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-3.5 h-3.5" />
                            {hasChanges ? "Save Changes" : "Saved"}
                        </button>
                    </div>
                </div>

                {}
                <div
                    className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl"
                    style={{ height: "calc(100vh - 220px)" }}
                >
                    <LivePreview
                        content={content}
                        productInput={page.raw_input}
                        template={page.template_style}
                        onRegenerated={handleSectionRegenerated}
                        onExport={handleExport}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
