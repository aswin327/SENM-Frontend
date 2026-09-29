import type { QuoteBuilderData } from '@/types/quote-builder';

export const quoteBuilderData: QuoteBuilderData = {
  projectTitle: 'Victorian Terrace Rear Dormer Loft Conversion',
  projectClient: 'Sarah Jenkins',
  projectLocation: 'N16',
  projectType: 'Loft conversion',
  projectStage: 'Building Control',
  projectRequired: 'Calcs + drawings',
  projectDocs: '2 PDFs',
  targetStart: 'April',
  scopeNeeded: 'Before 15 April',
  services: [
    { id: 's1', name: 'Structural calculations', description: 'Design calculations to Eurocodes (BS EN)', type: 'Included', defaultSelected: true },
    { id: 's2', name: 'Structural drawings', description: 'Detailed drawings for Building Control', type: 'Included', defaultSelected: true },
    { id: 's3', name: 'Building Control support', description: 'Liaison, submission and responses', type: 'Included', defaultSelected: true },
    { id: 's4', name: 'Site survey', description: 'Existing structure inspection and measurements', type: 'Optional', defaultSelected: false },
    { id: 's5', name: 'Additional site visit', description: 'Visit beyond the agreed structural scope', type: 'Optional', defaultSelected: false }
  ],
  includedTags: ['Calculations', 'Drawings', 'Building Control', 'Revisions until sign-off'],
  excludedTags: ['Planning fees', 'Specialist surveys', 'Additional visits', 'Design changes'],
  turnaroundOptions: {
    calculations: ['Within 5 working days', 'Within 3 working days', 'Within 7 working days'],
    drawings: ['Within 7 working days', 'Within 5 working days', 'Within 10 working days'],
    availability: ['Available this week', 'Available next week', 'Available in 2 weeks']
  }
};
