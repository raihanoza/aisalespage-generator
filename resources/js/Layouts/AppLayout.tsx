import { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
    Sparkles,
    LayoutDashboard,
    History,
    LogOut,
    Menu,
    X,
    ChevronRight,
    User,
    Settings,
    Zap,
    Moon,
    Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/generator", label: "Generator", icon: Sparkles },
    { href: "/history", label: "My Pages", icon: History },
];

export default function AppLayout({ children, title }: any) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentPath = usePage().url;

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            return (
                savedTheme === "dark" ||
                (!savedTheme &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            );
        }
        return false;
    });

    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleLogout = () => {
        router.post("/logout");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F] text-gray-900 dark:text-white flex transition-colors duration-200">
            {}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-30 w-64 flex flex-col",
                    "bg-white dark:bg-[#0D0D14] border-r border-gray-200 dark:border-white/[0.06]",
                    "transition-all duration-300 ease-out",
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0",
                )}
            >
                {}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                            SalesForge
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-white/40 tracking-widest uppercase">
                            AI Generator
                        </p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="ml-auto lg:hidden text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const active = currentPath.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                                    active
                                        ? "bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/20"
                                        : "text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white/90 hover:bg-gray-100 dark:hover:bg-white/[0.04]",
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "w-4 h-4",
                                        active ? "text-violet-400" : "",
                                    )}
                                />
                                {label}
                                {active && (
                                    <ChevronRight className="w-3 h-3 ml-auto text-violet-400/60" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {}
                <div className="px-3 py-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-100 dark:bg-white/[0.03] mb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                            {auth?.user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-700 dark:text-white/80 truncate">
                                {auth?.user?.name}
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-white/40 truncate">
                                {auth?.user?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04] lg:hidden transition-all duration-150 mb-2"
                    >
                        {darkMode ? (
                            <Sun className="w-4 h-4" />
                        ) : (
                            <Moon className="w-4 h-4" />
                        )}
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 dark:text-white/40 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-150"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign out
                    </button>
                </div>
            </aside>

            {}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen bg-[#FAFAFA] dark:bg-[#050508] transition-colors duration-200">
                {}
                <header className="sticky top-0 z-10 flex items-center justify-between px-6 h-14 border-b border-black/[0.06] dark:border-white/[0.06] bg-white/80 dark:bg-[#0A0A0F]/80 backdrop-blur-xl transition-colors duration-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        {title && (
                            <h1 className="text-sm font-semibold text-gray-700 dark:text-white/70">
                                {title}
                            </h1>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/50 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {darkMode ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                        </button>

                        <Link
                            href="/generator"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-500/15 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-medium hover:bg-violet-200 dark:hover:bg-violet-500/25 transition-all"
                        >
                            <Sparkles className="w-3 h-3" />
                            New Page
                        </Link>
                    </div>
                </header>

                {}
                <main className="flex-1 p-6 relative">
                    <div className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#050508] -z-10" />
                    {children}
                </main>
            </div>
        </div>
    );
}
