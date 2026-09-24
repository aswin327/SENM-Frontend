import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../lib/api';
import { setAccessToken } from '../lib/auth/token';
import { handleApiError } from '../lib/utils/error-handler';
import { withErrorHandling } from '../lib/utils/error-handler';
import { LoginResponse, RegisterResponse } from '../types/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: withErrorHandling(async (data: any) => {
      const response = await authApi.login(data);
      return response.data;
    }),
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.accessToken);
      // Optional: set user profile in query cache if available
      queryClient.setQueryData(['user'], data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: withErrorHandling(async (data: any) => {
      const response = await authApi.register(data);
      return response.data;
    }),
  });

  const logoutMutation = useMutation({
    mutationFn: withErrorHandling(async () => {
      await authApi.logout();
    }),
    onSuccess: () => {
      setAccessToken(null);
      queryClient.clear(); // Clear all cached data on logout
    },
  });


  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
