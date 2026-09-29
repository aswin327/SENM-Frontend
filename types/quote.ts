export interface QuoteSummary {
  id: string;
  projectTitle: string;
  projectDetails: string;
  quoteAmount: string;
  submittedDate: string;
  status: string;
  statusCode: 'CLIENT_VIEWED' | 'AWARDED' | 'DRAFT';
}

export interface QuoteMetrics {
  draftsCount: number;
  draftsNote: string;
  submittedCount: number;
  submittedNote: string;
  awardedCount: number;
  awardedNote: string;
  avgResponseTime: string;
  avgResponseNote: string;
}
