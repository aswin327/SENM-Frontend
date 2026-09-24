import { AxiosError } from 'axios';
import { ApiErrorResponse } from '../../types/api';

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // If the server returns a formatted response
    if (error.response?.data) {
      const data = error.response.data as ApiErrorResponse;
      
      // If we have specific field validation errors, format them nicely
      if (data.errors && Object.keys(data.errors).length > 0) {
        const errorKeys = Object.keys(data.errors);
        const firstKey = errorKeys[0];
        
        // Convert camelCase like 'membershipNumber' to 'Membership Number'
        const formattedKey = firstKey
          .split('.')
          .pop()
          ?.replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase()) || firstKey;
          
        return `Invalid ${formattedKey}: ${data.errors[firstKey]}`;
      }
      
      if (data.message) {
        return data.message;
      }
    }
    
    // Fallback for different HTTP status codes
    switch (error.response?.status) {
      case 400: return 'Bad Request. Please check your inputs.';
      case 401: return 'Unauthorized. Please login again.';
      case 403: return 'Forbidden. You do not have permission.';
      case 404: return 'Resource not found.';
      case 409: return 'Conflict occurred. Record may already exist.';
      case 422: return 'Validation error.';
      case 429: return 'Too many requests. Please try again later.';
      case 500: return 'Internal server error. Please try again later.';
    }

    if (error.code === 'ECONNABORTED') return 'Request timeout. Please try again.';
    if (error.message === 'Network Error') return 'Network error. Please check your connection.';
    
    return error.message || 'An unexpected API error occurred.';
  }
  
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
};

/**
 * A higher-order function that wraps async API calls and automatically 
 * catches errors, parses them through handleApiError, and throws a standard Error.
 * This removes duplicate try/catch blocks across React Query mutations.
 */
export const withErrorHandling = <T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>
): (...args: Args) => Promise<T> => {
  return async (...args: Args) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  };
};
