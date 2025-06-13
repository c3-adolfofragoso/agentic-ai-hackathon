import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Upload, 
  FileText, 
  Ticket, 
  Settings, 
  Building2 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Uploads', href: '/uploads', icon: Upload },
  { name: 'Specs', href: '/specs', icon: FileText },
  { name: 'Tickets', href: '/tickets', icon: Ticket },
  { name: 'Engineers', href: '/engineers', icon: Ticket },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo/Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/settings"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            location.pathname === '/settings'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Settings className={`w-5 h-5 ${
            location.pathname === '/settings' ? 'text-blue-600' : 'text-gray-400'
          }`} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;