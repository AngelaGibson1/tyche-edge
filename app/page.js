export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <div 
        className="py-20 text-center"
        style={{ 
          background: 'linear-gradient(90deg, #22c55e, #eab308)',
          color: 'white' 
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Tyche-Edge
          </h1>
          <p className="text-xl mb-8">
            Your premier destination for data-driven sports betting insights
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              className="px-6 py-3 rounded-lg font-medium"
              style={{ backgroundColor: '#eab308', color: 'white' }}
            >
              View Predictions
            </button>
            <button 
              className="px-6 py-3 rounded-lg font-medium border-2"
              style={{ borderColor: 'white', color: 'white' }}
            >
              Join Community
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div 
            className="text-center p-4 rounded-lg"
            style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <div className="text-2xl font-bold" style={{ color: '#22c55e' }}>89.2%</div>
            <div className="text-sm text-gray-600">Model Accuracy</div>
          </div>
          
          <div 
            className="text-center p-4 rounded-lg"
            style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <div className="text-2xl font-bold" style={{ color: '#eab308' }}>+12.4%</div>
            <div className="text-sm text-gray-600">Average ROI</div>
          </div>
          
          <div 
            className="text-center p-4 rounded-lg"
            style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <div className="text-2xl font-bold text-gray-700">2,847</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          
          <div 
            className="text-center p-4 rounded-lg"
            style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <div className="text-2xl font-bold text-gray-700">15,293</div>
            <div className="text-sm text-gray-600">Predictions Made</div>
          </div>
        </div>

        {/* Sample Predictions */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Today's Featured Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* NFL Game */}
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">NFL</span>
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: '#dcfce7', color: '#22c55e' }}
                >
                  87% Confidence
                </span>
              </div>
              <h3 className="font-semibold mb-4">Chiefs vs Bills</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Prediction:</span>
                  <span className="font-semibold" style={{ color: '#22c55e' }}>Chiefs +3</span>
                </div>
                <div className="flex justify-between">
                  <span>ML Odds:</span>
                  <span className="font-semibold" style={{ color: '#22c55e' }}>+145</span>
                </div>
              </div>
              <div 
                className="w-full h-2 rounded-full mb-2"
                style={{ backgroundColor: '#e5e7eb' }}
              >
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    width: '87%', 
                    background: 'linear-gradient(90deg, #22c55e, #eab308)' 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">Model shows strong value on spread</p>
            </div>

            {/* MLB Game */}
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">MLB</span>
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: '#fef3c7', color: '#eab308' }}
                >
                  92% Confidence
                </span>
              </div>
              <h3 className="font-semibold mb-4">Yankees vs Dodgers</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Prediction:</span>
                  <span className="font-semibold" style={{ color: '#eab308' }}>Over 8.5</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Odds:</span>
                  <span className="font-semibold" style={{ color: '#ef4444' }}>-110</span>
                </div>
              </div>
              <div 
                className="w-full h-2 rounded-full mb-2"
                style={{ backgroundColor: '#e5e7eb' }}
              >
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    width: '92%', 
                    background: 'linear-gradient(90deg, #22c55e, #eab308)' 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">Strong offensive matchup expected</p>
            </div>

            {/* Community Pick */}
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">Community Pick</span>
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: '#dcfce7', color: '#22c55e' }}
                >
                  Won
                </span>
              </div>
              <h3 className="font-semibold mb-4">Lakers vs Warriors</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Pick:</span>
                  <span className="font-semibold">Lakers ML</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit:</span>
                  <span className="font-semibold" style={{ color: '#22c55e' }}>+2.4u</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                Great call by <span className="font-medium">@SportsBettor23</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}