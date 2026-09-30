import { apiClient } from './client';
import { ApiResponse } from '../../types/api';
import { UserProfileAPIResponse } from '../../types/profile';

export const profileApi = {
  getProfile: async (): Promise<ApiResponse<UserProfileAPIResponse>> => {
    const response = await apiClient.get('/profile');
    return response.data;
  },
  
  updateProfile: async (data: Partial<UserProfileAPIResponse>): Promise<ApiResponse<UserProfileAPIResponse>> => {
    const response = await apiClient.put('/profile', data);
    return response.data;
  }
};
