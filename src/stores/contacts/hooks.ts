import { contactsStore } from './contacts.store';

export const useContacts = () => {
  

  return {
    contacts: contactsStore.contacts,
    isLoading: contactsStore.isLoading,
    error: contactsStore.error
  };
}; 