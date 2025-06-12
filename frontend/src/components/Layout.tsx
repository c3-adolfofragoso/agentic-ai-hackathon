import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Briefcase, User, BarChart3, Bell, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-dark-primary text-white">
      {/* Vertical Navigation */}
      <div className="w-16 bg-dark-secondary border-r border-dark-border flex flex-col items-center py-4">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
        </div>
        
        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-tertiary'
              }`
            }
            title="Dashboard"
          >
            <BarChart3 className="h-5 w-5" />
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-tertiary'
              }`
            }
            title="Profile"
          >
            <User className="h-5 w-5" />
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-tertiary'
              }`
            }
            title="Projects"
          >
            <Briefcase className="h-5 w-5" />
          </NavLink>
          <NavLink
            to="/engineers"
            className={({ isActive }) =>
              `p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-tertiary'
              }`
            }
            title="Engineers"
          >
            <Users className="h-5 w-5" />
          </NavLink>
        </nav>

        {/* Bottom Icons */}
        <div className="mt-auto flex flex-col space-y-4">
          <button className="p-3 rounded-lg text-gray-400 hover:text-white hover:bg-dark-tertiary transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-3 rounded-lg text-gray-400 hover:text-white hover:bg-dark-tertiary transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}