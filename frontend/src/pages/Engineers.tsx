import React, { useState } from 'react';
import { ExternalLink, Info, AlertTriangle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockEngineers } from './ProjectManagement';
import { mockProjects } from './ProjectManagement';
import { Engineer } from '../types';

interface EngineerWithProjects extends Engineer {
  assignedProjects: {
    id: string;
    name: string;
    role: string;
    allocatedTime: number;
  }[];
}

const engineersWithProjects: EngineerWithProjects[] = mockEngineers.map(engineer => ({
  ...engineer,
  employeeType: 'full-time',
  assignedProjects: [
    {
      id: '1',
      name: 'E-commerce Platform Redesign',
      role: 'Lead Developer',
      allocatedTime: 60
    },
    {
      id: '2',
      name: 'Mobile App Development',
      role: 'Frontend Developer',
      allocatedTime: 50
    }
  ]
}));

export function Engineers() {
  const [showProjectsFor, setShowProjectsFor] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEngineer, setNewEngineer] = useState({
    name: '',
    email: '',
    employeeType: 'full-time' as 'full-time' | 'contractor'
  });

  const calculateTotalAllocation = (projects: EngineerWithProjects['assignedProjects']) => {
    return projects.reduce((total, project) => total + project.allocatedTime, 0);
  };

  const handleAddEngineer = () => {
    if (!newEngineer.name || !newEngineer.email) return;

    const engineer: EngineerWithProjects = {
      id: `eng-${Date.now()}`,
      name: newEngineer.name,
      email: newEngineer.email,
      employeeType: newEngineer.employeeType,
      skills: [],
      assignedProjects: [],
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    };

    engineersWithProjects.push(engineer);
    setShowAddModal(false);
    setNewEngineer({ name: '', email: '', employeeType: 'full-time' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Engineers</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Engineer
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Projects</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Allocation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {engineersWithProjects.map((engineer) => {
                  const totalAllocation = calculateTotalAllocation(engineer.assignedProjects);
                  const isOverallocated = totalAllocation > 100;

                  return (
                    <React.Fragment key={engineer.id}>
                      <tr className={isOverallocated ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={engineer.avatarUrl} alt="" />
                            </div>
                            <div className="ml-4">
                              <Link
                                to={`/engineers/${engineer.id}`}
                                className="text-sm font-medium text-primary hover:text-primary/80"
                              >
                                {engineer.name}
                              </Link>
                              <div className="text-sm text-gray-500">{engineer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-2">
                            {engineer.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setShowProjectsFor(showProjectsFor === engineer.id ? null : engineer.id)}
                            className="text-primary hover:text-primary/80 font-medium"
                          >
                            {engineer.assignedProjects.length} Projects
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`text-sm ${isOverallocated ? 'text-red-600' : 'text-gray-900'}`}>
                              {totalAllocation}%
                            </span>
                            {isOverallocated && (
                              <div className="relative ml-2">
                                <AlertTriangle
                                  className="h-4 w-4 text-red-500 cursor-help"
                                  onMouseEnter={() => setShowTooltip(`warning-${engineer.id}`)}
                                  onMouseLeave={() => setShowTooltip(null)}
                                />
                                {showTooltip === `warning-${engineer.id}` && (
                                  <div className="absolute z-10 w-48 px-2 py-1 -mt-1 text-sm bg-gray-900 text-white rounded-md transform -translate-x-1/2 left-1/2">
                                    Engineer is allocated more than 100% of their time
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/engineers/${engineer.id}`}
                            className="text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                      {showProjectsFor === engineer.id && (
                        <tr className="bg-gray-50">
                          <td colSpan={5} className="px-6 py-4">
                            <div className="space-y-2">
                              {engineer.assignedProjects.map((project) => (
                                <div
                                  key={project.id}
                                  className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                                >
                                  <div>
                                    <Link
                                      to={`/projects/${project.id}`}
                                      className="text-sm font-medium text-primary hover:text-primary/80"
                                    >
                                      {project.name}
                                    </Link>
                                    <div className="text-sm text-gray-500">{project.role}</div>
                                    <div className="text-sm text-gray-500">Allocated Time: {project.allocatedTime}%</div>
                                  </div>
                                  <Link
                                    to={`/projects/${project.id}`}
                                    className="text-primary hover:text-primary/80"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Engineer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Engineer</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newEngineer.name}
                  onChange={(e) => setNewEngineer({ ...newEngineer, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={newEngineer.email}
                  onChange={(e) => setNewEngineer({ ...newEngineer, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="employeeType" className="block text-sm font-medium text-gray-700">
                  Employee Type
                </label>
                <select
                  id="employeeType"
                  value={newEngineer.employeeType}
                  onChange={(e) => setNewEngineer({ ...newEngineer, employeeType: e.target.value as 'full-time' | 'contractor' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="full-time">Full-time Employee</option>
                  <option value="contractor">Contractor</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEngineer}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
                >
                  Add Engineer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}