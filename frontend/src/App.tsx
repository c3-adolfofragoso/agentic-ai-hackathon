import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Users, Briefcase } from 'lucide-react';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { DashboardCard } from './components/DashboardCard';
import { ProjectManagement } from './pages/ProjectManagement';
import { ProjectDetail } from './pages/ProjectDetail';
import { Engineers } from './pages/Engineers';
import { EngineerDetails } from './pages/EngineerDetails';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <div onClick={() => navigate('/engineers')} className="cursor-pointer">
              <DashboardCard
                title="Registered Engineers"
                value={42}
                icon={<Users className="h-6 w-6 text-[#2563EB]" />}
                trend={{ value: 12, isPositive: true }}
              />
            </div>
            <div onClick={() => navigate('/projects')} className="cursor-pointer">
              <DashboardCard
                title="Active Projects"
                value={18}
                icon={<Briefcase className="h-6 w-6 text-[#2563EB]" />}
                trend={{ value: 8, isPositive: true }}
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button 
                onClick={() => navigate('/projects')}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2563EB] hover:bg-[#2563EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]"
              >
                New Project
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]">
                Import from Jira
              </button>
            </div>
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