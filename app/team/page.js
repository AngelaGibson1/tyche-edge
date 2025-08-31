'use client'

import { useState } from "react";
import { Users, Plus, Crown, Settings, MessageCircle, TrendingUp, Target, Calendar } from "lucide-react";

const CURRENT_USER_ID = "user-1";

// Mock teams data
const mockAllTeams = [
  {
    id: "team-1",
    name: "Prediction Masters",
    description: "Elite group of top-performing predictors",
    memberCount: 15,
    isPrivate: false,
    averageAccuracy: "89.2"
  },
  {
    id: "team-2",
    name: "Rookie League",
    description: "New predictors learning the ropes",
    memberCount: 28,
    isPrivate: false,
    averageAccuracy: "74.5"
  },
  {
    id: "team-3",
    name: "Analytics Pros",
    description: "Data-driven prediction specialists",
    memberCount: 12,
    isPrivate: true,
    averageAccuracy: "86.7"
  },
  {
    id: "team-4",
    name: "Elite Squad",
    description: "Invitation-only top performers",
    memberCount: 8,
    isPrivate: true,
    averageAccuracy: "92.1"
  },
  {
    id: "team-5",
    name: "Victory Club",
    description: "Consistent winners sharing strategies",
    memberCount: 22,
    isPrivate: false,
    averageAccuracy: "81.3"
  }
];

// Mock user teams (teams the user is already part of)
const mockUserTeams = [
  {
    team: mockAllTeams[1], // Rookie League
    membership: { role: "member" }
  },
  {
    team: mockAllTeams[4], // Victory Club  
    membership: { role: "admin" }
  }
];

// Mock daily picks data
const mockDailyPicks = {
  "team-2": [
    {
      user: { id: "u1", username: "SportsFan23" },
      predictions: [
        {
          id: "p1",
          gameInfo: "Lakers vs Warriors",
          prediction: "Lakers -3.5",
          confidence: "85",
          status: "active"
        },
        {
          id: "p2", 
          gameInfo: "Chiefs vs Bills",
          prediction: "Over 52.5",
          confidence: "72",
          status: "won"
        }
      ]
    },
    {
      user: { id: "u2", username: "BetMaster" },
      predictions: [
        {
          id: "p3",
          gameInfo: "Celtics vs Heat",
          prediction: "Celtics ML",
          confidence: "78",
          status: "lost"
        }
      ]
    }
  ],
  "team-5": [
    {
      user: { id: "u3", username: "ProPredictor" },
      predictions: [
        {
          id: "p4",
          gameInfo: "Cowboys vs Giants",
          prediction: "Cowboys -7",
          confidence: "91",
          status: "active"
        },
        {
          id: "p5",
          gameInfo: "Dodgers vs Padres", 
          prediction: "Under 8.5",
          confidence: "83",
          status: "active"
        },
        {
          id: "p6",
          gameInfo: "Bruins vs Rangers",
          prediction: "Bruins ML",
          confidence: "76",
          status: "won"
        }
      ]
    }
  ]
};

export default function Team() {
  const [activeTab, setActiveTab] = useState("my-teams");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // success or error

  // Using mock data
  const allTeams = mockAllTeams;
  const userTeams = mockUserTeams;

  const showNotification = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const isUserInTeam = (teamId) => {
    return userTeams.some((userTeam) => userTeam.team.id === teamId);
  };

  const getUserRole = (teamId) => {
    const userTeam = userTeams.find((userTeam) => userTeam.team.id === teamId);
    return userTeam?.membership?.role || "member";
  };

  const handleJoinTeam = (teamId) => {
    showNotification("Successfully joined the team!");
  };

  const handleLeaveTeam = (teamId) => {
    showNotification("You've left the team.");
  };

  const handleCreateTeam = () => {
    showNotification("Team creation coming soon!");
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

  const Badge = ({ children, className = "", variant = "default" }) => {
    const variants = {
      default: "bg-gray-100 text-gray-800",
      outline: "border border-gray-200 text-gray-700"
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  const Tabs = ({ children, value, onValueChange }) => (
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

  const Separator = ({ className = "" }) => (
    <hr className={`border-gray-200 ${className}`} />
  );

  const Toast = ({ show, message, type }) => {
    if (!show) return null;
    const bgColor = type === "error" ? "bg-red-600" : "bg-green-600";
    return (
      <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900" data-testid="team-title">
                Team Management
              </h1>
              <p className="text-gray-600 mt-1">
                Join prediction teams, share strategies, and view daily picks
              </p>
            </div>
            <Button 
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
              onClick={handleCreateTeam}
              data-testid="button-create-team"
            >
              <Plus className="mr-2" size={16} />
              Create Team
            </Button>
          </div>

          {/* Team Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="my-teams" data-testid="tab-my-teams">
                <Users className="mr-2" size={16} />
                My Teams ({userTeams.length})
              </TabsTrigger>
              <TabsTrigger value="all-teams" data-testid="tab-all-teams">
                <Crown className="mr-2" size={16} />
                All Teams ({allTeams.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-teams">
              <div className="space-y-6">
                {userTeams.length === 0 ? (
                  <Card className="border-dashed border-2" style={{ borderColor: 'rgba(181, 158, 91, 0.3)' }}>
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)' }}>
                        <Users style={{ color: '#B59E5B' }} size={32} />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2" data-testid="team-no-team-title">
                        You're not part of any team yet
                      </h2>
                      <p className="text-gray-600 mb-6" data-testid="team-no-team-description">
                        Join a team to compete in leagues, share strategies, and climb the rankings together.
                      </p>
                      <Button 
                        onClick={() => setActiveTab("all-teams")}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        data-testid="button-browse-teams"
                      >
                        Browse Teams
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {userTeams.map((userTeam) => (
                      <TeamCard 
                        key={userTeam.team.id} 
                        team={userTeam.team} 
                        role={userTeam.membership.role}
                        isUserMember={true}
                        onJoin={() => handleJoinTeam(userTeam.team.id)}
                        onLeave={() => handleLeaveTeam(userTeam.team.id)}
                        dailyPicks={mockDailyPicks[userTeam.team.id] || []}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="all-teams">
              <div className="space-y-4">
                {allTeams.map((team) => (
                  <TeamCard 
                    key={team.id} 
                    team={team} 
                    role={getUserRole(team.id)}
                    isUserMember={isUserInTeam(team.id)}
                    onJoin={() => handleJoinTeam(team.id)}
                    onLeave={() => handleLeaveTeam(team.id)}
                    dailyPicks={mockDailyPicks[team.id] || []}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Team Features Info */}
          {userTeams.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)' }}>
                    <TrendingUp style={{ color: '#B59E5B' }} size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Team Competitions</h3>
                  <p className="text-sm text-gray-600">
                    Compete as a team in seasonal leagues and tournaments
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)' }}>
                    <Target style={{ color: '#B59E5B' }} size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Daily Picks</h3>
                  <p className="text-sm text-gray-600">
                    View and share daily predictions with your team members
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)' }}>
                    <MessageCircle style={{ color: '#B59E5B' }} size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Strategy Sharing</h3>
                  <p className="text-sm text-gray-600">
                    Share insights and learn from experienced team members
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Toast Notification */}
          <Toast show={showToast} message={toastMessage} type={toastType} />
        </div>
      </div>
    </div>
  );
}

function TeamCard({ team, role, isUserMember, onJoin, onLeave, dailyPicks = [] }) {
  const [showDailyPicks, setShowDailyPicks] = useState(false);
  
  const getTeamIcon = (teamName) => {
    if (teamName.includes("Masters")) return Crown;
    if (teamName.includes("Rookies")) return Users;
    if (teamName.includes("Analytics")) return MessageCircle;
    return Users;
  };

  const getTeamColor = (teamName) => {
    if (teamName.includes("Masters")) return "from-blue-500 to-blue-600";
    if (teamName.includes("Rookies")) return "from-green-500 to-green-600";  
    if (teamName.includes("Analytics")) return "from-purple-500 to-purple-600";
    return "from-gray-500 to-gray-600";
  };

  const getStatusBadge = (team) => {
    if (team.isPrivate) {
      return <Badge className="text-yellow-800 bg-yellow-100">Invite Only</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">Open</Badge>;
  };

  const TeamIcon = getTeamIcon(team.name);

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );

  const CardContent = ({ children }) => (
    <div className="p-6">{children}</div>
  );

  const Button = ({ children, className = "", variant = "default", onClick, disabled = false, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-3 py-1.5 text-xs";
    const variants = {
      default: "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-yellow-500"
    };
    
    return (
      <button 
        className={`${baseClasses} ${variants[variant]} ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };

  const Badge = ({ children, className = "", variant = "default" }) => {
    const variants = {
      default: "bg-gray-100 text-gray-800",
      outline: "border border-gray-200 text-gray-700"
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  const Separator = ({ className = "" }) => (
    <hr className={`border-gray-200 ${className}`} />
  );

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-all">
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div 
              className={`w-12 h-12 rounded-lg flex items-center justify-center`}
              style={{ background: `linear-gradient(to bottom right, ${getTeamColor(team.name).includes('blue') ? '#3B82F6, #2563EB' : getTeamColor(team.name).includes('green') ? '#10B981, #059669' : getTeamColor(team.name).includes('purple') ? '#8B5CF6, #7C3AED' : '#6B7280, #4B5563'})` }}
            >
              <TeamIcon className="text-white" size={24} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900" data-testid={`team-${team.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  {team.name}
                </h3>
                {role === "owner" && <Badge variant="outline" className="text-xs">Owner</Badge>}
                {role === "admin" && <Badge variant="outline" className="text-xs">Admin</Badge>}
              </div>
              <p className="text-sm text-gray-600">
                {team.description}
              </p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-gray-500">{team.memberCount} members</span>
                {getStatusBadge(team)}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {!isUserMember ? (
              <Button 
                onClick={onJoin}
                disabled={Boolean(team.isPrivate)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                data-testid={`button-join-${team.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {Boolean(team.isPrivate) ? "Invite Only" : "Join Team"}
              </Button>
            ) : (
              <>
                <Button 
                  onClick={() => setShowDailyPicks(!showDailyPicks)}
                  variant="outline"
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                  data-testid={`button-daily-picks-${team.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Calendar className="mr-2" size={16} />
                  {showDailyPicks ? "Hide" : "View"} Daily Picks
                </Button>
                {role !== "owner" && (
                  <Button 
                    onClick={onLeave}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    data-testid={`button-leave-${team.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Leave Team
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Daily Picks Section */}
        {isUserMember && showDailyPicks && (
          <>
            <Separator className="mb-4" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="mr-2" size={16} />
                Today's Team Picks
              </h4>
              {dailyPicks.length === 0 ? (
                <p className="text-sm text-gray-600 text-center py-4">
                  No picks made today by team members
                </p>
              ) : (
                <div className="space-y-3">
                  {dailyPicks.map((memberPick) => (
                    <div key={memberPick.user.id} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-gray-900">
                          {memberPick.user.username}
                        </span>
                        <Badge className="text-yellow-800 bg-yellow-100 text-xs">
                          {memberPick.predictions.length} pick{memberPick.predictions.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      {memberPick.predictions.length > 0 ? (
                        <div className="space-y-2">
                          {memberPick.predictions.slice(0, 2).map((prediction) => (
                            <div key={prediction.id} className="text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">{prediction.gameInfo}</span>
                                <span className="font-medium text-gray-900">{prediction.prediction}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Confidence: {prediction.confidence}%</span>
                                <span className={`px-2 py-1 rounded-full ${
                                  prediction.status === 'won' ? 'bg-green-100 text-green-700' :
                                  prediction.status === 'lost' ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {prediction.status}
                                </span>
                              </div>
                            </div>
                          ))}
                          {memberPick.predictions.length > 2 && (
                            <p className="text-xs text-gray-500">
                              +{memberPick.predictions.length - 2} more pick{memberPick.predictions.length - 2 !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500">No picks today</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
