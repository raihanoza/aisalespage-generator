export default function LoadingState() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="relative">
                <div className="w-24 h-24 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                <p className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-blue-500">
                    Generating...
                </p>
            </div>
        </div>
    );
}
