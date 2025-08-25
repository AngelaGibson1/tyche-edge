import { MessageCircle, Users, Send } from 'lucide-react';

export default function Chat() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Chat</h1>
          <p className="text-gray-600">Connect with fellow bettors and share insights</p>
        </div>

        {/* Coming Soon Notice */}
        <div 
          className="p-12 rounded-lg text-center"
          style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
        >
          <div 
            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #22c55e, #eab308)' }}
          >
            <MessageCircle className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Chat Coming Soon!</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're building an amazing real-time chat experience where you can discuss games, 
            share picks, and connect with other sports bettors. Stay tuned!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
              <Users className="w-8 h-8 mx-auto mb-3" style={{ color: '#22c55e' }} />
              <h3 className="font-semibold mb-2">Game-Specific Rooms</h3>
              <p className="text-sm text-gray-600">Chat about specific games and matches</p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
              <MessageCircle className="w-8 h-8 mx-auto mb-3" style={{ color: '#eab308' }} />
              <h3 className="font-semibold mb-2">Expert Insights</h3>
              <p className="text-sm text-gray-600">Get tips from top-performing bettors</p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
              <Send className="w-8 h-8 mx-auto mb-3" style={{ color: '#22c55e' }} />
              <h3 className="font-semibold mb-2">Live Updates</h3>
              <p className="text-sm text-gray-600">Real-time game updates and alerts</p>
            </div>
          </div>
          
          <button 
            className="mt-8 px-8 py-3 font-medium text-white rounded-lg transition-all hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, #22c55e, #eab308)' }}
          >
            Notify Me When Ready
          </button>
        </div>
      </div>
    </div>
  );
}