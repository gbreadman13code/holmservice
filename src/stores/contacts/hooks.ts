import { useEffect } from 'react';
import { contactsStore } from './contacts.store';

export const useContacts = () => {
  useEffect(() => {
    contactsStore.fetchContacts();
  }, []);

  return {
    contacts: contactsStore.contacts,
    isLoading: contactsStore.isLoading,
    error: contactsStore.error
  };
}; 