import type { Profile } from '@/types/profile';

export const profileData: Profile = {
  id: 'eng-123',
  displayName: 'James H.',
  professionalTitle: 'Principal Structural Engineer',
  company: 'Hughes & Partners',
  baseLocation: 'Islington, London',
  yearsOfExperience: 18,
  onSENMSince: 'March 2024',
  summary: 'James has spent 18 years working across North London on domestic loft conversions, rear extensions, and party wall matters, with a particular focus on Victorian and Edwardian terraces where original structural fabric needs careful assessment.\n\nHe works directly with homeowners and their builders from initial survey through to building control sign-off, and is known for turning around calculations quickly without cutting corners on detail.',
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
  avatarInitials: 'JH',
  
  availability: 'Available this week',
  coverageRadiusMiles: 8,
  coverageDescription: "Based in Islington and covering an 8-mile radius across London — from Highbury and Angel through to Hoxton and Clerkenwell. If you're within the area, I can usually survey within the week.",
  districtsServed: ['Islington', 'Highbury', 'Angel', 'Holloway', 'Finsbury Park', 'Barnsbury', 'Canonbury', 'Archway', 'Hoxton', 'Clerkenwell'],
  
  completionPercentage: 96,
  matchScore: 98,
  similarProjects: 31,
  localProjects: 14,
  
  specialisms: ['Loft Conversions', 'Extensions', 'Surveys', 'Load-bearing walls', 'Party Wall Matters', 'New Builds', 'Building Control'],
  structuralSystems: ['Steel beams', 'Timber structures', 'Masonry alterations', 'Foundations', 'Existing structure assessment'],
  buildingControlSupport: 'Full submission support',
  calculationStandard: 'Eurocodes (BS EN)',
  typicalResponse: 'Within 24 hours',
  surveyAvailability: 'Usually within the week',
  
  credentials: [
    { id: 'cred-1', title: 'MIStructE', organization: 'Member, Institution of Structural Engineers', verified: true },
    { id: 'cred-2', title: 'CEng', organization: 'Chartered Engineer, Engineering Council', verified: true }
  ],
  insurance: {
    coverAmount: '£2M',
    type: 'Professional indemnity cover',
    verified: true
  },
  
  pricingServices: [
    {
      id: 'srv-1',
      name: 'Site survey',
      priceFrom: 420,
      priceTo: 480,
      inclusions: ['On-site structural assessment', 'Written condition report', 'Delivered within 5 working days']
    },
    {
      id: 'srv-2',
      name: 'Structural drawings',
      priceFrom: 950,
      priceTo: 1400,
      inclusions: ['Full structural calculations', 'CAD drawings for planning submission', 'Building control pack', 'Revisions included']
    },
    {
      id: 'srv-3',
      name: 'Full package',
      priceFrom: 1800,
      priceTo: 2600,
      inclusions: ['Site survey + full calculations', 'Building regulations support', 'Project sign-off on completion']
    }
  ],
  quoteModel: 'Fixed-price, itemised',
  hiddenCosts: 'No hidden costs',
  pricingNote: 'Fixed-price, itemised quote confirmed before you commit. No hidden costs.',
  standardInclusions: [
    'Building control liaison & submission',
    'Revisions until sign-off',
    'Itemised, fixed-price quote — no hidden costs',
    'IStructE verified · £2M indemnity cover'
  ],
  
  workflow: [
    { id: 'wf-1', stageName: 'Enquiry & fixed quote', description: "Tell me about your project and I'll send a fixed, itemised quote — usually within 24 hours." },
    { id: 'wf-2', stageName: 'Site survey', description: 'I visit to assess the existing structure and take the measurements the calculations depend on.' },
    { id: 'wf-3', stageName: 'Calculations & drawings', description: 'Full structural calculations and CAD drawings prepared to Eurocodes, ready for submission.' },
    { id: 'wf-4', stageName: 'Building control & sign-off', description: 'I liaise with building control and support you and your builder through to sign-off.' }
  ],
  
  faqs: [
    { id: 'faq-1', question: 'Do I need a structural engineer for a loft conversion?', answer: 'Almost always, yes. A loft conversion alters the roof structure and adds new floor loads, so building control will require structural calculations and drawings from a qualified engineer before the work can be signed off.' },
    { id: 'faq-2', question: 'How much does a structural engineer cost?', answer: 'Typical service ranges are published above. The final price is confirmed as a fixed, itemised quote based on the project scope.' },
    { id: 'faq-3', question: 'How quickly can you provide drawings?', answer: 'Typical response for the first quote is within 24 hours. Delivery timing is confirmed against the agreed project scope.' },
    { id: 'faq-4', question: 'Do you handle building control submissions?', answer: 'Yes. Full building control liaison and submission support is included as standard.' },
    { id: 'faq-5', question: 'Which areas do you cover?', answer: 'Islington and an 8-mile radius across North London, including Highbury, Angel, Holloway, Finsbury Park, Barnsbury, Canonbury, Archway, Hoxton and Clerkenwell.' },
    { id: 'faq-6', question: 'Are you accredited and insured?', answer: 'MIStructE and CEng credentials are verified on SENM, with £2M professional indemnity cover.' }
  ],
  
  contactEmail: 'info@structuralengineernearme.co.uk',
  contactPhone: '+44 0203 409 4215',
  contactCta: 'Get a Quote'
};
