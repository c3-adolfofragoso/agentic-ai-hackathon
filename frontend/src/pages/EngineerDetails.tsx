import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Clock, Info, UserPlus, Bot } from 'lucide-react';
import { Engineer, JiraTicket } from '../types';
import { mockEngineers } from './ProjectManagement';

const mockJiraTickets: JiraTicket[] = [
  {
    id: 'PROJ-123',
    title: 'Implement OAuth Authentication',
    description: 'Set up OAuth 2.0 with social login providers',
    estimatedTime: 8,
    actualTime: 6,
    status: 'Done',
    createdAt: '2024-02-15',
    closedAt: '2024-02-16'
  },
  {
    id: 'PROJ-124',
    title: 'User Profile Page',
    description: 'Create responsive user profile page with edit capabilities',
    estimatedTime: 12,
    actualTime: 14,
    status: 'Done',
    createdAt: '2024-02-17',
    closedAt: '2024-02-19'
  }
];

export function EngineerDetails() {
  const { id } = useParams<{ id: string }>();
  const engineer = mockEngineers.find(eng => eng.id === id);
  const [showTooltip, setShowTooltip] = React.useState<string | null>(null);

  if (!engineer) {
    return <div>Engineer not found</div>;
  }

  const calculateTotalAllocation = () => {
    return engineer.featureAssignments?.reduce((total, assignment) => total + assignment.allocatedTime, 0) || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Engineer Profile */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <img
                className="h-16 w-16 rounded-full"
                src={engineer.avatarUrl}
                alt={engineer.name}
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{engineer.name}</h1>
                <p className="text-sm text-gray-500">{engineer.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {engineer.employeeType === 'full-time' ? 'Full-time Employee' : 'Contractor'}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {engineer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Current Assignments */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Current Assignments</h2>
            <p className="mt-1 text-sm text-gray-500">
              Total Allocation: {calculateTotalAllocation()}%
            </p>
          </div>
          <div className="overflow-x-auto">
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
                {engineer.featureAssignments?.map((assignment, idx) => (
                  <tr key={`${assignment.featureId}-${idx}`}>
                    <td className="px-6 py-2 text-sm text-gray-900">{assignment.featureName}</td>
                    <td className="px-6 py-2">
                      <Link
                        to={`/projects/${assignment.projectId}`}
                        className="text-sm text-primary hover:text-primary/80"
                      >
                        {assignment.projectName}
                      </Link>
                    </td>
                    <td className="px-6 py-2 text-sm text-gray-500">{assignment.allocatedTime}%</td>
                    <td className="px-6 py-2">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{assignment.similarityScore}%</span>
                        <div className="relative ml-2">
                          <Info
                            className="h-4 w-4 text-gray-400 cursor-help"
                            onMouseEnter={() => setShowTooltip(`similarity-${idx}`)}
                            onMouseLeave={() => setShowTooltip(null)}
                          />
                          {showTooltip === `similarity-${idx}` && (
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
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      <a
                        href={`https://jira.company.com/browse/${assignment.featureId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Jira History */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Ticket History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockJiraTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                      <div className="text-sm text-gray-500">{ticket.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{ticket.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {ticket.actualTime}h / {ticket.estimatedTime}h
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a
                        href={`https://jira.company.com/browse/${ticket.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}