'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BarChart3, 
  MessageCircle, 
  Trophy, 
  User,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Predictions', href: '/predictions', icon: TrendingUp },
  { name: 'Chat', href: '/chat', icon: MessageCircle },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: '#164A2F' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ background: 'linear-gradient(45deg, #164A2F, #B59E5B)' }}
              >
                TE
              </div>
              <span className="text-xl font-bold text-white">
                Tyche-Edge
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-gray-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(45deg, #164A2F, #B59E5B)'
                  } : {}}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Sign In Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <button 
                className="px-6 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#B59E5B',
                  boxShadow: '0 2px 4px rgba(181, 158, 91, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#A08D52';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(181, 158, 91, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#B59E5B';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(181, 158, 91, 0.2)';
                }}
              >
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white border-opacity-20" style={{ backgroundColor: '#164A2F' }}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-gray-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(45deg, #164A2F, #B59E5B)'
                  } : {}}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Mobile Sign In */}
            <div className="pt-4 pb-2">
              <button 
                className="w-full px-6 py-3 text-base font-semibold text-white rounded-lg transition-all"
                style={{ 
                  backgroundColor: '#B59E5B',
                  boxShadow: '0 2px 4px rgba(181, 158, 91, 0.2)'
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}