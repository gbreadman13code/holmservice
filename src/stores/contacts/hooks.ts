import { useEffect } from 'react';
import { contactsStore } from './contacts.store';

export const useContacts = (commonOnly: boolean = false) => {
  useEffect(() => {
    contactsStore.fetchContacts();
  }, []);

  return {
    contacts: commonOnly ? contactsStore.commonContacts : contactsStore.groupedContacts,
    isLoading: contactsStore.isLoading,
    error: contactsStore.error
  };
}; 