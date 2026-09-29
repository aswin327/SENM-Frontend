import type { WorkspaceData } from '@/types/workspace';

export const workspaceData: WorkspaceData = {
  title: 'Kitchen Extension & RSJ',
  clientInfo: 'David K. · EC1V · Awarded 16 September 2026',
  statusBadge: 'IN PROGRESS',
  progressPercent: 42,
  nextAction: 'Issue drawing set',
  overview: {
    property: 'Victorian terrace',
    projectType: 'Rear extension',
    stage: 'Calculations & CAD',
    requiredScope: 'Steel sizing + drawings',
    targetCompletion: '30 September',
    quote: '£2,150 fixed'
  },
  timeline: [
    { id: 't1', title: 'Quote awarded', statusText: '16 Sep', state: 'done' },
    { id: 't2', title: 'Site survey', statusText: '17 Sep', state: 'done' },
    { id: 't3', title: 'Calculations & structural drawings', statusText: 'In progress', state: 'current' },
    { id: 't4', title: 'Client review', statusText: 'Upcoming', state: 'upcoming' },
    { id: 't5', title: 'Building Control / sign-off', statusText: 'Upcoming', state: 'upcoming' }
  ],
  scope: [
    { id: 's1', title: 'Structural calculations', description: 'Steel sizing, load paths and supporting calculations to BS EN.' },
    { id: 's2', title: 'Structural drawings', description: 'Building Control drawing set with beam and padstone details.' },
    { id: 's3', title: 'Revisions', description: 'Reasonable revisions within the agreed structural package until sign-off.' },
    { id: 's4', title: 'Building Control support', description: 'Responses and liaison for matters within the agreed structural scope.' }
  ],
  documents: [
    { id: 'd1', type: 'PDF', title: 'Architectural plans — Rev B', meta: 'David K. · 17 Sep · v2', status: 'CURRENT', statusState: 'CURRENT' },
    { id: 'd2', type: 'PDF', title: 'Site survey notes', meta: 'James H. · 17 Sep · v1', status: 'CURRENT', statusState: 'CURRENT' },
    { id: 'd3', type: 'DWG', title: 'Existing floor plan', meta: 'David K. · 16 Sep · v1', status: 'REFERENCE', statusState: 'REFERENCE' },
    { id: 'd4', type: 'PDF', title: 'Quote — £2,150 fixed', meta: 'SENM · 16 Sep · v1', status: 'AGREED', statusState: 'AGREED' }
  ],
  messages: [
    { id: 'm1', text: 'Hi James, the architect has uploaded Rev B. Can you confirm the beam position is still workable?', isMe: false },
    { id: 'm2', text: 'Yes. I’ll check the revised opening against the current calculations and confirm with the updated drawing set.', isMe: true }
  ],
  deliveryStages: [
    { id: 'ds1', stepNum: '01', title: 'Survey', meta: 'Completed · 17 Sep', state: 'done' },
    { id: 'ds2', stepNum: '02', title: 'Calculations', meta: 'In progress', state: 'current' },
    { id: 'ds3', stepNum: '03', title: 'Structural drawings', meta: 'Next', state: 'upcoming' },
    { id: 'ds4', stepNum: '04', title: 'Client review', meta: 'Upcoming', state: 'upcoming' },
    { id: 'ds5', stepNum: '05', title: 'Building Control', meta: 'Upcoming', state: 'upcoming' },
    { id: 'ds6', stepNum: '06', title: 'Sign-off', meta: 'Upcoming', state: 'upcoming' }
  ]
};
