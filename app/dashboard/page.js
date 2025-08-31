'use client'

import { useState } from "react";
import Link from "next/link";
import { 
  ChartLine, 
  Target, 
  Flame, 
  DollarSign, 
  Plus, 
  BarChart3, 
  Users,
  TrendingUp,
  Calculator,
  AlertTriangle,
  CheckCircle,
  PieChart
} from "lucide-react";

// Mock data for demonstration
const performanceData = [
  { name: 'Mon', accuracy: 72 },
  { name: 'Tue', accuracy: 75 },
  { name: 'Wed', accuracy: 78 },
  { name: 'Thu', accuracy: 74 },
  { name: 'Fri', accuracy: 81 },
  { name: 'Sat', accuracy: 79 },
  { name: 'Sun', accuracy: 83 },
];

const COLORS = ['#B59E5B', '#164A2F', '#36454F', '#F2EFE8'];

// Mock user data
const mockUser = {
  username: 'Alex',
  totalPredictions: 247,
  accuracy: '83.2',
  streak: 8,
  winnings: '2,450.00'
};

const mockActivePredictions = [
  {
    id: 1,
    gameInfo: 'Lakers vs Warriors',
    prediction: 'Lakers -5.5',
    confidence: '85',
    gameTime: new Date().toISOString()
  },
  {
    id: 2,
    gameInfo: 'Celtics vs Heat',
    prediction: 'Over 218.5',
    confidence: '72',
    gameTime: new Date().toISOString()
  }
];

const mockLeaderboard = [
  { id: 1, username: 'ProPredictor', accuracy: '91.4', points: 2847 },
  { id: 2, username: 'SportsSage', accuracy: '89.2', points: 2634 },
  { id: 3, username: 'BetMaster', accuracy: '87.8', points: 2521 }
];

const mockBudget = {
  id: 1,
  weeklyBudget: '500.00',
  usedBudget: '180.00'
};

const mockWeeklyBets = [
  {
    id: 1,
    gameInfo: 'Lakers vs Clippers',
    betAmount: '50.00',
    odds: '-110',
    betType: 'spread',
    status: 'won',
    strategyRecommendation: 'Good value bet based on recent form'
  },
  {
    id: 2,
    gameInfo: 'Warriors vs Suns',
    betAmount: '75.00',
    odds: '+105',
    betType: 'moneyline',
    status: 'pending',
    strategyRecommendation: 'Consider the road disadvantage'
  }
];

export default function Dashboard() {
  const [isAddBetOpen, setIsAddBetOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  
  // Using mock data for demonstration
  const user = mockUser;
  const activePredictions = mockActivePredictions;
  const leaderboard = mockLeaderboard;
  const budget = mockBudget;
  const weeklyBets = mockWeeklyBets;

  const budgetUsagePercentage = budget ? 
    (parseFloat(budget.usedBudget || '0') / parseFloat(budget.weeklyBudget)) * 100 : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

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
      default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
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

  const Progress = ({ value, className = "" }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );

  const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold" style={{ color: '#36454F' }} data-testid="welcome-greeting">
              {getGreeting()}, {user?.username || 'Alex'}!
            </h2>
            <p className="text-gray-600 mt-1">Here's your prediction performance overview</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border-gray-200">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Predictions</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="stat-total-predictions">
                      {user?.totalPredictions || 0}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <ChartLine className="text-blue-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-green-600 text-sm font-medium">+12% </span>
                  <span className="text-gray-600 text-sm">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Accuracy</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="stat-accuracy">
                      {user?.accuracy || '0.00'}%
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)' }}>
                    <Target style={{ color: '#B59E5B' }} size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-green-600 text-sm font-medium">+2.1% </span>
                  <span className="text-gray-600 text-sm">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Current Streak</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="stat-streak">
                      {user?.streak || 0} wins
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Flame className="text-green-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-yellow-600 text-sm font-medium">Personal best</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Winnings</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="stat-winnings">
                      ${user?.winnings || '0.00'}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)' }}>
                    <DollarSign style={{ color: '#B59E5B' }} size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-green-600 text-sm font-medium">+$340 </span>
                  <span className="text-gray-600 text-sm">this week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart and Active Predictions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Performance Chart */}
            <Card className="lg:col-span-2 bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Performance Over Time</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="default" size="sm" className="bg-yellow-600 text-white hover:bg-yellow-700" data-testid="chart-period-7d">
                      7D
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 hover:bg-gray-100" data-testid="chart-period-30d">
                      30D
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 hover:bg-gray-100" data-testid="chart-period-3m">
                      3M
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64" data-testid="performance-chart">
                  {/* Simplified chart representation */}
                  <div className="h-full flex items-end justify-between space-x-2 px-4">
                    {performanceData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2">
                        <div 
                          className="w-8 rounded-t"
                          style={{ 
                            height: `${(data.accuracy - 65) * 4}px`,
                            backgroundColor: '#B59E5B'
                          }}
                        />
                        <span className="text-xs text-gray-600">{data.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Predictions */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle>Active Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="active-predictions">
                  {activePredictions && activePredictions.length > 0 ? (
                    activePredictions.map((prediction) => (
                      <div key={prediction.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900" data-testid={`prediction-game-${prediction.id}`}>
                            {prediction.gameInfo}
                          </span>
                          <span className="text-yellow-600 font-semibold" data-testid={`prediction-confidence-${prediction.id}`}>
                            {prediction.confidence}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span data-testid={`prediction-type-${prediction.id}`}>{prediction.prediction}</span>
                          <span data-testid={`prediction-time-${prediction.id}`}>
                            {new Date(prediction.gameTime).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        <Progress 
                          value={parseFloat(prediction.confidence)} 
                          className="mt-2 h-1.5"
                          data-testid={`prediction-progress-${prediction.id}`}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-600">
                      No active predictions
                    </div>
                  )}
                </div>
                <Link href="/predictions">
                  <Button 
                    className="w-full mt-4 bg-yellow-600 text-white hover:bg-yellow-700"
                    data-testid="button-view-all-predictions"
                  >
                    View All Predictions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Preview and Recent Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Leaderboard Preview */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Top Performers</CardTitle>
                  <Link href="/leaderboard">
                    <Button 
                      variant="ghost" 
                      className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                      data-testid="button-view-leaderboard"
                    >
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="leaderboard-preview">
                  {leaderboard && leaderboard.length > 0 ? (
                    leaderboard.slice(0, 3).map((user, index) => (
                      <div key={user.id} className="flex items-center space-x-4">
                        <div className={`flex items-center justify-center w-8 h-8 font-semibold rounded-full text-sm ${
                          index === 0 ? 'bg-yellow-600 text-white' : 
                          index === 1 ? 'bg-gray-400 text-white' : 
                          'bg-amber-600 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                          index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                          'bg-gradient-to-br from-amber-600 to-amber-700'
                        }`}>
                          <Users className="text-white" size={16} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900" data-testid={`leaderboard-user-${index}`}>
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-600" data-testid={`leaderboard-accuracy-${index}`}>
                            {user.accuracy}% accuracy
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900" data-testid={`leaderboard-points-${index}`}>
                            {user.points} pts
                          </div>
                          <div className="text-xs text-green-600">+125</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-600">
                      No leaderboard data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Game Results */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle>Recent Game Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="recent-results">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <div>
                        <div className="font-medium text-gray-900">Lakers +5.5</div>
                        <div className="text-sm text-gray-600">vs Warriors • Final: 118-112</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-semibold">WON</div>
                      <div className="text-sm text-gray-600">+$125</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div>
                        <div className="font-medium text-gray-900">Celtics ML</div>
                        <div className="text-sm text-gray-600">vs Heat • Final: 108-115</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-600 font-semibold">LOST</div>
                      <div className="text-sm text-gray-600">-$85</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <div>
                        <div className="font-medium text-gray-900">Over 215.5</div>
                        <div className="text-sm text-gray-600">Nuggets vs Suns • Final: 225 total</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-semibold">WON</div>
                      <div className="text-sm text-gray-600">+$95</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Betting Model Section */}
          <Card className="border-yellow-300" style={{ background: 'linear-gradient(to right, rgba(181, 158, 91, 0.1), rgba(22, 74, 47, 0.1))' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900">
                <Calculator className="text-yellow-600" size={24} />
                <span>Betting Strategy Model</span>
                <Badge className="bg-yellow-200 text-yellow-800">AI Powered</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Budget Overview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Weekly Budget</h3>
                    {!budget && (
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white" data-testid="button-set-budget">
                        <Plus size={16} className="mr-1" />
                        Set Budget
                      </Button>
                    )}
                  </div>
                  
                  {budget ? (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Budget</span>
                        <span className="font-medium text-gray-900">${budget.weeklyBudget}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Used</span>
                        <span className="font-medium text-gray-900">${budget.usedBudget || '0.00'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Remaining</span>
                        <span className="font-medium text-green-600">
                          ${(parseFloat(budget.weeklyBudget) - parseFloat(budget.usedBudget || '0')).toFixed(2)}
                        </span>
                      </div>
                      <Progress 
                        value={budgetUsagePercentage} 
                        className="h-2" 
                        data-testid="budget-progress"
                      />
                      <div className="text-xs text-gray-600 text-center">
                        {budgetUsagePercentage.toFixed(1)}% used
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-600">
                      <DollarSign className="mx-auto mb-2" size={32} />
                      <p>Set your weekly budget to start tracking bets</p>
                    </div>
                  )}
                </div>

                {/* Current Week Bets */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">This Week's Bets</h3>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white"
                      disabled={!budget}
                      data-testid="button-add-bet"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Bet
                    </Button>
                  </div>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto" data-testid="weekly-bets-list">
                    {weeklyBets && weeklyBets.length > 0 ? (
                      weeklyBets.map((bet) => (
                        <div key={bet.id} className="p-3 bg-white rounded-lg border border-gray-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 text-sm" data-testid={`bet-game-${bet.id}`}>
                              {bet.gameInfo}
                            </span>
                            <Badge 
                              className={`text-xs ${
                                bet.status === 'won' ? 'bg-green-100 text-green-800' :
                                bet.status === 'lost' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}
                              data-testid={`bet-status-${bet.id}`}
                            >
                              {bet.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            ${bet.betAmount} • {bet.betType} • {bet.odds}
                          </div>
                          {bet.strategyRecommendation && (
                            <div className="text-xs text-yellow-700 bg-yellow-50 p-2 rounded">
                              💡 {bet.strategyRecommendation}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-600">
                        <Target className="mx-auto mb-2" size={32} />
                        <p>No bets this week</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Strategy Insights */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Strategy Insights</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="text-green-600 mt-0.5" size={16} />
                        <div>
                          <p className="font-medium text-green-800 text-sm">Diversification Score: Good</p>
                          <p className="text-xs text-green-700">You're betting across multiple sports and bet types</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="text-yellow-600 mt-0.5" size={16} />
                        <div>
                          <p className="font-medium text-yellow-800 text-sm">Risk Management</p>
                          <p className="text-xs text-yellow-700">
                            {budgetUsagePercentage > 80 ? 
                              "Consider slowing down - you've used most of your budget" :
                              budgetUsagePercentage > 60 ?
                              "You're on track but monitor your remaining budget" :
                              "Good budget management - plenty left for the week"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <PieChart className="text-blue-600 mt-0.5" size={16} />
                        <div>
                          <p className="font-medium text-blue-800 text-sm">Optimal Bet Size</p>
                          <p className="text-xs text-blue-700">
                            {budget ? 
                              `Recommended: $${(parseFloat(budget.weeklyBudget) * 0.05).toFixed(2)} - $${(parseFloat(budget.weeklyBudget) * 0.1).toFixed(2)} per bet` :
                              "Set a budget to get personalized recommendations"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/predictions">
              <Button 
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
                data-testid="button-make-prediction"
              >
                <Plus size={20} />
                <span>Make New Prediction</span>
              </Button>
            </Link>
            
            <Link href="/analytics">
              <Button 
                variant="outline"
                className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl border border-gray-200 transition-colors flex items-center justify-center space-x-2"
                data-testid="button-view-analytics"
              >
                <BarChart3 size={20} />
                <span>View Analytics</span>
              </Button>
            </Link>
            
            <Link href="/team">
              <Button 
                variant="outline"
                className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl border border-gray-200 transition-colors flex items-center justify-center space-x-2"
                data-testid="button-join-league"
              >
                <Users size={20} />
                <span>Join League</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
