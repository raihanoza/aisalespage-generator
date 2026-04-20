import { useState } from "react";
import { Plus, X, Sparkles, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import TemplateSelector from "./TemplateSelector";

const defaultForm = {
    product_name: "",
    description: "",
    key_features: [""],
    target_audience: "",
    price: "",
    usps: [""],
    template_style: "minimalist",
};

export default function ProductForm({ onGenerate, isLoading }: any) {
    const [form, setForm] = useState(defaultForm);

    const setField = (field: string, value: any) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const updateListItem = (field: any, idx: number, val: any) => {
        const updated = [...(form as any)[field]];
        updated[idx] = val;
        setField(field, updated);
    };

    const addListItem = (field: any) => setField(field, [...(form as any)[field], ""]);

    const removeListItem = (field: any, idx: number) => {
        const updated =  (form as any)[field].filter((_: any, i: number) => i !== idx);
        setField(field, updated.length ? updated : [""]);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const cleaned = {
            ...form,
            key_features: form.key_features.filter(Boolean),
            usps: form.usps.filter(Boolean),
        };
        onGenerate(cleaned);
    };

    const isValid =
        form.product_name.trim() &&
        form.description.trim() &&
        form.key_features.some(Boolean) &&
        form.target_audience.trim() &&
        form.price.trim() &&
        form.usps.some(Boolean);

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] p-6 lg:p-8 rounded-2xl shadow-sm dark:shadow-none"
        >
            {}
            <FormField
                label="Product Name"
                required
                hint="Keep it concise and memorable"
            >
                <input
                    type="text"
                    value={form.product_name}
                    onChange={(e) => setField("product_name", e.target.value)}
                    placeholder="e.g. ProTrack Analytics Suite"
                    className={inputClass}
                    required
                />
            </FormField>

            {}
            <FormField
                label="Product Description"
                required
                hint="What does it do? What problem does it solve?"
            >
                <textarea
                    value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                    placeholder="Describe your product in detail — what it is, what it does, and the core problem it solves for your customers..."
                    rows={4}
                    className={cn(inputClass, "resize-none")}
                    required
                />
            </FormField>

            {}
            <FormField
                label="Key Features"
                required
                hint="List your main product features (up to 10)"
            >
                <div className="space-y-2">
                    {form.key_features.map((feat, i) => (
                        <div key={i} className="flex gap-2">
                            <div className="flex items-center justify-center w-6 h-9 text-[11px] text-gray-400 dark:text-white/30 font-mono shrink-0 mt-0.5">
                                {i + 1}
                            </div>
                            <input
                                type="text"
                                value={feat}
                                onChange={(e) =>
                                    updateListItem(
                                        "key_features",
                                        i,
                                        e.target.value,
                                    )
                                }
                                placeholder={`Feature ${i + 1}...`}
                                className={cn(inputClass, "flex-1")}
                            />
                            {form.key_features.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeListItem("key_features", i)
                                    }
                                    className="text-gray-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 transition-colors mt-0.5"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                    {form.key_features.length < 10 && (
                        <button
                            type="button"
                            onClick={() => addListItem("key_features")}
                            className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors mt-1"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Add Feature
                        </button>
                    )}
                </div>
            </FormField>

            {}
            <FormField
                label="Target Audience"
                required
                hint="Who is your ideal customer?"
            >
                <input
                    type="text"
                    value={form.target_audience}
                    onChange={(e) =>
                        setField("target_audience", e.target.value)
                    }
                    placeholder="e.g. SaaS founders and marketing teams at B2B startups"
                    className={inputClass}
                    required
                />
            </FormField>

            {}
            <FormField
                label="Price / Pricing"
                required
                hint="Include billing period if applicable"
            >
                <input
                    type="text"
                    value={form.price}
                    onChange={(e) => setField("price", e.target.value)}
                    placeholder="e.g. $97/month or $297 one-time"
                    className={inputClass}
                    required
                />
            </FormField>

            {}
            <FormField
                label="Unique Selling Points (USP)"
                required
                hint="What makes you different from competitors?"
            >
                <div className="space-y-2">
                    {form.usps.map((usp, i) => (
                        <div key={i} className="flex gap-2">
                            <div className="flex items-center justify-center w-6 h-9 text-[11px] text-gray-400 dark:text-white/30 font-mono shrink-0 mt-0.5">
                                {i + 1}
                            </div>
                            <input
                                type="text"
                                value={usp}
                                onChange={(e) =>
                                    updateListItem("usps", i, e.target.value)
                                }
                                placeholder={`USP ${i + 1}...`}
                                className={cn(inputClass, "flex-1")}
                            />
                            {form.usps.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeListItem("usps", i)}
                                    className="text-gray-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 transition-colors mt-0.5"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                    {form.usps.length < 8 && (
                        <button
                            type="button"
                            onClick={() => addListItem("usps")}
                            className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors mt-1"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Add USP
                        </button>
                    )}
                </div>
            </FormField>

            {}
            <TemplateSelector
                value={form.template_style}
                onChange={(v: any) => setField("template_style", v)}
            />

            {}
            <button
                type="submit"
                disabled={!isValid || isLoading}
                className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 mt-6",
                    isValid && !isLoading
                        ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5"
                        : "bg-gray-100 dark:bg-white/[0.05] text-gray-400 dark:text-white/30 cursor-not-allowed",
                )}
            >
                <Sparkles className="w-4 h-4" />
                {isLoading ? "Generating..." : "Generate Sales Page with AI"}
            </button>
        </form>
    );
}

function FormField({ label, required, hint, children }: any) {
    return (
        <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-white/80">
                    {label}
                    {required && (
                        <span className="text-violet-600 dark:text-violet-400 ml-1">
                            *
                        </span>
                    )}
                </label>
                {hint && (
                    <div className="group relative">
                        <Info className="w-3.5 h-3.5 text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 cursor-help transition-colors" />
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-56 p-2.5 rounded-lg bg-gray-900 border border-gray-800 dark:bg-[#1a1a2e] dark:border-white/10 text-xs text-gray-300 dark:text-white/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-xl">
                            {hint}
                        </div>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
}

const inputClass = `
    w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-3.5 py-2.5
    text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25
    focus:outline-none focus:border-violet-500/50 dark:focus:border-violet-500/50 focus:bg-violet-50/50 dark:focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/20
    transition-all duration-150
`.trim();
