'use client'

import { useState } from "react";
import { Trophy, Medal, Award, Crown, TrendingUp, TrendingDown, Calendar, CalendarDays, Clock, Users, Send } from "lucide-react";

const CURRENT_USER_ID = "user-1";

// Mock data for different time periods
const mockOverallLeaderboard = [
  { id: "u1", username: "SportsGuru23", accuracy: "94.2", points: 3847, tier: "Platinum", totalPredictions: 127, streak: 15, winnings: "4,250.00" },
  { id: "u2", username: "BetMaster", accuracy: "91.8", points: 3534, tier: "Gold", totalPredictions: 98, streak: 8, winnings: "3,890.00" },
  { id: "u3", username: "ProPredictor", accuracy: "89.5", points: 3421, tier: "Gold", totalPredictions: 115, streak: 12, winnings: "3,650.00" },
  { id: "u4", username: "WinStreak", accuracy: "87.3", points: 2987, tier: "Gold", totalPredictions: 89, streak: 6, winnings: "2,840.00" },
  { id: "u5", username: "AccuracyKing", accuracy: "86.1", points: 2756, tier: "Silver", totalPredictions: 76, streak: 4, winnings: "2,190.00" },
  { id: "u6", username: "DataDriven", accuracy: "84.9", points: 2634, tier: "Silver", totalPredictions: 92, streak: 9, winnings: "2,450.00" },
  { id: "u7", username: "TrendSpotter", accuracy: "83.7", points: 2521, tier: "Silver", totalPredictions: 68, streak: 3, winnings: "1,980.00" },
  { id: "u8", username: "SafeBet", accuracy: "82.4", points: 2398, tier: "Bronze", totalPredictions: 54, streak: 7, winnings: "1,750.00" },
];

const mockDailyLeaderboard = [
  { id: "u3", username: "ProPredictor", accuracy: "100.0", points: 150, tier: "Gold", totalPredictions: 3, streak: 3, winnings: "340.00" },
  { id: "u1", username: "SportsGuru23", accuracy: "80.0", points: 120, tier: "Platinum", totalPredictions: 5, streak: 2, winnings: "280.00" },
  { id: "u4", username: "WinStreak", accuracy: "75.0", points: 90, tier: "Gold", totalPredictions: 4, streak: 1, winnings: "190.00" },
];

const mockWeeklyLeaderboard = [
  { id: "u1", username: "SportsGuru23", accuracy: "88.9", points: 890, tier: "Platinum", totalPredictions: 18, streak: 5, winnings: "1,240.00" },
  { id: "u2", username: "BetMaster", accuracy: "85.7", points: 756, tier: "Gold", totalPredictions: 14, streak: 3, winnings: "980.00" },
  { id: "u6", username: "DataDriven", accuracy: "83.3", points: 687, tier: "Silver", totalPredictions: 12, streak: 4, winnings: "750.00" },
];

const mockMonthlyLeaderboard = [
  { id: "u2", username: "BetMaster", accuracy: "90.3", points: 2847, tier: "Gold", totalPredictions: 62, streak: 8, winnings: "3,120.00" },
  { id: "u1", username: "SportsGuru23", accuracy: "89.1", points: 2634, tier: "Platinum", totalPredictions: 55, streak: 6, winnings: "2,890.00" },
  { id: "u5", username: "AccuracyKing", accuracy: "87.8", points: 2521, tier: "Silver", totalPredictions: 48, streak: 4, winnings: "2,450.00" },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("overall");
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Get the current leaderboard based on active tab
  const getCurrentLeaderboard = () => {
    switch (activeTab) {
      case "daily": return mockDailyLeaderboard;
      case "weekly": return mockWeeklyLeaderboard;
      case "monthly": return mockMonthlyLeaderboard;
      default: return mockOverallLeaderboard;
    }
  };

  const handleRequestToJoin = (user) => {
    setSelectedUser(user);
    setRequestDialogOpen(true);
  };

  const submitJoinRequest = () => {
    if (!selectedUser) return;
    
    // Mock successful request
    setToastMessage(`Request sent to join ${getTopPerformerTeamName(selectedUser)}!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    
    setRequestDialogOpen(false);
    setRequestMessage("");
    setSelectedUser(null);
  };

  // Helper function to get team names for demo
  const getTopPerformerTeamName = (user) => {
    const teamMap = {
      "SportsGuru23": "Prediction Masters",
      "BetMaster": "Analytics Pros", 
      "ProPredictor": "Elite Squad",
      "WinStreak": "Victory Club",
      "AccuracyKing": "Precision Team",
      "DataDriven": "Stats Masters",
      "TrendSpotter": "Market Movers",
      "SafeBet": "Conservative Crew"
    };
    return teamMap[user.username] || null;
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown style={{ color: '#B59E5B' }} size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Award className="text-amber-600" size={24} />;
      default:
        return <Trophy className="text-gray-400" size={20} />;
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 1:
        return "text-white";
      case 2:
        return "text-white";
      case 3:
        return "text-white";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  const getRankBgStyle = (rank) => {
    switch (rank) {
      case 1:
        return { background: 'linear-gradient(to right, #B59E5B, #9A8749)' };
      case 2:
        return { background: 'linear-gradient(to right, #9CA3AF, #6B7280)' };
      case 3:
        return { background: 'linear-gradient(to right, #F59E0B, #D97706)' };
      default:
        return {};
    }
  };

  const getTierColor = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'platinum':
        return 'bg-gray-100 text-gray-800';
      case 'gold':
        return 'text-yellow-800' + ' bg-yellow-100';
      case 'silver':
        return 'bg-gray-200 text-gray-700';
      case 'bronze':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
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

  const Dialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
          {children}
        </div>
      </div>
    );
  };

  const DialogHeader = ({ children }) => (
    <div className="mb-4">{children}</div>
  );

  const DialogTitle = ({ children }) => (
    <h2 className="text-xl font-semibold text-gray-900">{children}</h2>
  );

  const Textarea = ({ placeholder, value, onChange, rows = 3, ...props }) => (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
      {...props}
    />
  );

  const Tabs = ({ children, value, onValueChange }) => (
    <div className="w-full">
      {children}
    </div>
  );

  const TabsList = ({ children }) => (
    <div className="grid w-full grid-cols-4 bg-gray-100 rounded-lg p-1 mb-6">
      {children}
    </div>
  );

  const TabsTrigger = ({ value, children, ...props }) => (
    <button
      className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded transition-colors ${
        activeTab === value 
          ? 'bg-white text-gray-900 shadow-sm' 
          : 'text-gray-600 hover:text-gray-900'
      }`}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );

  const TabsContent = ({ value, children }) => {
    if (activeTab !== value) return null;
    return <div>{children}</div>;
  };

  const Toast = ({ show, message }) => {
    if (!show) return null;
    return (
      <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
        {message}
      </div>
    );
  };

  const renderLeaderboard = (leaderboard, period) => {
    return (
      <>
        {/* Top 3 Podium */}
        {leaderboard && leaderboard.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <Card className="order-2 md:order-1">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                       style={{ background: 'linear-gradient(to bottom right, #9CA3AF, #6B7280)' }}>
                    <Medal className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900" data-testid={`podium-second-name-${period}`}>
                  {leaderboard[1]?.username}
                </h3>
                <p className="text-gray-600 mb-2" data-testid={`podium-second-accuracy-${period}`}>
                  {leaderboard[1]?.accuracy}% accuracy
                </p>
                <p className="text-2xl font-bold text-gray-900" data-testid={`podium-second-points-${period}`}>
                  {leaderboard[1]?.points} pts
                </p>
                <Badge className={getTierColor(leaderboard[1]?.tier || '')} data-testid={`podium-second-tier-${period}`}>
                  {leaderboard[1]?.tier}
                </Badge>
              </CardContent>
            </Card>

            {/* 1st Place */}
            <Card className="order-1 md:order-2 border-2" style={{ borderColor: '#B59E5B' }}>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                       style={{ background: 'linear-gradient(to bottom right, #B59E5B, #9A8749)' }}>
                    <Crown className="text-white" size={40} />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-900" data-testid={`podium-first-name-${period}`}>
                  {leaderboard[0]?.username}
                </h3>
                <p className="text-gray-600 mb-2" data-testid={`podium-first-accuracy-${period}`}>
                  {leaderboard[0]?.accuracy}% accuracy
                </p>
                <p className="text-3xl font-bold text-gray-900" data-testid={`podium-first-points-${period}`}>
                  {leaderboard[0]?.points} pts
                </p>
                <Badge className={getTierColor(leaderboard[0]?.tier || '')} data-testid={`podium-first-tier-${period}`}>
                  {leaderboard[0]?.tier}
                </Badge>
              </CardContent>
            </Card>

            {/* 3rd Place */}
            <Card className="order-3">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                       style={{ background: 'linear-gradient(to bottom right, #F59E0B, #D97706)' }}>
                    <Award className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900" data-testid={`podium-third-name-${period}`}>
                  {leaderboard[2]?.username}
                </h3>
                <p className="text-gray-600 mb-2" data-testid={`podium-third-accuracy-${period}`}>
                  {leaderboard[2]?.accuracy}% accuracy
                </p>
                <p className="text-2xl font-bold text-gray-900" data-testid={`podium-third-points-${period}`}>
                  {leaderboard[2]?.points} pts
                </p>
                <Badge className={getTierColor(leaderboard[2]?.tier || '')} data-testid={`podium-third-tier-${period}`}>
                  {leaderboard[2]?.tier}
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>
              {period === 'daily' ? 'Today\'s Top Predictors' :
               period === 'weekly' ? 'This Week\'s Leaders' :
               period === 'monthly' ? 'This Month\'s Champions' :
               'All-Time Rankings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2" data-testid={`full-leaderboard-${period}`}>
              {leaderboard && leaderboard.length > 0 ? (
                leaderboard.map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                      index < 3 ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                    data-testid={`leaderboard-row-${period}-${index}`}
                  >
                    {/* Rank */}
                    <div 
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${getRankBg(index + 1)}`}
                      style={getRankBgStyle(index + 1)}
                    >
                      {index < 3 ? getRankIcon(index + 1) : index + 1}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900" data-testid={`user-name-${period}-${index}`}>
                          {user.username}
                        </h3>
                        <Badge className={getTierColor(user.tier || 'Bronze')} data-testid={`user-tier-${period}-${index}`}>
                          {user.tier || 'Bronze'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span data-testid={`user-predictions-${period}-${index}`}>
                          {user.totalPredictions} predictions
                        </span>
                        <span data-testid={`user-streak-${period}-${index}`}>
                          {user.streak} win streak
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900" data-testid={`user-accuracy-${period}-${index}`}>
                          {user.accuracy}%
                        </span>
                        <TrendingUp className="text-green-500" size={16} />
                      </div>
                      <div className="text-sm text-gray-600" data-testid={`user-winnings-${period}-${index}`}>
                        ${user.winnings}
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900" data-testid={`user-points-${period}-${index}`}>
                        {user.points}
                      </div>
                      <div className="text-sm text-gray-600">points</div>
                    </div>

                    {/* Request to Join Team Button */}
                    <div className="w-32">
                      {user.id !== CURRENT_USER_ID && getTopPerformerTeamName(user) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRequestToJoin(user)}
                          className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 text-xs"
                          data-testid={`button-request-join-${user.username.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <Users className="mr-1" size={12} />
                          Request to Join
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {period === 'daily' ? 'No predictions today' :
                     period === 'weekly' ? 'No predictions this week' :
                     period === 'monthly' ? 'No predictions this month' :
                     'No rankings available'}
                  </h3>
                  <p className="text-gray-600">
                    {period === 'daily' ? 'Be the first to make a prediction today!' :
                     period === 'weekly' ? 'Start making predictions to appear on the weekly leaderboard' :
                     period === 'monthly' ? 'Make predictions throughout the month to earn your spot' :
                     'Leaderboard will populate as users make predictions'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="leaderboard-title">
              Leaderboard
            </h1>
            <p className="text-gray-600 mt-1">
              See how you stack up against other predictors across different time periods
            </p>
          </div>

          {/* Leaderboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overall" data-testid="tab-overall-leaderboard">
                <Trophy className="mr-2" size={16} />
                Overall
              </TabsTrigger>
              <TabsTrigger value="monthly" data-testid="tab-monthly-leaderboard">
                <Calendar className="mr-2" size={16} />
                Monthly
              </TabsTrigger>
              <TabsTrigger value="weekly" data-testid="tab-weekly-leaderboard">
                <Clock className="mr-2" size={16} />
                Weekly
              </TabsTrigger>
              <TabsTrigger value="daily" data-testid="tab-daily-leaderboard">
                <CalendarDays className="mr-2" size={16} />
                Daily
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overall">
              <div className="space-y-6">
                {renderLeaderboard(mockOverallLeaderboard, "overall")}
              </div>
            </TabsContent>
            
            <TabsContent value="daily">
              <div className="space-y-6">
                {renderLeaderboard(mockDailyLeaderboard, "daily")}
              </div>
            </TabsContent>
            
            <TabsContent value="weekly">
              <div className="space-y-6">
                {renderLeaderboard(mockWeeklyLeaderboard, "weekly")}
              </div>
            </TabsContent>
            
            <TabsContent value="monthly">
              <div className="space-y-6">
                {renderLeaderboard(mockMonthlyLeaderboard, "monthly")}
              </div>
            </TabsContent>
          </Tabs>

          {/* Request Join Dialog */}
          <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
            <DialogHeader>
              <DialogTitle>Request to Join Team</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(242, 239, 232, 0.5)' }}>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                         style={{ background: 'linear-gradient(to bottom right, #B59E5B, #9A8749)' }}>
                      <Crown className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedUser.username}</h3>
                      <p className="text-sm text-gray-600">
                        Top performer • {getTopPerformerTeamName(selectedUser)}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Accuracy:</span>
                      <span className="font-medium text-gray-900 ml-2">{selectedUser.accuracy}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Points:</span>
                      <span className="font-medium text-gray-900 ml-2">{selectedUser.points}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">
                    Message (Optional)
                  </label>
                  <Textarea
                    placeholder="Tell them why you'd like to join their team..."
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    rows={3}
                    data-testid="textarea-join-request-message"
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setRequestDialogOpen(false)}
                    data-testid="button-cancel-join-request"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={submitJoinRequest}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    data-testid="button-send-join-request"
                  >
                    <Send className="mr-2" size={16} />
                    Send Request
                  </Button>
                </div>
              </div>
            )}
          </Dialog>

          {/* Toast Notification */}
          <Toast show={showToast} message={toastMessage} />
        </div>
      </div>
    </div>
  );
}
