import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../lib/api/profile.api';
import { withErrorHandling } from '../lib/utils/error-handler';
import { UserProfileAPIResponse } from '../types/profile';

export const useProfile = () => {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await profileApi.getProfile();
      return response.data as UserProfileAPIResponse;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: withErrorHandling(async (data: Partial<UserProfileAPIResponse>) => {
      const response = await profileApi.updateProfile(data);
      return response.data as UserProfileAPIResponse;
    }),
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    updateProfile: updateProfileMutation.mutate,
    updateProfileAsync: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
  };
};
