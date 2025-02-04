import { makeAutoObservable, runInAction } from 'mobx';
import { contactsMock } from './contacts.mock';

export interface Contact {
  id: number;
  title: string;
  type: 'phone' | 'email';
  values: string[];
  isCommon: boolean;
}

export interface ContactsData {
  phones: Contact[];
  emails: Contact[];
}

class ContactsStore {
  contacts: Contact[] | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchContacts() {
    this.isLoading = true;
    this.error = null;

    try {
      // Имитируем задержку сети
      await new Promise(resolve => setTimeout(resolve, 500));
      
      runInAction(() => {
        // Преобразуем моковые данные в нужный формат
        this.contacts = [
          ...contactsMock.phones,
          ...contactsMock.emails
        ];
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке контактов';
        this.isLoading = false;
        console.error(error);
      });
    }
  }

  get groupedContacts(): ContactsData {
    if (!this.contacts) return { phones: [], emails: [] };

    return {
      phones: this.contacts.filter(contact => contact.type === 'phone'),
      emails: this.contacts.filter(contact => contact.type === 'email')
    };
  }

  get commonContacts(): ContactsData {
    if (!this.contacts) return { phones: [], emails: [] };

    const common = this.contacts.filter(contact => contact.isCommon);
    return {
      phones: common.filter(contact => contact.type === 'phone'),
      emails: common.filter(contact => contact.type === 'email')
    };
  }
}

export const contactsStore = new ContactsStore(); 