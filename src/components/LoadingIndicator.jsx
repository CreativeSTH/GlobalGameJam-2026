export default function LoadingIndicator({ progress, isLoading }) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                <div
                    className="h-full bg-white transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="font-mono text-sm opacity-60">LOADING ASSETS {Math.round(progress)}%</p>
        </div>
    );
}
