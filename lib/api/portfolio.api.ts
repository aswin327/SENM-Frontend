import { apiClient } from './client';
import { ApiResponse } from '../../types/api';
import { PortfolioItem, PortfolioUploadResponse } from '../../types/portfolio';

export const portfolioApi = {
  uploadImage: async (file: File): Promise<ApiResponse<PortfolioUploadResponse>> => {
    const formData = new FormData();
    formData.append('image', file);
    
    // Explicitly set Content-Type to multipart/form-data so Axios overriding doesn't force json
    const response = await apiClient.post('/registration/portfolio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getPortfolio: async (): Promise<ApiResponse<PortfolioItem[]>> => {
    const response = await apiClient.get('/registration/portfolio');
    return response.data;
  },
  
  deletePortfolioImage: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/registration/portfolio/${id}`);
    return response.data;
  }
};
