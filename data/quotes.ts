import type { QuoteSummary, QuoteMetrics } from '@/types/quote';

export const quoteMetrics: QuoteMetrics = {
  draftsCount: 1,
  draftsNote: 'needs completion',
  submittedCount: 2,
  submittedNote: 'awaiting decision',
  awardedCount: 1,
  awardedNote: 'project started',
  avgResponseTime: '24h',
  avgResponseNote: 'client decision time'
};

export const quoteSummaries: QuoteSummary[] = [
  {
    id: 'q-1',
    projectTitle: 'Rear Dormer Loft Conversion',
    projectDetails: 'N16 · Sarah Jenkins',
    quoteAmount: '£1,500',
    submittedDate: '17 Sep 2026',
    status: 'CLIENT VIEWED',
    statusCode: 'CLIENT_VIEWED'
  },
  {
    id: 'q-2',
    projectTitle: 'Kitchen Extension & RSJ',
    projectDetails: 'EC1V · David K.',
    quoteAmount: '£2,150',
    submittedDate: '16 Sep 2026',
    status: 'AWARDED',
    statusCode: 'AWARDED'
  },
  {
    id: 'q-3',
    projectTitle: 'Rear Extension Package',
    projectDetails: 'N7',
    quoteAmount: '£1,650',
    submittedDate: 'Draft',
    status: 'DRAFT',
    statusCode: 'DRAFT'
  }
];
