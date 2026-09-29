import type { Opportunity } from '@/types/opportunity';

export const opportunitiesData: Opportunity[] = [
  {
    id: 'opp-1',
    matchScore: 98,
    timeAgo: '42m ago',
    type: 'LOFT CONVERSION',
    locationCode: 'N16',
    title: 'Victorian Terrace Rear Dormer Loft Conversion',
    clientStatus: 'Building Control Ready · Target start: April',
    typicalFee: '£950-£1,400',
    documentsCount: '2 PDFs',
    brief: 'Twin steel ridge beams, dormer trimmer details and floor joist upgrade calculations required.',
    statusBadge: 'NEW'
  },
  {
    id: 'opp-2',
    matchScore: 91,
    timeAgo: '3h ago',
    type: 'REAR EXTENSION',
    locationCode: 'EC1V',
    title: 'Ground Floor Rear Kitchen Extension & RSJ',
    clientStatus: 'Planning In Progress · Full steel sizing',
    typicalFee: '£1,800-£2,400',
    documentsCount: '1 sketch',
    brief: '4.5m load-bearing spine wall and chimney breast removal. Party Wall notices drafted.',
    statusBadge: 'NEW'
  },
  {
    id: 'opp-3',
    matchScore: 84,
    timeAgo: '1d ago',
    type: 'NEW BUILD',
    locationCode: 'N1',
    title: 'Two-Storey Mews House Superstructure',
    clientStatus: 'Planning Approved · Full package required',
    typicalFee: '£3,500-£5,000',
    documentsCount: '4 PDFs',
    brief: 'Masonry construction with steel frame elements. Strip foundations previously designed.',
    statusBadge: 'VIEWED'
  }
];
