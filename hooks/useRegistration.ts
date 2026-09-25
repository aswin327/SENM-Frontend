import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { registrationApi } from '../lib/api';
import { handleApiError } from '../lib/utils/error-handler';
import {
  ProfessionalDetailsRequest,
  CoverageAreaRequest,
  PricingRequest,
  BioRequest
} from '../types/registration';

import { withErrorHandling } from '../lib/utils/error-handler';

export const useRegistrationStatus = () => {
  return useQuery({
    queryKey: ['registration', 'status'],
    queryFn: async () => {
      const response = await registrationApi.getStatus();
      return response.data;
    },
    retry: false,
  });
};

export const useRegistrationReview = () => {
  return useQuery({
    queryKey: ['registration', 'review'],
    queryFn: async () => {
      const response = await registrationApi.getReview();
      return response.data;
    },
  });
};

export const useCoverage = () => {
  return useQuery({
    queryKey: ['registration', 'coverage'],
    queryFn: async () => {
      const response = await registrationApi.getCoverage();
      return response.data;
    },
  });
};

export const usePricing = () => {
  return useQuery({
    queryKey: ['registration', 'pricing'],
    queryFn: async () => {
      const response = await registrationApi.getPricing();
      return response.data;
    },
  });
};

export const useRegistrationMutations = () => {
  const queryClient = useQueryClient();

  const updateProfessional = useMutation({
    mutationFn: withErrorHandling(async (data: ProfessionalDetailsRequest) => {
      await registrationApi.updateProfessional(data);
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registration', 'status'] });
      queryClient.invalidateQueries({ queryKey: ['registration', 'review'] });
    },
  });

  const addCoverage = useMutation({
    mutationFn: withErrorHandling(async (data: CoverageAreaRequest) => {
      const response = await registrationApi.addCoverage(data);
      return response.data;
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registration', 'coverage'] });
      queryClient.invalidateQueries({ queryKey: ['registration', 'review'] });
    },
  });

  const deleteCoverage = useMutation({
    mutationFn: withErrorHandling(async (id: string) => {
      await registrationApi.deleteCoverage(id);
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registration', 'coverage'] });
      queryClient.invalidateQueries({ queryKey: ['registration', 'review'] });
    },
  });

  const updatePricing = useMutation({
    mutationFn: withErrorHandling(async (data: PricingRequest) => {
      await registrationApi.updatePricing(data);
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registration', 'pricing'] });
      queryClient.invalidateQueries({ queryKey: ['registration', 'review'] });
    },
  });

  const updateBio = useMutation({
    mutationFn: withErrorHandling(async (data: BioRequest) => {
      await registrationApi.updateBio(data);
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registration', 'review'] });
    },
  });

  const completeRegistration = useMutation({
    mutationFn: withErrorHandling(async () => {
      await registrationApi.completeRegistration();
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registration', 'status'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });


  return {
    updateProfessional: updateProfessional.mutateAsync,
    isUpdatingProfessional: updateProfessional.isPending,
    
    addCoverage: addCoverage.mutateAsync,
    isAddingCoverage: addCoverage.isPending,
    
    deleteCoverage: deleteCoverage.mutateAsync,
    isDeletingCoverage: deleteCoverage.isPending,
    
    updatePricing: updatePricing.mutateAsync,
    isUpdatingPricing: updatePricing.isPending,
    
    updateBio: updateBio.mutateAsync,
    isUpdatingBio: updateBio.isPending,
    
    completeRegistration: completeRegistration.mutateAsync,
    isCompletingRegistration: completeRegistration.isPending,
  };
};
