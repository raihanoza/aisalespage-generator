import { useState } from "react";
import MinimalistTemplate from "./MinimalistTemplate";
import CorporateTemplate from "./CorporateTemplate";
import HighEnergyTemplate from "./HighEnergyTemplate";
import {
    Download,
    Eye,
    EyeOff,
    Monitor,
    Smartphone,
    Tablet,
} from "lucide-react";

export default function LivePreview({
    content,
    productInput,
    template,
    onRegenerated,
    onExport,
}: any) {
    const [showRegenButtons, setShowRegenButtons] = useState(true);
    const [viewport, setViewport] = useState("desktop");

    const templatesPattern: Record<string, any> = {
        minimalist: MinimalistTemplate,
        corporate: CorporateTemplate,
        "high-energy": HighEnergyTemplate,
    };

    const TemplateComponent = templatesPattern[template] || MinimalistTemplate;

    return (
        <div className="flex flex-col h-full">
            {}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-[#0D0D14] border-b border-gray-200 dark:border-white/[0.06] flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-gray-600 dark:text-white/60 font-medium whitespace-nowrap">
                        Live Preview
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-white/30 ml-2 px-2 py-0.5 rounded-full bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none capitalize hidden sm:inline-block">
                        {template?.replace("-", " ")}
                    </span>
                </div>

                {}
                <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.06] rounded-lg p-1">
                    <button
                        onClick={() => setViewport("desktop")}
                        className={`p-1.5 rounded-md transition-all ${
                            viewport === "desktop"
                                ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white shadow-sm"
                                : "text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/70"
                        }`}
                        title="Desktop View"
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewport("tablet")}
                        className={`p-1.5 rounded-md transition-all ${
                            viewport === "tablet"
                                ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white shadow-sm"
                                : "text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/70"
                        }`}
                        title="Tablet View"
                    >
                        <Tablet className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewport("mobile")}
                        className={`p-1.5 rounded-md transition-all ${
                            viewport === "mobile"
                                ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white shadow-sm"
                                : "text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/70"
                        }`}
                        title="Mobile View"
                    >
                        <Smartphone className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowRegenButtons(!showRegenButtons)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/90 hover:bg-gray-200 dark:hover:bg-white/[0.05] transition-all"
                        title={
                            showRegenButtons
                                ? "Hide regenerate buttons"
                                : "Show regenerate buttons"
                        }
                    >
                        {showRegenButtons ? (
                            <EyeOff className="w-3 h-3" />
                        ) : (
                            <Eye className="w-3 h-3" />
                        )}
                        {showRegenButtons ? "Hide" : "Show"} Controls
                    </button>
                    <button
                        onClick={onExport}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-500/15 border border-violet-200 dark:border-violet-500/20 hover:bg-violet-200 dark:hover:bg-violet-500/25 transition-all"
                    >
                        <Download className="w-3 h-3" />
                        Export HTML
                    </button>
                </div>
            </div>

            {}
            <div className="flex-1 overflow-auto bg-gray-100 dark:bg-black/50 py-0 sm:py-6 flex justify-center">
                <div
                    id="template-export-container"
                    className={`bg-white w-full h-full shadow-2xl transition-all duration-300 ease-in-out origin-top flex flex-col ${
                        viewport === "desktop"
                            ? "max-w-full sm:rounded-lg overflow-hidden border border-gray-200 dark:border-white/10"
                            : viewport === "tablet"
                              ? "max-w-[768px] sm:rounded-xl overflow-hidden border-4 border-gray-300 dark:border-white/10"
                              : "max-w-[375px] sm:rounded-[2.5rem] overflow-hidden border-[8px] border-gray-800 dark:border-white/20"
                    }`}
                >
                    {}
                    <div className="flex-1 overflow-auto bg-white custom-scrollbar w-full h-full relative">
                        <TemplateComponent
                            content={content}
                            productInput={productInput}
                            onRegenerated={onRegenerated}
                            showRegenButtons={showRegenButtons}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
