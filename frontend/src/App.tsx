import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Users, Briefcase, TrendingUp, Activity } from 'lucide-react';
import { Layout } from './components/Layout';
import { DashboardCard } from './components/DashboardCard';
import { ProjectManagement } from './pages/ProjectManagement';
import { ProjectDetail } from './pages/ProjectDetail';
import { Engineers } from './pages/Engineers';
import { EngineerDetails } from './pages/EngineerDetails';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      {/* Header */}
      <div className="border-b border-dark-border bg-dark-secondary">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">ResourceHub</h1>
              <p className="text-gray-400 text-sm">Engineering Resource Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Activity className="h-4 w-4 text-secondary" />
                <span>System Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div onClick={() => navigate('/engineers')} className="cursor-pointer">
            <DashboardCard
              title="Registered Engineers"
              value={42}
              icon={<Users className="h-6 w-6 text-primary" />}
              trend={{ value: 12, isPositive: true }}
            />
          </div>
          <div onClick={() => navigate('/projects')} className="cursor-pointer">
            <DashboardCard
              title="Active Projects"
              value={18}
              icon={<Briefcase className="h-6 w-6 text-secondary" />}
              trend={{ value: 8, isPositive: true }}
            />
          </div>
          <DashboardCard
            title="Avg. Allocation"
            value="87%"
            icon={<TrendingUp className="h-6 w-6 text-accent" />}
            trend={{ value: 5, isPositive: true }}
          />
          <DashboardCard
            title="Efficiency Score"
            value="94.2"
            icon={<Activity className="h-6 w-6 text-warning" />}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <button 
              onClick={() => navigate('/projects')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              New Project
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 border border-dark-border text-sm font-medium rounded-lg text-gray-300 bg-dark-secondary hover:bg-dark-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
              Import from Jira
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 border border-dark-border text-sm font-medium rounded-lg text-gray-300 bg-dark-secondary hover:bg-dark-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectManagement />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/engineers" element={<Engineers />} />
          <Route path="/engineers/:id" element={<EngineerDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}