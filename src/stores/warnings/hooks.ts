import { useEffect } from 'react';
import { warningsStore } from './warnings.store';

export const useWarnings = () => {
  useEffect(() => {
    warningsStore.fetchWarnings();
  }, []);

  return {
    warnings: warningsStore.warnings,
    isLoading: warningsStore.isLoading,
    error: warningsStore.error
  };
}; 