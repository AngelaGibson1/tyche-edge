// components/EnvironmentInfo.tsx
'use client';

import { env } from '@/env.mjs';

export default function EnvironmentInfo() {
  // Safe to use in the browser - only NEXT_PUBLIC_ variables are accessible
  const apiBaseUrl = env.NEXT_PUBLIC_API_URL;
  const appEnv = env.NEXT_PUBLIC_APP_ENV;

  // This would cause a TypeScript error if uncommented!
  // const secretKey = env.SECRET_KEY; // ❌ Cannot access server-side variables

  const getBadgeColor = () => {
    switch (appEnv) {
      case 'production': return 'bg-green-100 text-green-800';
      case 'preview': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border max-w-sm">
      <div className="flex items-center space-x-2 mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor()}`}>
          {appEnv.toUpperCase()}
        </span>
        <span className="text-sm text-gray-600">Environment</span>
      </div>
      
      <div className="text-xs text-gray-500">
        API: {apiBaseUrl}
      </div>
      
      {appEnv === 'development' && (
        <div className="mt-2 text-xs text-blue-600">
          🔧 Development mode active
        </div>
      )}
    </div>
  );
}
