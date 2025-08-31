'use client'

import { Coins, Trophy, User, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header style={{ backgroundColor: '#164A2F' }} className="text-white py-8 px-6 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Left Section - Brand */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold tracking-widest uppercase"
              style={{
                color: '#B59E5B',
                fontFamily: 'Times New Roman, serif',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                letterSpacing: '0.2em'
              }}>
            TYCHE EDGE
          </h1>
        </div>
        
        {/* Right Section - User Info */}
        <div className="flex items-center space-x-6">
          {/* Stats (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Coins style={{ color: '#B59E5B' }} size={20} />
              <span className="font-semibold">$2,450</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy style={{ color: '#B59E5B' }} size={20} />
              <span className="font-semibold">Rank #21</span>
            </div>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: '#B59E5B' }}>
              <User style={{ color: '#164A2F' }} size={16} />
            </div>
            <span className="hidden sm:block font-medium">Angela Gibson</span>
            <ChevronDown className="text-sm" size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
