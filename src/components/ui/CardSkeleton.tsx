export default function CardSkeleton() {
    return (
        <div key="1" className="max-w-sm bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 dark:bg-gray-900 dark:border-gray-700 my-4">
            <div className="flex flex-col items-center p-5 space-y-4">
                <div className="w-[300px] h-[300px] bg-gray-700 rounded-lg shimmer"></div>  
                <div className="w-3/4 h-6 bg-gray-700 rounded-md shimmer"></div>
            </div>
        </div>
    );
}
