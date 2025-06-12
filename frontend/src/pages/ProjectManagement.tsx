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
      borderColor: '#2563EB',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </button>
        </div>

        {/* KPIs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Progress</p>
                <p className="text-2xl font-semibold text-gray-900">{averageProgress}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue Projects</p>
                <p className="text-2xl font-semibold text-red-600">{overdueProjects.length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                <p className="text-2xl font-semibold text-green-600">{mockProjects.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project Progress Trend</h3>
            <Line data={projectProgressData} options={{ responsive: true }} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team Size Distribution</h3>
            <Line data={teamSizeData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h2>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {upcomingProjects.slice(0, 3).map((project) => (
                <li key={project.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-sm font-medium text-primary hover:text-primary/80"
                      >
                        {project.name}
                      </Link>
                      <p className="text-sm text-gray-500">{project.description}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(project.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Active Projects Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Active Projects</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <Link 
                          to={`/projects/${project.id}`}
                          className="text-sm font-medium text-primary hover:text-primary/80"
                        >
                          {project.name}
                        </Link>
                        <div className="text-sm text-gray-500">{project.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-2" />
                        {project.teamSize} members
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-500">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Project</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input
                    type="text"
                    id="projectName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                  <input
                    type="date"
                    id="deadline"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Document Upload</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
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
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90"
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
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                    </div>
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-500">
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsNewProjectModalOpen(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
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