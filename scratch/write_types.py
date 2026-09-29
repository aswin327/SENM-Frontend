import os

base_dir = r"c:\Users\aswin\OneDrive\Desktop\Extention Architecture\frontend"

def write_file(filepath, content):
    full_path = os.path.join(base_dir, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created {filepath}")

# types/profile.ts
write_file("types/profile.ts", """
export type AvailabilityStatus = 'Available this week' | 'Available next week' | 'Currently unavailable' | 'By appointment' | 'Usually within the week';
export type CalculationStandard = 'Eurocodes (BS EN)' | 'British Standards';
export type ResponseTime = 'Within 24 hours' | 'Within 48 hours' | '2-3 working days';
export type QuoteModel = 'Fixed-price, itemised' | 'Fixed-price' | 'Scope dependent';
export type HiddenCostsPolicy = 'No hidden costs' | 'Additional costs may apply';

export interface Credential {
  id: string;
  title: string;
  organization: string;
  verified: boolean;
}

export interface Insurance {
  coverAmount: string;
  type: string;
  verified: boolean;
}

export interface PricingService {
  id: string;
  name: string;
  priceFrom: number;
  priceTo: number;
  inclusions: string[];
}

export interface WorkflowStage {
  id: string;
  stageName: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Profile {
  id: string;
  displayName: string;
  professionalTitle: string;
  company: string;
  baseLocation: string;
  yearsOfExperience: number;
  onSENMSince: string;
  summary: string;
  heroImage: string;
  avatarInitials: string;
  
  availability: AvailabilityStatus;
  coverageRadiusMiles: number;
  coverageDescription: string;
  districtsServed: string[];
  
  completionPercentage: number;
  matchScore: number;
  similarProjects: number;
  localProjects: number;
  
  specialisms: string[];
  structuralSystems: string[];
  buildingControlSupport: string;
  calculationStandard: CalculationStandard;
  typicalResponse: ResponseTime;
  surveyAvailability: AvailabilityStatus;
  
  credentials: Credential[];
  insurance: Insurance;
  
  pricingServices: PricingService[];
  quoteModel: QuoteModel;
  hiddenCosts: HiddenCostsPolicy;
  pricingNote: string;
  standardInclusions: string[];
  
  workflow: WorkflowStage[];
  faqs: FAQ[];
  
  contactEmail: string;
  contactPhone: string;
  contactCta: string;
}
""")

# types/project.ts
write_file("types/project.ts", """
export type ProjectStatus = 'Completed' | 'Ongoing';
export type ProjectService = 'Site survey' | 'Structural drawings' | 'Full package';

export interface ProjectGalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface ProfileProject {
  id: string;
  title: string;
  projectType: ProjectService;
  status: ProjectStatus;
  location: string;
  postcode: string;
  yearCompleted: string;
  planningAuthority: string;
  projectValue: string;
  existingArea: string;
  proposedArea: string;
  buildingType: string;
  structuralSystems: string;
  summary: string;
  clientBrief: string;
  structuralScope: string;
  outcomeNotes: string;
  gallery: ProjectGalleryImage[];
}
""")

# types/review.ts
write_file("types/review.ts", """
export interface Review {
  id: string;
  clientName: string;
  projectType: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  speedRating: number;
  communicationRating: number;
  valueRating: number;
}
""")

# data/profile.ts
write_file("data/profile.ts", """
import type { Profile } from '@/types/profile';

export const profileData: Profile = {
  id: 'eng-123',
  displayName: 'James H.',
  professionalTitle: 'Principal Structural Engineer',
  company: 'Hughes & Partners',
  baseLocation: 'Islington, London',
  yearsOfExperience: 18,
  onSENMSince: 'March 2024',
  summary: 'James has spent 18 years working across North London on domestic loft conversions, rear extensions, and party wall matters, with a particular focus on Victorian and Edwardian terraces where original structural fabric needs careful assessment.\\n\\nHe works directly with homeowners and their builders from initial survey through to building control sign-off, and is known for turning around calculations quickly without cutting corners on detail.',
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
""")

# data/projects.ts
write_file("data/projects.ts", """
import type { ProfileProject } from '@/types/project';

export const profileProjects: ProfileProject[] = [
  {
    id: '1',
    title: 'Rear dormer loft conversion, Islington',
    projectType: 'Structural drawings',
    status: 'Completed',
    location: 'Islington',
    postcode: '',
    yearCompleted: '2026',
    planningAuthority: '',
    projectValue: '',
    existingArea: '',
    proposedArea: '',
    buildingType: '',
    structuralSystems: '',
    summary: '',
    clientBrief: '',
    structuralScope: '',
    outcomeNotes: '',
    gallery: [
      { id: 'g1', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80', caption: 'Rear dormer loft conversion, Islington' },
      { id: 'g2', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80', caption: 'Structural drawings and project detail' }
    ]
  },
  {
    id: '2',
    title: 'Rear extension, Angel',
    projectType: 'Full package',
    status: 'Completed',
    location: 'Angel',
    postcode: '',
    yearCompleted: '2025',
    planningAuthority: '',
    projectValue: '',
    existingArea: '',
    proposedArea: '',
    buildingType: '',
    structuralSystems: '',
    summary: '',
    clientBrief: '',
    structuralScope: '',
    outcomeNotes: '',
    gallery: [
      { id: 'g3', url: 'https://structuralengineernearme.co.uk/wp-content/uploads/2026/08/photo-1600607687939-ce8a6c25118c.webp', caption: 'Rear extension, Angel' },
      { id: 'g4', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80', caption: 'Structural drawings and project detail' }
    ]
  }
];
""")

# data/reviews.ts
write_file("data/reviews.ts", """
import type { Review, ReviewStats } from '@/types/review';

export const reviewStats: ReviewStats = {
  averageRating: 4.9,
  totalReviews: 42,
  speedRating: 4.9,
  communicationRating: 4.9,
  valueRating: 4.6
};

export const reviews: Review[] = [
  { id: 'r1', clientName: 'Sarah J.', projectType: 'Loft conversion', location: 'Islington', date: 'Mar 2026', rating: 5, comment: 'Drawings passed building control first time. Fast, clear, and exactly what we needed.', verified: true },
  { id: 'r2', clientName: 'David K.', projectType: 'Rear extension', location: 'Highbury', date: 'Feb 2026', rating: 5, comment: 'James explained everything in plain terms and gave us a fixed quote within a day of the survey. Would use again.', verified: true },
  { id: 'r3', clientName: 'James P.', projectType: 'New build', location: 'Angel', date: 'Jan 2026', rating: 5, comment: 'Handled the structural sign-off for our new build without any fuss. Communication was excellent from start to finish.', verified: true },
  { id: 'r4', clientName: 'Amina R.', projectType: 'Survey', location: 'Holloway', date: 'Nov 2025', rating: 4, comment: 'Good value and responsive throughout, though the final report took a couple of days longer than quoted.', verified: true }
];
""")

print("Data & Types Created")
