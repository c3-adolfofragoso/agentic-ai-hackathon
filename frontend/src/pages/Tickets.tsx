import React, { useState } from 'react';
import { Plus, Ticket, Clock, User, AlertCircle, CheckCircle, Download } from 'lucide-react';

const Tickets: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: 'Database Performance Optimization',
      description: 'Need to optimize database queries for better performance',
      priority: 'High',
      status: 'Open',
      assignee: 'John Doe',
      createdAt: '2024-01-15',
      type: 'Bug'
    },
    {
      id: 2,
      title: 'Add User Authentication',
      description: 'Implement user login and registration functionality',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Jane Smith',
      createdAt: '2024-01-14',
      type: 'Feature'
    },
    {
      id: 3,
      title: 'Update API Documentation',
      description: 'Documentation needs to be updated with new endpoints',
      priority: 'Low',
      status: 'Completed',
      assignee: 'Mike Johnson',
      createdAt: '2024-01-13',
      type: 'Task'
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    type: 'Task',
    assignee: ''
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTicket.title && newTicket.description) {
      const ticket = {
        id: tickets.length + 1,
        ...newTicket,
        status: 'Open',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTickets([ticket, ...tickets]);
      setNewTicket({
        title: '',
        description: '',
        priority: 'Medium',
        type: 'Task',
        assignee: ''
      });
      setShowCreateForm(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tickets</h1>
          <p className="text-gray-600">Manage and track your project tickets</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Tickets
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{tickets.length}</p>
            </div>
            <Ticket className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {tickets.filter(t => t.status === 'Open').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {tickets.filter(t => t.status === 'Completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Create Ticket Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Ticket</h2>
          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ticket title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                <input
                  type="text"
                  value={newTicket.assignee}
                  onChange={(e) => setNewTicket({ ...newTicket, assignee: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Assign to team member"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the ticket details"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newTicket.type}
                  onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Task">Task</option>
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Create Ticket
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tickets List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Tickets</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(ticket.status)}
                    <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{ticket.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{ticket.assignee || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {ticket.type}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                    ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {tickets.length === 0 && (
        <div className="text-center py-12">
          <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-500 mb-4">Create your first ticket to get started</p>
        </div>
      )}
    </div>
  );
};

export default Tickets;