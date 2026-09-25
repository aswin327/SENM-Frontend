import { apiClient } from './client';
import { ApiResponse } from '../../types/api';
import {
  RegistrationStatusResponse,
  RegistrationReviewResponse,
  ProfessionalDetailsRequest,
  CoverageAreaRequest,
  CoverageArea,
  PricingRequest,
  BioRequest
} from '../../types/registration';

export const registrationApi = {
  getStatus: async (): Promise<ApiResponse<RegistrationStatusResponse>> => {
    const response = await apiClient.get('/registration/status');
    return response.data;
  },
  
  getReview: async (): Promise<ApiResponse<RegistrationReviewResponse>> => {
    const response = await apiClient.get('/registration/review');
    return response.data;
  },
  
  completeRegistration: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/registration/complete');
    return response.data;
  },
  
  updateProfessional: async (data: ProfessionalDetailsRequest): Promise<ApiResponse<void>> => {
    const response = await apiClient.put('/registration/professional', data);
    return response.data;
  },
  
  addCoverage: async (data: CoverageAreaRequest): Promise<ApiResponse<CoverageArea>> => {
    const response = await apiClient.post('/registration/coverage', data);
    return response.data;
  },
  
  getCoverage: async (): Promise<ApiResponse<CoverageArea[]>> => {
    const response = await apiClient.get('/registration/coverage');
    return response.data;
  },
  
  deleteCoverage: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/registration/coverage/${id}`);
    return response.data;
  },
  
  updatePricing: async (data: PricingRequest): Promise<ApiResponse<void>> => {
    const response = await apiClient.put('/registration/pricing', data);
    return response.data;
  },
  
  getPricing: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.get('/registration/pricing');
    return response.data;
  },
  
  updateBio: async (data: BioRequest): Promise<ApiResponse<void>> => {
    const response = await apiClient.put('/registration/bio', data);
    return response.data;
  }
};
