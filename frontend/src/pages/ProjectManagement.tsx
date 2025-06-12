import React, { useState } from 'react';
import { Plus, Edit2, ExternalLink, Calendar, Users, Clock, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import { Project, Engineer } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const mockEngineers: Engineer[] = [
  {
    id: 'eng-1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    skills: ['React', 'TypeScript', 'Node.js'],
    employeeType: 'full-time',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    featureAssignments: [
      {
        featureId: 'F1',
        featureName: 'User Authentication System',
        projectId: '1',
        projectName: 'E-commerce Platform Redesign',
        allocatedTime: 60,
        similarityScore: 85,
        similarityExplanation: 'Strong match based on previous auth system work',
        isManualAssignment: false
      }
    ]
  },
  {
    id: 'eng-2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    skills: ['JavaScript', 'Vue.js', 'CSS'],
    employeeType: 'contractor',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    featureAssignments: [
      {
        featureId: 'F2',
        featureName: 'Product Catalog',
        projectId: '1',
        projectName: 'E-commerce Platform Redesign',
        allocatedTime: 80,
        similarityScore: 90,
        similarityExplanation: 'Extensive experience with product listing UIs',
        isManualAssignment: true
      }
    ]
  },
  {
    id: 'eng-3',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    skills: ['Python', 'Django', 'PostgreSQL'],
    employeeType: 'full-time',
    avatarUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    featureAssignments: [
      {
        featureId: 'F3',
        featureName: 'Shopping Cart',
        projectId: '1',
        projectName: 'E-commerce Platform Redesign',
        allocatedTime: 70,
        similarityScore: 75,
        similarityExplanation: 'Previous experience with e-commerce backends',
        isManualAssignment: false
      }
    ]
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    description: 'Complete overhaul of the customer-facing e-commerce platform',
    deadline: '2024-06-30',
    status: 'active',
    progress: 75,
    teamSize: 8,
    features: []
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android',
    deadline: '2024-08-15',
    status: 'active',
    progress: 45,
    teamSize: 6,
    features: []
  },
  {
    id: '3',
    name: 'API Modernization',
    description: 'Upgrading legacy APIs to modern REST architecture',
    deadline: '2024-07-20',
    status: 'active',
    progress: 60,
    teamSize: 4,
    features: []
  },
  {
    id: '4',
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics dashboard for business metrics',
    deadline: '2024-09-01',
    status: 'active',
    progress: 30,
    teamSize: 5,
    features: []
  },
  {
    id: '5',
    name: 'Authentication System',
    description: 'Implementation of SSO and 2FA features',
    deadline: '2024-05-30',
    status: 'active',
    progress: 85,
    teamSize: 3,
    features: []
  }
];

const projectProgressData: ChartData<'line'> = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Average Project Progress',
      data: [30, 45, 57, 68, 75, 85],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }
  ]
};

const teamSizeData: ChartData<'line'> = {
  labels: mockProjects.map(project => project.name),
  datasets: [
    {
      label: 'Team Size',
      data: mockProjects.map(project => project.teamSize),
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4
    }
  ]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#9CA3AF'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#9CA3AF'
      },
      grid: {
        color: '#374151'
      }
    },
    y: {
      ticks: {
        color: '#9CA3AF'
      },
      grid: {
        color: '#374151'
      }
    }
  }
};

export function ProjectManagement() {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const today = new Date();
  const overdueProjects = mockProjects.filter(
    project => new Date(project.deadline) < today
  );
  const upcomingProjects = mockProjects
    .filter(project => new Date(project.deadline) > today)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  const averageProgress = Math.round(
    mockProjects.reduce((acc, project) => acc + project.progress, 0) / mockProjects.length
  );

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      {/* Header */}
      <div className="border-b border-dark-border bg-dark-secondary">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Project Management</h1>
              <p className="text-gray-400 text-sm">Manage and track all engineering projects</p>
            </div>
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPIs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-secondary border border-dark-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Average Progress</p>
                <p className="text-3xl font-bold text-white">{averageProgress}%</p>
              </div>
              <div className="p-3 bg-primary/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-dark-secondary border border-dark-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Overdue Projects</p>
                <p className="text-3xl font-bold text-error">{overdueProjects.length}</p>
              </div>
              <div className="p-3 bg-error/20 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-error" />
              </div>
            </div>
          </div>

          <div className="bg-dark-secondary border border-dark-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Projects</p>
                <p className="text-3xl font-bold text-secondary">{mockProjects.length}</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-dark-secondary border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">Project Progress Trend</h3>
            <Line data={projectProgressData} options={chartOptions} />
          </div>

          <div className="bg-dark-secondary border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">Team Size Distribution</h3>
            <Line data={teamSizeData} options={chartOptions} />
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-dark-secondary border border-dark-border rounded-xl mb-8">
          <div className="px-6 py-4 border-b border-dark-border">
            <h2 className="text-lg font-medium text-white">Upcoming Deadlines</h2>
          </div>
          <div className="divide-y divide-dark-border">
            {upcomingProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-sm font-medium text-primary hover:text-primary/80"
                    >
                      {project.name}
                    </Link>
                    <p className="text-sm text-gray-400">{project.description}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(project.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects Table */}
        <div className="bg-dark-secondary border border-dark-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-dark-border">
            <h2 className="text-lg font-medium text-white">Active Projects</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-dark-border">
              <thead className="bg-dark-tertiary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {mockProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-dark-tertiary transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <Link 
                          to={`/projects/${project.id}`}
                          className="text-sm font-medium text-primary hover:text-primary/80"
                        >
                          {project.name}
                        </Link>
                        <div className="text-sm text-gray-400">{project.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-300">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-300">
                        <Users className="h-4 w-4 mr-2" />
                        {project.teamSize} members
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-dark-tertiary rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-300">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button className="text-primary hover:text-primary/80 mr-4">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="text-primary hover:text-primary/80">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Project Modal */}
        {isNewProjectModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-dark-secondary border border-dark-border rounded-xl p-8 max-w-2xl w-full mx-4">
              <h3 className="text-lg font-medium text-white mb-6">Create New Project</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                  <input
                    type="text"
                    id="projectName"
                    className="w-full rounded-lg border border-dark-border bg-dark-tertiary text-white px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full rounded-lg border border-dark-border bg-dark-tertiary text-white px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
                  <input
                    type="date"
                    id="deadline"
                    className="w-full rounded-lg border border-dark-border bg-dark-tertiary text-white px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Document Upload</label>
                  <div className="border-2 border-dashed border-dark-border rounded-lg p-6 text-center">
                    <div className="space-y-2">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer text-primary hover:text-primary/80"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <span> or drag and drop</span>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                    </div>
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-400">
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsNewProjectModalOpen(false)}
                    className="px-4 py-2 border border-dark-border rounded-lg text-sm font-medium text-gray-300 bg-dark-tertiary hover:bg-dark-border transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors">
                    Create Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}