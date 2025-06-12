import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, Info, GripVertical, AlertTriangle, ChevronDown, ChevronUp, Edit2, Trash2, Bot, UserPlus } from 'lucide-react';
import { Engineer, Project, FeatureAssignment } from '../types';
import { mockEngineers } from './ProjectManagement';

interface AssignedEngineer extends Engineer {
  featureAssignments: FeatureAssignment[];
}

const mockProjectDetails: Record<string, Project & { assignedEngineers: AssignedEngineer[] }> = {
  '1': {
    id: '1',
    name: 'E-commerce Platform Redesign',
    description: 'Complete overhaul of the customer-facing e-commerce platform',
    deadline: '2024-06-30',
    status: 'active',
    progress: 75,
    teamSize: 8,
    features: [
      { id: 'F1', title: 'User Authentication System', description: 'Implement OAuth 2.0 with social login', assignedEngineers: [] },
      { id: 'F2', title: 'Product Catalog', description: 'Responsive product grid with filtering', assignedEngineers: [] },
      { id: 'F3', title: 'Shopping Cart', description: 'Real-time cart updates with local storage', assignedEngineers: [] }
    ],
    assignedEngineers: mockEngineers.map(eng => ({
      ...eng,
      featureAssignments: eng.featureAssignments?.map(assignment => ({
        ...assignment,
        isManualAssignment: false
      })) || []
    }))
  }
};

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = mockProjectDetails[id || '1'];
  const [engineers, setEngineers] = useState<AssignedEngineer[]>(project.assignedEngineers);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState<{ engineer: AssignedEngineer; feature: string } | null>(null);
  const [allocatedTime, setAllocatedTime] = useState(100);
  const draggedEngineer = useRef<AssignedEngineer | null>(null);
  const [expandedEngineers, setExpandedEngineers] = useState<string[]>([]);
  const [editingAssignment, setEditingAssignment] = useState<{
    engineerId: string;
    assignmentIndex: number;
    allocatedTime: number;
  } | null>(null);

  const toggleEngineerDetails = (engineerId: string) => {
    setExpandedEngineers(prev => 
      prev.includes(engineerId) 
        ? prev.filter(id => id !== engineerId)
        : [...prev, engineerId]
    );
  };

  const calculateTotalAllocation = (assignments: FeatureAssignment[]) => {
    return assignments.reduce((total, assignment) => total + assignment.allocatedTime, 0);
  };

  const handleDragStart = (engineer: AssignedEngineer) => {
    draggedEngineer.current = engineer;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-primary/5');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-primary/5');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, feature: { id: string; title: string }) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-primary/5');
    
    if (draggedEngineer.current) {
      setSelectedEngineer({
        engineer: draggedEngineer.current,
        feature: feature.title
      });
      setShowTimeModal(true);
    }
  };

  const handleTimeAllocation = () => {
    if (selectedEngineer) {
      const updatedEngineers = engineers.map(eng => {
        if (eng.id === selectedEngineer.engineer.id) {
          const newAssignment: FeatureAssignment = {
            featureId: project.features.find(f => f.title === selectedEngineer.feature)?.id || '',
            featureName: selectedEngineer.feature,
            projectId: project.id,
            projectName: project.name,
            allocatedTime: allocatedTime,
            similarityScore: 85,
            similarityExplanation: 'Matched based on skill set and previous work',
            isManualAssignment: true
          };

          return {
            ...eng,
            featureAssignments: [...(eng.featureAssignments || []), newAssignment]
          };
        }
        return eng;
      });

      setEngineers(updatedEngineers);
      setShowTimeModal(false);
      setSelectedEngineer(null);
      setAllocatedTime(100);
    }
  };

  const handleRemoveEngineer = (engineerId: string) => {
    setEngineers(engineers.filter(eng => eng.id !== engineerId));
  };

  const handleAddEngineer = () => {
    const availableEngineers = mockEngineers.filter(
      eng => !engineers.find(assigned => assigned.id === eng.id)
    );
    if (availableEngineers.length > 0) {
      const newEngineer: AssignedEngineer = {
        ...availableEngineers[0],
        featureAssignments: []
      };
      setEngineers([...engineers, newEngineer]);
    }
  };

  const handleEditAssignment = (engineerId: string, assignmentIndex: number, currentTime: number) => {
    setEditingAssignment({
      engineerId,
      assignmentIndex,
      allocatedTime: currentTime
    });
  };

  const handleUpdateAssignment = () => {
    if (!editingAssignment) return;

    setEngineers(engineers.map(eng => {
      if (eng.id === editingAssignment.engineerId) {
        const updatedAssignments = [...eng.featureAssignments];
        updatedAssignments[editingAssignment.assignmentIndex] = {
          ...updatedAssignments[editingAssignment.assignmentIndex],
          allocatedTime: editingAssignment.allocatedTime
        };
        return { ...eng, featureAssignments: updatedAssignments };
      }
      return eng;
    }));

    setEditingAssignment(null);
  };

  const handleDeleteAssignment = (engineerId: string, assignmentIndex: number) => {
    setEngineers(engineers.map(eng => {
      if (eng.id === engineerId) {
        const updatedAssignments = eng.featureAssignments.filter((_, idx) => idx !== assignmentIndex);
        return { ...eng, featureAssignments: updatedAssignments };
      }
      return eng;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Project Header */}
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span className="mr-4">Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
              <span>Progress: {project.progress}%</span>
            </div>
          </div>

          {/* Features Section */}
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Features</h2>
            <div className="space-y-4">
              {project.features.map(feature => (
                <div
                  key={feature.id}
                  className="border rounded-lg p-4"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, feature)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <a
                      href={`https://jira.company.com/browse/${feature.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Engineers Section */}
          <div className="px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Assigned Engineers</h2>
              <button
                onClick={handleAddEngineer}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
              >
                Add Engineer
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Features</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Allocation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {engineers.map((engineer) => {
                    const totalAllocation = calculateTotalAllocation(engineer.featureAssignments);
                    const isOverallocated = totalAllocation > 100;

                    return (
                      <React.Fragment key={engineer.id}>
                        <tr
                          draggable
                          onDragStart={() => handleDragStart(engineer)}
                          className={`hover:bg-gray-50 cursor-move ${isOverallocated ? 'bg-red-50' : ''}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <GripVertical className="h-4 w-4 text-gray-400" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src={engineer.avatarUrl} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{engineer.name}</div>
                                <div className="text-sm text-gray-500">{engineer.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => toggleEngineerDetails(engineer.id)}
                              className="inline-flex items-center text-primary hover:text-primary/80"
                            >
                              {engineer.featureAssignments.length} Features
                              {expandedEngineers.includes(engineer.id) ? (
                                <ChevronUp className="ml-1 h-4 w-4" />
                              ) : (
                                <ChevronDown className="ml-1 h-4 w-4" />
                              )}
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
                            <button
                              onClick={() => handleRemoveEngineer(engineer.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                        {expandedEngineers.includes(engineer.id) && (
                          <tr className="bg-gray-50">
                            <td colSpan={5} className="px-6 py-4">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Feature</th>
                                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Project</th>
                                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Allocated Time</th>
                                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Similarity Score</th>
                                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Assignment Type</th>
                                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {engineer.featureAssignments.map((assignment, idx) => (
                                    <tr key={`${assignment.featureId}-${idx}`}>
                                      <td className="px-6 py-2 text-sm text-gray-900">{assignment.featureName}</td>
                                      <td className="px-6 py-2 text-sm text-gray-500">{assignment.projectName}</td>
                                      <td className="px-6 py-2 text-sm text-gray-500">
                                        {editingAssignment?.engineerId === engineer.id && 
                                         editingAssignment?.assignmentIndex === idx ? (
                                          <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={editingAssignment.allocatedTime}
                                            onChange={(e) => setEditingAssignment({
                                              ...editingAssignment,
                                              allocatedTime: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                                            })}
                                            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                          />
                                        ) : (
                                          `${assignment.allocatedTime}%`
                                        )}
                                      </td>
                                      <td className="px-6 py-2">
                                        <div className="flex items-center">
                                          <span className="text-sm text-gray-900">{assignment.similarityScore}%</span>
                                          <div className="relative ml-2">
                                            <Info
                                              className="h-4 w-4 text-gray-400 cursor-help"
                                              onMouseEnter={() => setShowTooltip(`${engineer.id}-${idx}`)}
                                              onMouseLeave={() => setShowTooltip(null)}
                                            />
                                            {showTooltip === `${engineer.id}-${idx}` && (
                                              <div className="absolute z-10 w-48 px-2 py-1 -mt-1 text-sm bg-gray-900 text-white rounded-md transform -translate-x-1/2 left-1/2">
                                                {assignment.similarityExplanation}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-6 py-2 text-sm text-gray-500">
                                        {assignment.isManualAssignment ? (
                                          <div className="flex items-center">
                                            <UserPlus className="h-4 w-4 text-primary" />
                                            <span className="ml-1">Manual</span>
                                          </div>
                                        ) : (
                                          <div className="flex items-center">
                                            <Bot className="h-4 w-4 text-gray-500" />
                                            <span className="ml-1">Automatic</span>
                                          </div>
                                        )}
                                      </td>
                                      <td className="px-6 py-2 text-sm">
                                        {editingAssignment?.engineerId === engineer.id && 
                                         editingAssignment?.assignmentIndex === idx ? (
                                          <div className="flex space-x-2">
                                            <button
                                              onClick={handleUpdateAssignment}
                                              className="text-primary hover:text-primary/80"
                                            >
                                              Save
                                            </button>
                                            <button
                                              onClick={() => setEditingAssignment(null)}
                                              className="text-gray-500 hover:text-gray-700"
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="flex space-x-2">
                                            <button
                                              onClick={() => handleEditAssignment(engineer.id, idx, assignment.allocatedTime)}
                                              className="text-primary hover:text-primary/80"
                                            >
                                              <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                              onClick={() => handleDeleteAssignment(engineer.id, idx)}
                                              className="text-red-600 hover:text-red-900"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </button>
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
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
      </div>

      {/* Time Allocation Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Allocate Time for {selectedEngineer?.engineer.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Specify the percentage of time this engineer should dedicate to {selectedEngineer?.feature}
            </p>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time Allocation (%)
              </label>
              <input
                type="number"
                id="time"
                min="0"
                max="100"
                value={allocatedTime}
                onChange={(e) => setAllocatedTime(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowTimeModal(false);
                  setSelectedEngineer(null);
                  setAllocatedTime(100);
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleTimeAllocation}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}