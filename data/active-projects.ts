import type { ActiveProjectCard, PipelineProject } from '@/types/active-project';

export const activeProjectCards: ActiveProjectCard[] = [
  {
    id: 'act-1',
    status: 'ACTIVE',
    location: 'N16',
    title: 'Rear Dormer Loft',
    scope: 'Calculations · drawings · Building Control'
  },
  {
    id: 'act-2',
    status: 'ACTIVE',
    location: 'ISLINGTON',
    title: 'Rear Extension',
    scope: 'Steel sizing · padstones · revisions'
  },
  {
    id: 'act-3',
    status: 'SIGN-OFF',
    location: 'N7',
    title: 'Two-storey Extension',
    scope: 'Final package · client review'
  }
];

export const pipelineProjects: PipelineProject[] = [
  {
    id: 'pipe-1',
    title: 'Kitchen Extension & RSJ',
    stage: 'Calculations & CAD',
    nextAction: 'Issue drawing set',
    client: 'David K.'
  },
  {
    id: 'pipe-2',
    title: 'Rear Extension',
    stage: 'Survey',
    nextAction: 'Site visit',
    client: 'Client'
  },
  {
    id: 'pipe-3',
    title: 'HMO Structural Review',
    stage: 'Building Control',
    nextAction: 'Respond to comments',
    client: 'Developer'
  }
];
