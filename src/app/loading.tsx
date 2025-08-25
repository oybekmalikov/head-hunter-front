"use client"
export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center text-white text-3xl font-semibold">
            <div className="bg-white text-blue-500 px-4 py-3 rounded-xl font-bold mr-4 animate-pulse">
              hh
            </div>
            <span className="animate-fade-in">headhunter</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 border-r-yellow-400 rounded-full animate-spin"></div>
            <div className="absolute inset-3 bg-white/10 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-2">Loading...</h2>
          <p className="text-white/70 text-lg">Jobs are loading...</p>
        </div>

        <div className="flex space-x-2 justify-center mb-8">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>

        <div className="text-white/60 text-sm max-w-md mx-auto">
          <div className="animate-fade-in-out">
            <p>Last jobs are loading...</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 animate-loading-bar"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 60%; }
          100% { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out infinite;
        }
        
        .animate-loading-bar {
          animation: loading-bar 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export function JobListSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="text-xl font-semibold text-gray-700 mb-6">Jobs are loading...</div>
      
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SearchLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600">Search results are loading...</p>
      </div>
    </div>
  )
}

export function ProfileLoading() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      
      <div className="mt-6 flex space-x-2">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );	
}