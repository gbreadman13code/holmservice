import { makeAutoObservable, runInAction } from 'mobx';
import { Street, House } from './types';
import { BaseResponse } from '@/api/types';
import { api } from '@/api/axios';
export interface ICompanyInfo {
  name: string;
  address: string;
  schedule: string;
  phone: string;
  website: string;
  email: string;
  legalAddress: string;
  legalPhone: string;
}

export interface ReportFile {
  id: number;
  year: number;
  name: string;
  url: string;
}

export interface WorkPlan {
  id: number;
  year: number;
  name: string;
  url: string;
}

export interface HouseInfo {
  id: number;
  address: string;
  companyInfo: ICompanyInfo;
  reports: ReportFile[];
  workPlans: WorkPlan[];
}

const COMPANY_INFO: ICompanyInfo = {
  name: 'ООО УК "Холмсервис"',
  address: 'ул. Весны, 26, пом. 150',
  schedule: 'понедельник-пятница: с 09-00 до 18-00, обед с 13-00 до 14-00; суббота, воскресенье: выходной',
  phone: '8 (391) 255-55-55',
  website: 'https://www.holmservice.ru',
  email: 'info@holmservice.ru',
  legalAddress: '660098, г. Красноярск, ул. Алексеева, 49, пом. 190',
  legalPhone: '8 (391) 255-55-56'
};

const generateReports = (houseId: number): ReportFile[] => [
  {
    id: houseId * 1000 + 1,
    year: 2024,
    name: 'Отчет о выполненных работах за 2024 год',
    url: '/files/report-2024.pdf'
  },
  {
    id: houseId * 1000 + 2,
    year: 2023,
    name: 'Отчет о выполненных работах за 2023 год',
    url: '/files/report-2023.pdf'
  }
];

const generateWorkPlans = (houseId: number): WorkPlan[] => [
  {
    id: houseId * 2000 + 1,
    year: 2024,
    name: 'План работ на 2024 год',
    url: '/files/work-plan-2024.pdf'
  },
  {
    id: houseId * 2000 + 2,
    year: 2023,
    name: 'План работ на 2023 год',
    url: '/files/work-plan-2023.pdf'
  }
];

export class MyHomeStore {
  streets: Street[] = [];
  houses: House[] = [];
  selectedStreetId: number | null = null;
  selectedHouseId: number | null = null;
  houseInfo: HouseInfo | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedStreet = (streetId: number | null) => {
    this.selectedStreetId = streetId;
    this.selectedHouseId = null; // Сбрасываем выбранный дом при смене улицы
    if (streetId) {
      this.loadHouses(streetId);
    }
  };

  setSelectedHouse = (houseId: number | null) => {
    this.selectedHouseId = houseId;
  };

  loadStreets = async () => {
    this.isLoading = true;
    try {
      const firstResponse = await api.get<BaseResponse<Street>>('streets/', {
        params: {
          page: 1
        }
      });

      const secondResponse = await api.get<BaseResponse<Street>>('streets/', {
        params: {
          page: 2
        }
      });

      const response = [...firstResponse.data.results, ...secondResponse.data.results];

      runInAction(() => {
        this.streets = response;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  loadHouses = async (streetId: number) => {
    this.isLoading = true;
    try {
        const response = this.streets.find(street => street.id === streetId)?.houses;
        

      const houses = response || [];

      runInAction(() => {
        this.houses = houses;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  searchHouseInfo = async () => {
    if (!this.selectedHouseId) return;

    this.isLoading = true;
    try {
      const response = {
          id: this.selectedHouseId,
          address: `${this.streets.find(street => street.id === this.selectedStreetId)?.name}, ${this.houses.find(house => house.id === this.selectedHouseId)?.number}`,
          companyInfo: COMPANY_INFO,
          reports: generateReports(this.selectedHouseId),
          workPlans: generateWorkPlans(this.selectedHouseId)
        }

      runInAction(() => {
        this.houseInfo = response;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}

export const myHomeStore = new MyHomeStore(); 