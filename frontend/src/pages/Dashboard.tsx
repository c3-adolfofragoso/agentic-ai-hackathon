import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Ticket, 
  TrendingUp, 
  Users, 
  Clock,
  ArrowRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Total Uploads', value: '24', icon: Upload, color: 'text-blue-600' },
    { name: 'Active Specs', value: '12', icon: FileText, color: 'text-green-600' },
    { name: 'Open Tickets', value: '8', icon: Ticket, color: 'text-orange-600' },
    { name: 'Team Members', value: '16', icon: Users, color: 'text-purple-600' },
  ];

  const recentActivity = [
    { action: 'New file uploaded', file: 'project-specs.pdf', time: '2 minutes ago' },
    { action: 'Ticket created', file: 'Database optimization', time: '15 minutes ago' },
    { action: 'Spec updated', file: 'API documentation', time: '1 hour ago' },
    { action: 'File shared', file: 'design-mockups.zip', time: '2 hours ago' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              to="/uploads" 
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <Upload className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Upload Files</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
            </Link>
            <Link 
              to="/tickets" 
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-orange-50 hover:border-orange-200 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <Ticket className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-900">Create Ticket</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors duration-200" />
            </Link>
            <Link 
              to="/specs" 
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">View Specs</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.file}</p>
                  <div className="flex items-center mt-1">
                    <Clock className="w-3 h-3 text-gray-400 mr-1" />
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;