export default function Predictions() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Predictions</h1>
        <p className="text-gray-600 mb-8">Data-driven insights powered by advanced machine learning models</p>
        
        <div 
          className="p-12 rounded-lg text-center"
          style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Predictions Coming Soon!</h2>
          <p className="text-gray-600">Your NFL and MLB model predictions will appear here.</p>
        </div>
      </div>
    </div>
  );
}