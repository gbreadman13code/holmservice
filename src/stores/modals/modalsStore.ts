import { makeAutoObservable } from 'mobx';

class ModalsStore {
  isAuthModalOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuthModalOpen(value: boolean) {
    this.isAuthModalOpen = value;
  }
}

export const modalsStore = new ModalsStore(); 