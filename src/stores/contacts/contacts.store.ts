import { makeAutoObservable, runInAction } from 'mobx';
import { api } from '@/api/axios';
import { AddressItem, Contacts, EmailItem, PhoneItem } from './types';
import { BaseResponse } from '@/api/types';



class ContactsStore {
  contacts: Contacts | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchContacts() {
    this.isLoading = true;
    this.error = null;

    try {
      const addresses = await api.get<BaseResponse<AddressItem>>('addresses/');
      const phones = await api.get<BaseResponse<PhoneItem>>('phones/');
      const emails = await api.get<BaseResponse<EmailItem>>('emails/');
      
      runInAction(() => {
        this.contacts = {
          phones: phones.data.results,
          emails: emails.data.results,
          addresses: addresses.data.results
        };
        
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
}

export const contactsStore = new ContactsStore(); 