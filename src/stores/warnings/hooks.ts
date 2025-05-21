import { warningsStore } from './warnings.store';

export const useWarnings = () => {
  return {
    warnings: warningsStore.warnings,
    isLoading: warningsStore.isLoading,
    error: warningsStore.error
  };
}; 