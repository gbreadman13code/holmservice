import { useCallback } from 'react';
import { modalsStore } from './modalsStore';

export const useAuthModal = () => {
  const openAuthModal = useCallback(() => {
    modalsStore.setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    modalsStore.setAuthModalOpen(false);
  }, []);

  return {
    openAuthModal,
    closeAuthModal,
    isOpen: modalsStore.isAuthModalOpen
  };
}; 