import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Sparkles,
    History,
    TrendingUp,
    ArrowRight,
    Zap,
    Star,
} from "lucide-react";

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="max-w-5xl mx-auto space-y-8">
                {}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 via-indigo-100 to-white dark:from-violet-900/40 dark:via-indigo-900/30 dark:to-[#0D0D14] border border-black/5 dark:border-white/[0.08] p-8">
                    {}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200/50 dark:bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-20 w-32 h-32 bg-indigo-200/50 dark:bg-indigo-500/10 rounded-full blur-2xl translate-y-1/2" />

                    <div className="relative">
                        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400/70 text-xs font-medium tracking-widest uppercase mb-3">
                            <Zap className="w-3 h-3" />
                            AI-Powered Sales Engine
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Welcome back, {auth?.user?.name?.split(" ")[0]} 👋
                        </h1>
                        <p className="text-gray-600 dark:text-white/50 text-sm mb-6 max-w-md">
                            Generate professional, high-converting sales pages
                            in seconds with the power of AI.
                        </p>
                        <Link
                            href="/generator"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5"
                        >
                            <Sparkles className="w-4 h-4" />
                            Create New Sales Page
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            icon: Sparkles,
                            color: "violet",
                            title: "AI Generator",
                            desc: "Create a new sales page from your product details",
                            href: "/generator",
                            cta: "Start Creating",
                        },
                        {
                            icon: History,
                            color: "indigo",
                            title: "My Pages",
                            desc: "View, edit and manage your saved sales pages",
                            href: "/history",
                            cta: "View All",
                        },
                        {
                            icon: TrendingUp,
                            color: "sky",
                            title: "Templates",
                            desc: "Choose from Minimalist, Corporate, or High-Energy",
                            href: "/generator",
                            cta: "Explore",
                        },
                    ].map(({ icon: Icon, color, title, desc, href, cta }) => (
                        <Link
                            key={title}
                            href={href}
                            className="group flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06] hover:border-black/10 dark:hover:border-white/[0.12] hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-all duration-200 shadow-sm dark:shadow-none"
                        >
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}-100 dark:bg-${color}-500/15 border border-${color}-200 dark:border-${color}-500/20`}
                            >
                                <Icon
                                    className={`w-5 h-5 text-${color}-600 dark:text-${color}-400`}
                                />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                    {title}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">
                                    {desc}
                                </p>
                            </div>
                            <div
                                className={`flex items-center gap-1 text-xs text-${color}-600 dark:text-${color}-400 font-medium mt-auto`}
                            >
                                {cta}
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                {}
                <div className="rounded-xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.06] p-6 shadow-sm dark:shadow-none">
                    <h2 className="text-sm font-semibold text-gray-500 dark:text-white/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Star className="w-3.5 h-3.5" />
                        What you can do
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            "✍️ AI Copywriting",
                            "🎨 3 Design Templates",
                            "🔄 Section Regeneration",
                            "📦 HTML Export",
                            "💾 Save & Manage",
                            "🎯 CTA Optimization",
                            "💬 Testimonial Generator",
                            "📊 FAQ Builder",
                        ].map((feat) => (
                            <div
                                key={feat}
                                className="flex items-center gap-2 text-xs text-gray-600 dark:text-white/50 py-2 px-3 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-black/5 dark:border-transparent"
                            >
                                {feat}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
