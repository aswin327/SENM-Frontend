export interface ProfessionalDetailsRequest {
  specialisms: string[];
  accreditationBody: 'IStructE' | 'ICE';
  membershipNumber: string;
  yearsOfExperience: number;
}

export interface CoverageAreaRequest {
  postcodeOrRegion: string;
}

export interface CoverageArea {
  _id: string;
  postcodeOrRegion: string;
}

export interface PricingDetail {
  minimumPrice: number;
  maximumPrice: number;
  currency?: string;
}

export interface PricingRequest {
  siteSurvey?: PricingDetail;
  drawings?: PricingDetail;
  fullPackage?: PricingDetail;
}

export interface BioRequest {
  bio: string;
}

export interface RegistrationStatusResponse {
  currentStep: number;
  completed: boolean;
}

export interface RegistrationReviewResponse {
  professionalDetails: any;
  coverageAreas: any[];
  pricing: any;
  portfolio: any[];
  bio: string;
}
