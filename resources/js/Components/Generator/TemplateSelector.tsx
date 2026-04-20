import { cn } from "@/lib/utils";

const TEMPLATES = [
    {
        id: "minimalist",
        label: "Minimalist",
        emoji: "🎯",
        desc: "Clean, elegant, white space. Focused on clarity and trust.",
        colors: ["#FFFFFF", "#1a1a2e", "#6366f1"],
        badge: "Most Popular",
    },
    {
        id: "corporate",
        label: "Corporate",
        emoji: "🏢",
        desc: "Professional, authoritative. Enterprise-grade credibility.",
        colors: ["#1e3a5f", "#2563eb", "#dbeafe"],
        badge: "Best for B2B",
    },
    {
        id: "high-energy",
        label: "High-Energy",
        emoji: "⚡",
        desc: "Bold, dynamic, urgency-driven. Maximum conversion focus.",
        colors: ["#0f0f0f", "#ff6b35", "#ffd700"],
        badge: "Highest CRO",
    },
];

export default function TemplateSelector({ value, onChange }: any) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-white/70">
                Design Template
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TEMPLATES.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => onChange(t.id)}
                        className={cn(
                            "relative text-left p-4 rounded-xl border transition-all duration-200",
                            value === t.id
                                ? "border-violet-500/60 bg-violet-50 dark:bg-violet-500/10 shadow-lg shadow-violet-500/10"
                                : "border-gray-200 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.03] hover:border-gray-300 dark:hover:border-white/[0.14] hover:bg-gray-100 dark:hover:bg-white/[0.05]",
                        )}
                    >
                        {t.badge && (
                            <span className="absolute top-2 right-2 text-[9px] font-bold text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-500/20 px-1.5 py-0.5 rounded-full">
                                {t.badge}
                            </span>
                        )}

                        {}
                        <div className="flex gap-1.5 mb-3">
                            {t.colors.map((color, i) => (
                                <div
                                    key={i}
                                    className="w-5 h-5 rounded-md border border-gray-300 dark:border-white/10 shadow-sm"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-lg">{t.emoji}</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {t.label}
                            </span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-white/40 leading-relaxed">
                            {t.desc}
                        </p>

                        {}
                        {value === t.id && (
                            <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-violet-600 dark:bg-violet-500 flex items-center justify-center">
                                <svg
                                    className="w-2.5 h-2.5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
