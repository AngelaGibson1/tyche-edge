'use client'

import { useState } from "react";
import { Plus, Clock, Target, TrendingUp, Brain, Zap, TrendingDown, AlertCircle, CheckCircle2 } from "lucide-react";

// Mock data for demonstration
const mockModelPredictions = [
  {
    id: 1,
    awayTeam: "Lakers",
    homeTeam: "Warriors",
    sport: "NBA",
    gameTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    recommendedBet: "Lakers +5.5",
    betType: "spread",
    confidence: "87",
    expectedValue: "0.142",
    modelEdge: "8.3",
    riskLevel: "medium",
    modelVersion: "2.1",
    lastUpdated: new Date().toISOString(),
    keyFactors: [
      "Lakers have won 7 of last 10 meetings",
      "Warriors missing key player due to injury",
      "Strong value in current market odds"
    ]
  },
  {
    id: 2,
    awayTeam: "Chiefs",
    homeTeam: "Bills",
    sport: "NFL",
    gameTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    recommendedBet: "Over 52.5",
    betType: "total",
    confidence: "92",
    expectedValue: "0.215",
    modelEdge: "12.1",
    riskLevel: "low",
    modelVersion: "2.1",
    lastUpdated: new Date().toISOString(),
    keyFactors: [
      "Both teams averaging 28+ PPG",
      "Weather conditions favor passing",
      "Historical over rate 73% in similar matchups"
    ]
  }
];

const mockUserPredictions = [
  {
    id: 1,
    gameInfo: "Lakers vs Warriors",
    prediction: "Lakers -3.5",
    amount: "50.00",
    confidence: "85",
    gameTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    status: "active",
    result: null
  },
  {
    id: 2,
    gameInfo: "Chiefs vs Bills",
    prediction: "Chiefs ML",
    amount: "75.00",
    confidence: "78",
    gameTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "won",
    result: "Chiefs won 24-17"
  },
  {
    id: 3,
    gameInfo: "Celtics vs Heat",
    prediction: "Under 215.5",
    amount: "100.00",
    confidence: "72",
    gameTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    status: "lost",
    result: "Final score: 118-112 (230 total points)"
  }
];

export default function Predictions() {
  const [sportFilter, setSportFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("model");
  
  // Using mock data
  const modelPredictions = sportFilter === "all" 
    ? mockModelPredictions 
    : mockModelPredictions.filter(p => p.sport === sportFilter);
  
  const predictions = mockUserPredictions;
  const activePredictions = predictions.filter(p => p.status === "active");

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'won':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 85) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
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

  const Progress = ({ value, className = "" }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );

  const Select = ({ value, onValueChange, children }) => {
    return (
      <select 
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-48 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        data-testid="select-sport-filter"
      >
        {children}
      </select>
    );
  };

  const SelectOption = ({ value, children }) => (
    <option value={value}>{children}</option>
  );

  const Tabs = ({ children, defaultValue }) => (
    <div className="w-full">
      {children}
    </div>
  );

  const TabsList = ({ children }) => (
    <div className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1 mb-6">
      {children}
    </div>
  );

  const TabsTrigger = ({ value, children, ...props }) => (
    <button
      className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#36454F' }} data-testid="predictions-title">
                Model Predictions
              </h1>
              <p className="text-gray-600 mt-1">
                AI-powered predictions and your betting history
              </p>
            </div>
            <Button 
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
              data-testid="button-new-prediction"
            >
              <Plus className="mr-2" size={16} />
              New Prediction
            </Button>
          </div>

          {/* Predictions Tabs */}
          <Tabs defaultValue="model">
            <TabsList>
              <TabsTrigger value="model" data-testid="tab-model-predictions">AI Model Predictions</TabsTrigger>
              <TabsTrigger value="user" data-testid="tab-user-predictions">Your Predictions</TabsTrigger>
            </TabsList>

            {/* AI Model Predictions Tab */}
            <TabsContent value="model">
              <div className="space-y-6">
                {/* Model Predictions Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)' }}>
                      <Brain style={{ color: '#B59E5B' }} size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">AI Model Predictions</h2>
                      <p className="text-sm text-gray-600">Expert insights to enhance your betting decisions</p>
                    </div>
                  </div>
                  <Select value={sportFilter} onValueChange={setSportFilter}>
                    <SelectOption value="all">All Sports</SelectOption>
                    <SelectOption value="NFL">NFL</SelectOption>
                    <SelectOption value="NBA">NBA</SelectOption>
                    <SelectOption value="MLB">MLB</SelectOption>
                  </Select>
                </div>

                {/* Model Predictions List */}
                <div className="space-y-4" data-testid="model-predictions-list">
                  {modelPredictions && modelPredictions.length > 0 ? (
                    modelPredictions.map((prediction) => (
                      <Card key={prediction.id} className="border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: '#B59E5B' }}>
                        <CardContent>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900" data-testid={`model-prediction-game-${prediction.id}`}>
                                  {prediction.awayTeam} @ {prediction.homeTeam}
                                </h3>
                                <Badge style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)', color: '#B59E5B' }}>
                                  {prediction.sport}
                                </Badge>
                                <Badge className={getRiskColor(prediction.riskLevel)} data-testid={`model-prediction-risk-${prediction.id}`}>
                                  {prediction.riskLevel.toUpperCase()} RISK
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Game Time: {new Date(prediction.gameTime).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Model v{prediction.modelVersion}</div>
                              <div className="text-xs text-gray-500">
                                Updated: {new Date(prediction.lastUpdated).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <Target style={{ color: '#B59E5B' }} size={16} />
                                <span className="text-sm font-medium text-gray-900">Recommended Bet</span>
                              </div>
                              <p className="font-semibold text-gray-900" data-testid={`model-prediction-bet-${prediction.id}`}>
                                {prediction.recommendedBet}
                              </p>
                              <p className="text-xs text-gray-600 capitalize">
                                {prediction.betType}
                              </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <Zap className={getConfidenceColor(parseFloat(prediction.confidence))} size={16} />
                                <span className="text-sm font-medium text-gray-900">Confidence</span>
                              </div>
                              <p className={`text-xl font-bold ${getConfidenceColor(parseFloat(prediction.confidence))}`} data-testid={`model-prediction-confidence-${prediction.id}`}>
                                {prediction.confidence}%
                              </p>
                              <Progress 
                                value={parseFloat(prediction.confidence)} 
                                className="h-1.5 mt-1"
                              />
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-sm font-medium text-gray-900">Expected Value</span>
                              </div>
                              <p className="text-xl font-bold text-green-600" data-testid={`model-prediction-ev-${prediction.id}`}>
                                +{(parseFloat(prediction.expectedValue) * 100).toFixed(2)}%
                              </p>
                              <p className="text-xs text-gray-600">
                                Edge: {prediction.modelEdge}%
                              </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <AlertCircle className="text-blue-600" size={16} />
                                <span className="text-sm font-medium text-gray-900">Key Factors</span>
                              </div>
                              <div className="space-y-1">
                                {prediction.keyFactors?.slice(0, 2).map((factor, index) => (
                                  <p key={index} className="text-xs text-gray-600 flex items-start">
                                    <CheckCircle2 className="text-green-500 mr-1 mt-0.5" size={10} />
                                    {factor}
                                  </p>
                                ))}
                                {prediction.keyFactors && prediction.keyFactors.length > 2 && (
                                  <p className="text-xs text-gray-500">+{prediction.keyFactors.length - 2} more factors</p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg p-3 border" style={{ 
                            backgroundColor: 'rgba(181, 158, 91, 0.1)', 
                            borderColor: 'rgba(181, 158, 91, 0.2)' 
                          }}>
                            <div className="flex items-start space-x-2">
                              <Brain style={{ color: '#B59E5B' }} className="mt-0.5" size={16} />
                              <div>
                                <p className="text-sm font-medium text-gray-900 mb-1">Model Analysis</p>
                                <p className="text-sm text-gray-600">
                                  This {prediction.betType} bet has a {prediction.confidence}% confidence rating with a {prediction.modelEdge}% edge over market odds. 
                                  {prediction.keyFactors && prediction.keyFactors.length > 0 && 
                                    ` Key factors include ${prediction.keyFactors[0].toLowerCase()}.`
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="text-gray-400" size={32} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No model predictions available</h3>
                      <p className="text-gray-600 mb-4">
                        Check back later for AI-powered betting insights
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* User Predictions Tab */}
            <TabsContent value="user">
              <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Target style={{ color: '#B59E5B' }} size={20} />
                        <div>
                          <p className="text-sm font-medium text-gray-600">Active</p>
                          <p className="text-xl font-bold text-gray-900" data-testid="stats-active">
                            {activePredictions?.length || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="text-green-600" size={20} />
                        <div>
                          <p className="text-sm font-medium text-gray-600">Won</p>
                          <p className="text-xl font-bold text-gray-900" data-testid="stats-won">
                            {predictions?.filter(p => p.status === 'won').length || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="text-red-600" size={20} />
                        <div>
                          <p className="text-sm font-medium text-gray-600">Lost</p>
                          <p className="text-xl font-bold text-gray-900" data-testid="stats-lost">
                            {predictions?.filter(p => p.status === 'lost').length || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Target style={{ color: '#B59E5B' }} size={20} />
                        <div>
                          <p className="text-sm font-medium text-gray-600">Win Rate</p>
                          <p className="text-xl font-bold text-gray-900" data-testid="stats-win-rate">
                            {predictions && predictions.length > 0 
                              ? `${Math.round((predictions.filter(p => p.status === 'won').length / predictions.length) * 100)}%`
                              : '0%'
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Predictions List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Predictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4" data-testid="predictions-list">
                      {predictions && predictions.length > 0 ? (
                        predictions.map((prediction) => (
                          <div key={prediction.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="font-semibold text-gray-900" data-testid={`prediction-game-${prediction.id}`}>
                                    {prediction.gameInfo}
                                  </h3>
                                  <Badge className={getStatusColor(prediction.status || 'active')} data-testid={`prediction-status-${prediction.id}`}>
                                    {(prediction.status || 'active').toUpperCase()}
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                  <div>
                                    <p className="text-sm text-gray-600">Prediction</p>
                                    <p className="font-medium text-gray-900" data-testid={`prediction-type-${prediction.id}`}>
                                      {prediction.prediction}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Amount</p>
                                    <p className="font-medium text-gray-900" data-testid={`prediction-amount-${prediction.id}`}>
                                      ${prediction.amount}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Game Time</p>
                                    <p className="font-medium text-gray-900" data-testid={`prediction-game-time-${prediction.id}`}>
                                      {new Date(prediction.gameTime).toLocaleString()}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm text-gray-600">Confidence</span>
                                      <span className="text-sm font-medium text-yellow-600" data-testid={`prediction-confidence-${prediction.id}`}>
                                        {prediction.confidence}%
                                      </span>
                                    </div>
                                    <Progress 
                                      value={parseFloat(prediction.confidence)} 
                                      className="h-2"
                                      data-testid={`prediction-confidence-bar-${prediction.id}`}
                                    />
                                  </div>
                                </div>

                                {prediction.result && (
                                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">Result</p>
                                    <p className="font-medium text-gray-900" data-testid={`prediction-result-${prediction.id}`}>
                                      {prediction.result}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="text-gray-400" size={32} />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No predictions yet</h3>
                          <p className="text-gray-600 mb-4">
                            Start making predictions to see them here
                          </p>
                          <Button 
                            className="bg-yellow-600 hover:bg-yellow-700 text-white"
                            data-testid="button-create-first-prediction"
                          >
                            <Plus className="mr-2" size={16} />
                            Create Your First Prediction
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
