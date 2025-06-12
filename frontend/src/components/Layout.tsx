import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Briefcase, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Vertical Navigation */}
      <div className="w-64 bg-white shadow-sm">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <a href='/'>
            <span className="text-2xl font-bold text-primary">ResourceHub</span>
          </a>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary ${
                isActive ? 'text-primary bg-primary/5 border-r-4 border-primary' : ''
              }`
            }
          >
            <User className="h-5 w-5 mr-3" />
            Profile
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary ${
                isActive ? 'text-primary bg-primary/5 border-r-4 border-primary' : ''
              }`
            }
          >
            <Briefcase className="h-5 w-5 mr-3" />
            Projects
          </NavLink>
          <NavLink
            to="/engineers"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary ${
                isActive ? 'text-primary bg-primary/5 border-r-4 border-primary' : ''
              }`
            }
          >
            <Users className="h-5 w-5 mr-3" />
            Engineers
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}