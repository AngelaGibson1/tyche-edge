'use client'

import { useState } from "react";
import { 
  User, 
  Edit, 
  Trophy, 
  Target, 
  Calendar, 
  TrendingUp, 
  Medal,
  Settings,
  Activity
} from "lucide-react";

// Mock user data
const mockUser = {
  id: "user-1",
  username: "Alex Morgan",
  email: "alex.morgan@tycheedge.com",
  tier: "Gold",
  rank: 23,
  points: 2450,
  totalPredictions: 247,
  accuracy: "83.2",
  streak: 8,
  winnings: "2,450.00"
};

// Mock activities data
const mockActivities = [
  {
    id: "a1",
    type: "prediction_won",
    description: "Lakers +5.5 prediction won",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: "a2", 
    type: "rank_change",
    description: "Moved up to rank #23",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
  },
  {
    id: "a3",
    type: "prediction_lost",
    description: "Warriors ML prediction lost",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: "a4",
    type: "prediction_won",
    description: "Over 215.5 prediction won",
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString() // 1.5 days ago
  },
  {
    id: "a5",
    type: "rank_change",
    description: "Reached Gold tier milestone",
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString() // 3 days ago
  }
];

export default function Profile() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Using mock data
  const user = mockUser;
  const activities = mockActivities;

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getTierColor = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'platinum':
        return 'bg-gray-100 text-gray-800';
      case 'gold':
        return 'text-yellow-800 bg-yellow-100';
      case 'silver':
        return 'bg-gray-200 text-gray-700';
      case 'bronze':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'prediction_won':
        return <div className="w-2 h-2 bg-green-400 rounded-full" />;
      case 'prediction_lost':
        return <div className="w-2 h-2 bg-red-400 rounded-full" />;
      case 'rank_change':
        return <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#B59E5B' }} />;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  // UI Components
  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="p-6 pb-0">{children}</div>
  );

  const CardContent = ({ children }) => (
    <div className="p-6">{children}</div>
  );

  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
  );

  const Button = ({ children, className = "", variant = "default", size = "default", onClick, disabled = false, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      default: "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-yellow-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
    };
    const sizes = {
      default: "px-4 py-2 text-sm",
      sm: "px-3 py-1.5 text-xs"
    };
    
    return (
      <button 
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };

  const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );

  const Avatar = ({ children, className = "" }) => (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
      {children}
    </div>
  );

  const AvatarFallback = ({ children, className = "" }) => (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      {children}
    </div>
  );

  const Toast = ({ show, message }) => {
    if (!show) return null;
    return (
      <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
        {message}
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900" data-testid="profile-title">
              Profile
            </h1>
            <Button 
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
              onClick={() => showNotification("Profile editing coming soon!")}
              data-testid="button-edit-profile"
            >
              <Edit className="mr-2" size={16} />
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Basic Info Card */}
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="text-white text-2xl font-bold" style={{ backgroundColor: '#B59E5B' }}>
                      {user?.username?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-1" data-testid="profile-username">
                    {user?.username || 'Unknown User'}
                  </h2>
                  
                  <p className="text-gray-600 mb-3" data-testid="profile-email">
                    {user?.email || 'No email provided'}
                  </p>
                  
                  <Badge className={getTierColor(user?.tier || 'Bronze')} data-testid="profile-tier">
                    {user?.tier || 'Bronze'} Tier
                  </Badge>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-gray-900" data-testid="profile-rank">
                          #{user?.rank || 1}
                        </p>
                        <p className="text-sm text-gray-600">Rank</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900" data-testid="profile-points">
                          {user?.points || 0}
                        </p>
                        <p className="text-sm text-gray-600">Points</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy style={{ color: '#B59E5B' }} size={20} />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(181, 158, 91, 0.1)' }}>
                      <Medal style={{ color: '#B59E5B' }} size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Gold Tier</p>
                        <p className="text-sm text-gray-600">Elite predictor status</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Target className="text-green-600" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">High Accuracy</p>
                        <p className="text-sm text-gray-600">78%+ win rate</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="text-blue-600" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Win Streak</p>
                        <p className="text-sm text-gray-600">{user?.streak || 0} games</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                        <Target className="text-blue-600" size={24} />
                      </div>
                      <p className="text-2xl font-bold text-gray-900" data-testid="profile-total-predictions">
                        {user?.totalPredictions || 0}
                      </p>
                      <p className="text-sm text-gray-600">Total Predictions</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mx-auto mb-2" style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)' }}>
                        <Trophy style={{ color: '#B59E5B' }} size={24} />
                      </div>
                      <p className="text-2xl font-bold text-gray-900" data-testid="profile-accuracy">
                        {user?.accuracy || '0.00'}%
                      </p>
                      <p className="text-sm text-gray-600">Accuracy</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                        <TrendingUp className="text-green-600" size={24} />
                      </div>
                      <p className="text-2xl font-bold text-gray-900" data-testid="profile-streak">
                        {user?.streak || 0}
                      </p>
                      <p className="text-sm text-gray-600">Win Streak</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mx-auto mb-2" style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)' }}>
                        <Medal style={{ color: '#B59E5B' }} size={24} />
                      </div>
                      <p className="text-2xl font-bold text-gray-900" data-testid="profile-winnings">
                        ${user?.winnings || '0.00'}
                      </p>
                      <p className="text-sm text-gray-600">Total Winnings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity style={{ color: '#B59E5B' }} size={20} />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4" data-testid="profile-recent-activity">
                    {activities && activities.length > 0 ? (
                      activities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <p className="text-gray-900" data-testid={`activity-description-${activity.id}`}>
                              {activity.description}
                            </p>
                            <p className="text-sm text-gray-600" data-testid={`activity-time-${activity.id}`}>
                              {formatTimeAgo(activity.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Activity className="text-gray-400 mx-auto mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent activity</h3>
                        <p className="text-gray-600">
                          Your recent predictions and achievements will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings style={{ color: '#B59E5B' }} size={20} />
                    <span>Account Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">
                          Get notified about prediction results and leaderboard changes
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => showNotification("Email settings updated!")}
                        data-testid="button-email-settings"
                      >
                        Configure
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Privacy Settings</h3>
                        <p className="text-sm text-gray-600">
                          Control who can see your predictions and activity
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => showNotification("Privacy settings saved!")}
                        data-testid="button-privacy-settings"
                      >
                        Manage
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Account Security</h3>
                        <p className="text-sm text-gray-600">
                          Update password and enable two-factor authentication
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => showNotification("Security settings updated!")}
                        data-testid="button-security-settings"
                      >
                        Secure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Toast Notification */}
          <Toast show={showToast} message={toastMessage} />
        </div>
      </div>
    </div>
  );
}
