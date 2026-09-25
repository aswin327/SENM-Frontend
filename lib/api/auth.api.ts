import { apiClient } from './client';
import { ApiResponse } from '../../types/api';
import { LoginResponse, RegisterResponse } from '../../types/auth';

export const authApi = {
  register: async (data: any): Promise<ApiResponse<RegisterResponse>> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
  
  login: async (data: any): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },
  
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
  
  forgotPassword: async (data: { email: string }): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  },
  
  resetPassword: async (data: { token: string, password: string }): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  }
};
