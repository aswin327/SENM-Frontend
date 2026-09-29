export interface WorkspaceOverviewData {
  property: string;
  projectType: string;
  stage: string;
  requiredScope: string;
  targetCompletion: string;
  quote: string;
}

export interface WorkspaceTimelineItem {
  id: string;
  title: string;
  statusText: string;
  state: 'done' | 'current' | 'upcoming';
}

export interface WorkspaceScopeItem {
  id: string;
  title: string;
  description: string;
}

export interface WorkspaceDocument {
  id: string;
  type: string;
  title: string;
  meta: string;
  status: string;
  statusState: 'CURRENT' | 'REFERENCE' | 'AGREED';
}

export interface WorkspaceMessage {
  id: string;
  text: string;
  isMe: boolean;
}

export interface WorkspaceDeliveryStage {
  id: string;
  stepNum: string;
  title: string;
  meta: string;
  state: 'done' | 'current' | 'upcoming';
}

export interface WorkspaceData {
  title: string;
  clientInfo: string;
  statusBadge: string;
  progressPercent: number;
  nextAction: string;
  overview: WorkspaceOverviewData;
  timeline: WorkspaceTimelineItem[];
  scope: WorkspaceScopeItem[];
  documents: WorkspaceDocument[];
  messages: WorkspaceMessage[];
  deliveryStages: WorkspaceDeliveryStage[];
}
