import { BarChart3, TrendingUp, Target, DollarSign } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Your betting performance and insights at a glance</p>
        </div>
        
        <div 
          className="p-12 rounded-lg text-center"
          style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Coming Soon!</h2>
          <p className="text-gray-600">We're building your personal betting dashboard.</p>
        </div>
      </div>
    </div>
  );
}