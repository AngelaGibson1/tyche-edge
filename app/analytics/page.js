'use client'

import { useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Activity,
  Target,
  MapPin,
  Trophy,
  Zap,
} from "lucide-react";

// Mock data for demonstration
const mockLeagues = [
  { id: "nfl", name: "National Football League", sport: "Football" },
  { id: "nba", name: "National Basketball Association", sport: "Basketball" },
  { id: "mlb", name: "Major League Baseball", sport: "Baseball" },
];

const mockTeams = {
  nfl: [
    { id: "chiefs", name: "Kansas City Chiefs" },
    { id: "bills", name: "Buffalo Bills" },
    { id: "49ers", name: "San Francisco 49ers" },
  ],
  nba: [
    { id: "lakers", name: "Los Angeles Lakers" },
    { id: "warriors", name: "Golden State Warriors" },
    { id: "celtics", name: "Boston Celtics" },
  ],
  mlb: [
    { id: "dodgers", name: "Los Angeles Dodgers" },
    { id: "yankees", name: "New York Yankees" },
    { id: "astros", name: "Houston Astros" },
  ],
};

const mockPlayers = {
  chiefs: [
    { id: "mahomes", name: "Patrick Mahomes", position: "QB", number: 15 },
    { id: "kelce", name: "Travis Kelce", position: "TE", number: 87 },
  ],
  lakers: [
    { id: "lebron", name: "LeBron James", position: "SF", number: 23 },
    { id: "davis", name: "Anthony Davis", position: "PF", number: 3 },
  ],
  dodgers: [
    { id: "betts", name: "Mookie Betts", position: "OF", number: 50 },
    { id: "freeman", name: "Freddie Freeman", position: "1B", number: 5 },
  ],
};

// Generate mock stats for selected player
const generateMockStats = (playerId, league) => {
  const gameCount = 16; // Sample season
  const stats = [];
  
  for (let i = 0; i < gameCount; i++) {
    let gameStats = {};
    
    if (league === 'nfl') {
      gameStats = {
        game: i + 1,
        week: i + 1,
        qbr: 70 + Math.random() * 30,
        passerRating: 85 + Math.random() * 25,
        attempts: 25 + Math.random() * 15,
        touchdowns: Math.floor(Math.random() * 4),
      };
    } else if (league === 'nba') {
      gameStats = {
        game: i + 1,
        points: 15 + Math.random() * 20,
        assists: 3 + Math.random() * 8,
        fieldGoalPct: 0.4 + Math.random() * 0.3,
        tsPct: 0.45 + Math.random() * 0.25,
        usage: 20 + Math.random() * 15,
      };
    } else {
      gameStats = {
        game: i + 1,
        battingAvg: 0.200 + Math.random() * 0.200,
        atBats: 3 + Math.floor(Math.random() * 3),
        hits: Math.floor(Math.random() * 4),
        pa: 3 + Math.floor(Math.random() * 3),
      };
    }
    
    stats.push(gameStats);
  }
  
  return {
    playerId,
    league,
    season: "2024",
    stats
  };
};

export default function Analytics() {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [activeTab, setActiveTab] = useState("performance");

  const resetSelections = () => {
    setSelectedTeam("");
    setSelectedPlayer("");
  };

  const resetPlayer = () => setSelectedPlayer("");

  // Get available teams and players based on selections
  const availableTeams = selectedLeague ? mockTeams[selectedLeague] || [] : [];
  const availablePlayers = selectedTeam ? mockPlayers[selectedTeam] || [] : [];
  
  // Generate mock player stats
  const playerStats = selectedPlayer ? generateMockStats(selectedPlayer, selectedLeague) : null;

  // Analytics calculations
  const GOLD = "#B59E5B";
  const GREEN = "#164A2F";
  const CHARCOAL = "#36454F";

  const formatPct = (v) =>
    v == null || Number.isNaN(Number(v)) ? "–" : `${(+v).toFixed(1)}%`;

  const mean = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const stdev = (arr) => {
    if (!arr.length) return 0;
    const m = mean(arr);
    const v = mean(arr.map((x) => (x - m) ** 2));
    return Math.sqrt(v);
  };

  const rollingAvg = (arr, window = 5) =>
    arr.map((_, i) => {
      const slice = arr.slice(Math.max(0, i - window + 1), i + 1);
      return mean(slice);
    });

  // Metric extractors based on league
  const metricExtractors = useMemo(() => {
    if (selectedLeague === "nfl") {
      return {
        gameLabel: (r, i) => r.game ?? r.week ?? i + 1,
        performance: (r) => Number(r.qbr ?? r.passerRating ?? 0),
        usage: (r) => Number(r.attempts ?? 0),
        efficiency: (r) => Number(r.qbr ?? r.passerRating ?? 0),
        cumulativeAtom: (r) => Number(r.touchdowns ?? 0),
      };
    }
    if (selectedLeague === "nba") {
      return {
        gameLabel: (r, i) => r.game ?? i + 1,
        performance: (r) => Number(r.tsPct != null ? r.tsPct * 100 : r.fieldGoalPct != null ? r.fieldGoalPct * 100 : 0),
        usage: (r) => Number((r.usage ?? 0) || (r.points ?? 0) + (r.assists ?? 0)),
        efficiency: (r) => Number(r.tsPct != null ? r.tsPct * 100 : r.fieldGoalPct != null ? r.fieldGoalPct * 100 : 0),
        cumulativeAtom: (r) => Number(r.points ?? 0),
      };
    }
    return {
      gameLabel: (r, i) => r.game ?? i + 1,
      performance: (r) => Number((r.battingAvg ?? 0) * 1000),
      usage: (r) => Number(r.atBats ?? 0),
      efficiency: (r) => Number((r.battingAvg ?? 0) * 1000),
      cumulativeAtom: (r) => Number(r.hits ?? 0),
    };
  }, [selectedLeague]);

  // Derived analytics data
  const derived = useMemo(() => {
    const rows = playerStats?.stats ?? [];
    const perfSeries = rows.map(metricExtractors.performance);
    const perfAvg = mean(perfSeries.filter((n) => Number.isFinite(n)));
    const perfRolling = rollingAvg(perfSeries, 5);

    const rollingData = rows.map((r, i) => ({
      game: metricExtractors.gameLabel(r, i),
      performance: perfSeries[i] ?? 0,
      rollingAvg: perfRolling[i] ?? 0,
    }));

    const cumulativeData = rows.map((r, i) => ({
      game: metricExtractors.gameLabel(r, i),
      cumulative: rows
        .slice(0, i + 1)
        .reduce((acc, s) => acc + (metricExtractors.cumulativeAtom(s) ?? 0), 0),
    }));

    const scatterData = rows.map((r) => ({
      usage: metricExtractors.usage(r) ?? 0,
      efficiency: metricExtractors.efficiency(r) ?? 0,
      size: 4 + Math.min(12, Math.max(0, (metricExtractors.usage(r) ?? 0) / 5)),
      game: r.game ?? "",
    }));

    // Performance distribution (5 bins)
    const perfVals = perfSeries.filter((n) => Number.isFinite(n));
    const minV = Math.min(...perfVals, 0);
    const maxV = Math.max(...perfVals, 1);
    const range = maxV - minV || 1;
    const bins = Array.from({ length: 5 }, (_, bi) => ({
      range: `${Math.round((minV + (range * bi) / 5) * 10) / 10}–${
        Math.round((minV + (range * (bi + 1)) / 5) * 10) / 10
      }`,
      count: 0,
    }));
    perfVals.forEach((v) => {
      const idx = Math.min(4, Math.floor(((v - minV) / range) * 5));
      bins[idx].count += 1;
    });

    const std = stdev(perfVals);
    const consistencyScore = Math.max(0, Math.min(100, 100 - (std / (range || 1)) * 100));
    
    // Generate heatmap (8x8 grid)
    const heatmap = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        heatmap.push({
          i, j,
          value: Math.random() * 0.8 + 0.2 // Random efficiency 0.2-1.0
        });
      }
    }

    return {
      perfAvg,
      rollingData,
      cumulativeData,
      scatterData,
      distData: bins,
      consistency: {
        score: Math.round(consistencyScore),
        std: +std.toFixed(2),
        floor: Math.min(...perfVals, 0),
        ceiling: Math.max(...perfVals, 0),
      },
      heatmap,
      gamesCount: rows.length,
    };
  }, [playerStats, metricExtractors]);

  const ready = !!selectedPlayer && !!playerStats;

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

  const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );

  const Select = ({ value, onValueChange, disabled = false, children }) => {
    return (
      <select 
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
    <div className="grid w-full grid-cols-5 bg-gray-100 rounded-lg p-1 mb-6">
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

  // Simple chart components (placeholders for future enhancement)
  const SimpleLineChart = ({ data, title }) => (
    <div className="h-80 flex flex-col">
      <div className="flex-1 relative border border-gray-200 rounded">
        <div className="absolute inset-4">
          <svg width="100%" height="100%" viewBox="0 0 400 200">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="25" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 25" fill="none" stroke="#e5e5e5" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Data line */}
            {data.length > 1 && (
              <polyline
                fill="none"
                stroke={GOLD}
                strokeWidth="2"
                points={data.map((d, i) => `${(i / (data.length - 1)) * 380 + 10},${190 - (d.performance / Math.max(...data.map(x => x.performance)) * 180)}`).join(' ')}
              />
            )}
            
            {/* Data points */}
            {data.map((d, i) => (
              <circle
                key={i}
                cx={(i / (data.length - 1)) * 380 + 10}
                cy={190 - (d.performance / Math.max(...data.map(x => x.performance)) * 180)}
                r="3"
                fill={GOLD}
              />
            ))}
          </svg>
        </div>
      </div>
      <div className="text-center text-sm text-gray-600 mt-2">{title}</div>
    </div>
  );

  const SimpleBarChart = ({ data, title }) => (
    <div className="h-64 flex flex-col">
      <div className="flex-1 relative border border-gray-200 rounded">
        <div className="absolute inset-4 flex items-end justify-around">
          {data.map((d, i) => {
            const maxCount = Math.max(...data.map(x => x.count));
            const height = maxCount > 0 ? (d.count / maxCount) * 180 : 0;
            return (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className="w-12 rounded-t"
                  style={{ 
                    height: `${height}px`,
                    backgroundColor: GOLD,
                    minHeight: '4px'
                  }}
                />
                <div className="text-xs text-gray-600 mt-1 text-center w-16">
                  {d.range}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center text-sm text-gray-600 mt-2">{title}</div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-3" style={{ color: CHARCOAL }} data-testid="analytics-title">
                <span>Sports Analytics</span>
                <Badge className="text-yellow-800 bg-yellow-100" data-testid="analytics-live-badge">
                  Live Data
                </Badge>
              </h1>
              <p className="text-gray-600 mt-1">Advanced player and team performance analytics</p>
            </div>
          </div>

          {/* Selection Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target style={{ color: GOLD }} size={20} />
                <span>Select Sport, Team & Player</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">Sport</label>
                  <Select
                    value={selectedLeague}
                    onValueChange={(value) => {
                      setSelectedLeague(value);
                      resetSelections();
                    }}
                  >
                    <SelectOption value="">Choose a sport</SelectOption>
                    {mockLeagues.map((league) => (
                      <SelectOption key={league.id} value={league.id}>
                        {league.name} — {league.sport}
                      </SelectOption>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">Team</label>
                  <Select
                    value={selectedTeam}
                    onValueChange={(value) => {
                      setSelectedTeam(value);
                      resetPlayer();
                    }}
                    disabled={!selectedLeague}
                  >
                    <SelectOption value="">{!selectedLeague ? "Choose a sport first" : "Choose a team"}</SelectOption>
                    {availableTeams.map((team) => (
                      <SelectOption key={team.id} value={team.id}>
                        {team.name}
                      </SelectOption>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">Player</label>
                  <Select
                    value={selectedPlayer}
                    onValueChange={setSelectedPlayer}
                    disabled={!selectedTeam}
                  >
                    <SelectOption value="">{!selectedTeam ? "Choose a team first" : "Choose a player"}</SelectOption>
                    {availablePlayers.map((player) => (
                      <SelectOption key={player.id} value={player.id}>
                        {player.number ? `#${player.number} ` : ""}
                        {player.name}
                        {player.position ? ` (${player.position})` : ""}
                      </SelectOption>
                    ))}
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Dashboard */}
          {ready ? (
            <Tabs defaultValue="performance">
              <TabsList>
                <TabsTrigger value="performance" data-testid="tab-performance">
                  Performance Trends
                </TabsTrigger>
                <TabsTrigger value="heatmaps" data-testid="tab-heatmaps">
                  Shot Maps & Heat
                </TabsTrigger>
                <TabsTrigger value="efficiency" data-testid="tab-efficiency">
                  Usage vs Efficiency
                </TabsTrigger>
                <TabsTrigger value="rankings" data-testid="tab-rankings">
                  Rankings Over Time
                </TabsTrigger>
                <TabsTrigger value="consistency" data-testid="tab-consistency">
                  Consistency Analysis
                </TabsTrigger>
              </TabsList>

              {/* Performance Trends */}
              <TabsContent value="performance">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Rolling Performance Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp style={{ color: GOLD }} size={20} />
                          <span>Rolling Performance (5-Game Avg)</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div data-testid="rolling-performance-chart">
                          <SimpleLineChart 
                            data={derived.rollingData} 
                            title={`Season Average: ${derived.perfAvg.toFixed(1)}`}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Cumulative Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Activity style={{ color: GOLD }} size={20} />
                          <span>Cumulative Performance</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div data-testid="cumulative-stats-chart">
                          <div className="h-80 flex flex-col">
                            <div className="flex-1 relative border border-gray-200 rounded">
                              <div className="absolute inset-4">
                                <svg width="100%" height="100%" viewBox="0 0 400 200">
                                  <defs>
                                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" style={{ stopColor: GOLD, stopOpacity: 0.3 }} />
                                      <stop offset="100%" style={{ stopColor: GOLD, stopOpacity: 0.1 }} />
                                    </linearGradient>
                                  </defs>
                                  {derived.cumulativeData.length > 1 && (
                                    <path
                                      d={`M 10,190 ${derived.cumulativeData.map((d, i) => `L ${(i / (derived.cumulativeData.length - 1)) * 380 + 10},${190 - (d.cumulative / Math.max(...derived.cumulativeData.map(x => x.cumulative)) * 180)}`).join(' ')} L 390,190 Z`}
                                      fill="url(#areaGrad)"
                                      stroke={GOLD}
                                      strokeWidth="2"
                                    />
                                  )}
                                </svg>
                              </div>
                            </div>
                            <div className="text-center text-sm text-gray-600 mt-2">
                              Total: {derived.cumulativeData[derived.cumulativeData.length - 1]?.cumulative || 0}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Heat Maps */}
              <TabsContent value="heatmaps">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin style={{ color: GOLD }} size={20} />
                        <span>Performance Heat Map</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="w-fit mx-auto" data-testid="performance-heatmap">
                        <div className="grid grid-cols-8 gap-1">
                          {derived.heatmap.map((cell, idx) => {
                            const v = cell.value;
                            const tone = v > 0.66 ? GOLD : v > 0.33 ? '#D4B76A' : '#E5E5E5';
                            return (
                              <div
                                key={`${cell.i}-${cell.j}-${idx}`}
                                className="w-8 h-8 rounded border"
                                style={{ backgroundColor: tone }}
                                title={`Zone ${idx + 1}: ${(v * 100).toFixed(0)}% efficiency`}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E5E5E5' }} />
                          <span>Low</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#D4B76A' }} />
                          <span>Medium</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: GOLD }} />
                          <span>High</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Usage vs Efficiency */}
              <TabsContent value="efficiency">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target style={{ color: GOLD }} size={20} />
                        <span>Usage vs Efficiency</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96" data-testid="usage-efficiency-scatter">
                        <div className="h-full relative border border-gray-200 rounded">
                          <div className="absolute inset-4">
                            <svg width="100%" height="100%" viewBox="0 0 400 300">
                              <defs>
                                <pattern id="scatterGrid" width="40" height="30" patternUnits="userSpaceOnUse">
                                  <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e5e5e5" strokeWidth="1"/>
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#scatterGrid)" />
                              
                              {/* Reference line for average */}
                              <line x1="0" y1={150 - (derived.perfAvg / 100 * 280)} x2="400" y2={150 - (derived.perfAvg / 100 * 280)} stroke={GREEN} strokeDasharray="4 4" />
                              
                              {/* Scatter points */}
                              {derived.scatterData.map((d, i) => {
                                const maxUsage = Math.max(...derived.scatterData.map(x => x.usage));
                                const maxEfficiency = Math.max(...derived.scatterData.map(x => x.efficiency));
                                const x = (d.usage / maxUsage) * 380 + 10;
                                const y = 290 - (d.efficiency / maxEfficiency) * 280;
                                return (
                                  <circle
                                    key={i}
                                    cx={x}
                                    cy={y}
                                    r={Math.max(3, d.size / 2)}
                                    fill={GOLD}
                                    fillOpacity={0.7}
                                  />
                                );
                              })}
                            </svg>
                          </div>
                        </div>
                        <div className="text-center text-sm text-gray-600 mt-2">
                          Usage (X) vs Efficiency (Y) • Avg Efficiency: {derived.perfAvg.toFixed(1)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Rankings Over Time */}
              <TabsContent value="rankings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Trophy style={{ color: GOLD }} size={20} />
                        <span>Performance Rankings Over Time</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80" data-testid="rankings-chart">
                        <div className="h-full text-center flex items-center justify-center border border-gray-200 rounded">
                          <div className="text-gray-500">
                            <Trophy className="mx-auto mb-2" size={32} />
                            <p>Rankings visualization</p>
                            <p className="text-sm">Games played: {derived.gamesCount}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Consistency */}
              <TabsContent value="consistency">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap style={{ color: GOLD }} size={20} />
                        <span>Performance Distribution & Consistency</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Distribution */}
                        <div data-testid="performance-distribution">
                          <SimpleBarChart 
                            data={derived.distData} 
                            title="Performance Distribution"
                          />
                        </div>

                        {/* Consistency Metrics */}
                        <div className="space-y-4" data-testid="consistency-metrics">
                          <h4 className="text-lg font-semibold text-gray-900">Consistency Metrics</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <p className="text-2xl font-bold text-gray-900">{derived.consistency.score}%</p>
                              <p className="text-sm text-gray-600">Consistency Score</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <p className="text-2xl font-bold text-gray-900">{derived.consistency.std}</p>
                              <p className="text-sm text-gray-600">Standard Deviation</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <p className="text-2xl font-bold text-gray-900">{derived.consistency.floor.toFixed(1)}</p>
                              <p className="text-sm text-gray-600">Floor</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <p className="text-2xl font-bold text-gray-900">{derived.consistency.ceiling.toFixed(1)}</p>
                              <p className="text-sm text-gray-600">Ceiling</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border-dashed border-2" style={{ borderColor: 'rgba(181, 158, 91, 0.3)' }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(181, 158, 91, 0.2)' }}>
                  <BarChart3 style={{ color: GOLD }} size={32} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Player to View Analytics</h2>
                <p className="text-gray-600 mb-6">
                  Choose a sport, team, and player above to access detailed performance analytics including rolling averages,
                  heat maps, efficiency analysis, and consistency metrics.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
