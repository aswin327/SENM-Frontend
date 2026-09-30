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
  calculationStandard: string;
  typicalResponse: string;
  surveyAvailability: string;
  
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

export interface UserProfileAPIResponse {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  bio?: string;
  professional?: {
    specialisms?: string[];
    accreditationBody?: string;
    membershipNumber?: string;
    yearsOfExperience?: number;
  };
  coverageAreas?: Array<{
    _id?: string;
    postcodeOrRegion: string;
  }>;
  pricing?: {
    siteSurvey?: {
      minimumPrice: number;
      maximumPrice: number;
      currency?: string;
    };
    drawings?: {
      minimumPrice: number;
      maximumPrice: number;
      currency?: string;
    };
    fullPackage?: {
      minimumPrice: number;
      maximumPrice: number;
      currency?: string;
    };
  };
  portfolio?: Array<{
    _id?: string;
    imageUrl: string;
    originalFileName: string;
    mimeType: string;
    fileSize: number;
    createdAt?: string;
  }>;
  emailVerified?: boolean;
  registrationCompleted?: boolean;
  currentRegistrationStep?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
