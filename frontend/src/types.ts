export interface Engineer {
  id: string;
  name: string;
  email: string;
  skills: string[];
  avatarUrl?: string;
  featureAssignments?: FeatureAssignment[];
  employeeType: 'full-time' | 'contractor';
}

export interface FeatureAssignment {
  featureId: string;
  featureName: string;
  projectId: string;
  projectName: string;
  allocatedTime: number;
  similarityScore: number;
  similarityExplanation: string;
  isManualAssignment: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  deadline: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  teamSize: number;
  features: Feature[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  assignedEngineers: Engineer[];
}

export interface JiraTicket {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  actualTime: number;
  status: string;
  createdAt: string;
  closedAt: string;
}