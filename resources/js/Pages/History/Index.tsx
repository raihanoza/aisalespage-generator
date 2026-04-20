import { useState, useCallback } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link, router } from "@inertiajs/react";

function useDebounce(callback: Function, delay: number) {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    return useCallback(
        (...args: any[]) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            const newTimeoutId = setTimeout(() => {
                callback(...args);
            }, delay);
            setTimeoutId(newTimeoutId);
        },
        [callback, delay, timeoutId],
    );
}

export default function Index({ pages, filters }: any) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || "");
    const salesPages = pages?.data || [];

    const searchRequest = useCallback((value: string) => {
        router.get(
            "/history",
            { search: value },
            { preserveState: true, replace: true },
        );
    }, []);

    const debouncedSearch = useDebounce(searchRequest, 500);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e.target.value);
    };

    return (
        <AppLayout title="History">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                History
            </h1>
            <div className="mt-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by product name..."
                    className="w-full p-2 border border-gray-300 dark:border-white/10 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
                <div className="mt-6">
                    {salesPages.length > 0 ? (
                        salesPages.map((page: any) => (
                            <div
                                key={page.id}
                                className="p-4 mb-4 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl shadow-sm hover:shadow dark:shadow-none transition-shadow"
                            >
                                <Link href={`/sales-pages/${page.id}`}>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {page.product_name}
                                    </h2>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/70 capitalize">
                                            {page.template_style?.replace(
                                                "-",
                                                " ",
                                            )}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(
                                                page.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl">
                            <p className="text-gray-500 dark:text-gray-400">
                                No generated pages found.
                            </p>
                            <Link
                                href="/generator"
                                className="inline-block mt-4 text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 text-sm font-medium"
                            >
                                Generate your first page
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
