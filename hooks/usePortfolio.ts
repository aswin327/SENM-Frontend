import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { portfolioApi } from '../lib/api';
import { handleApiError } from '../lib/utils/error-handler';

import { withErrorHandling } from '../lib/utils/error-handler';

export const usePortfolioMutations = () => {
  const queryClient = useQueryClient();

  const uploadImage = useMutation({
    mutationFn: withErrorHandling(async (file: File) => {
      const response = await portfolioApi.uploadImage(file);
      return response.data;
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['registration', 'review'] });
    }
  });

  const deleteImage = useMutation({
    mutationFn: withErrorHandling(async (id: string) => {
      await portfolioApi.deletePortfolioImage(id);
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['registration', 'review'] });
    }
  });

  return {
    uploadImage: uploadImage.mutateAsync,
    isUploading: uploadImage.isPending,
    
    deleteImage: deleteImage.mutateAsync,
    isDeleting: deleteImage.isPending,
  };
};
