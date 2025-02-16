import { makeAutoObservable, runInAction } from 'mobx';

interface Street {
  id: number;
  name: string;
}

interface House {
  id: number;
  number: string;
  streetId: number;
}

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

const MOCK_STREETS = [
  { id: 1, name: 'улица Дмитрия Мартынова' },
  { id: 2, name: 'улица Чернышевского' },
  { id: 3, name: 'улица Ленина' },
  { id: 4, name: 'улица Красноярский рабочий' },
  { id: 5, name: 'улица 78 Добровольческой бригады' },
  { id: 6, name: 'улица 9 Мая' },
  { id: 7, name: 'улица Алексеева' },
  { id: 8, name: 'улица Весны' },
  { id: 9, name: 'улица Молокова' },
  { id: 10, name: 'улица Авиаторов' }
];

const generateHouses = (streetId: number) => [
  { id: streetId * 100 + 1, number: '1', streetId },
  { id: streetId * 100 + 2, number: '2', streetId },
  { id: streetId * 100 + 3, number: '3А', streetId },
  { id: streetId * 100 + 4, number: '5', streetId },
  { id: streetId * 100 + 5, number: '7', streetId },
  { id: streetId * 100 + 6, number: '9Б', streetId },
  { id: streetId * 100 + 7, number: '11', streetId },
  { id: streetId * 100 + 8, number: '13', streetId },
  { id: streetId * 100 + 9, number: '15А', streetId },
  { id: streetId * 100 + 10, number: '17', streetId }
];

const COMPANY_INFO: ICompanyInfo = {
  name: 'ООО УК "Холм Сервис"',
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
  selectedStreet: Street | null = null;
  selectedHouse: House | null = null;
  houseInfo: HouseInfo | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedStreet = (street: Street | null) => {
    this.selectedStreet = street;
    this.selectedHouse = null; // Сбрасываем выбранный дом при смене улицы
    if (street) {
      this.loadHouses(street.id);
    }
  };

  setSelectedHouse = (house: House | null) => {
    this.selectedHouse = house;
  };

  loadStreets = async () => {
    this.isLoading = true;
    try {
      const response = await new Promise<Street[]>(resolve => 
        setTimeout(() => resolve(MOCK_STREETS), 1000)
      );

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
      const response = await new Promise<House[]>(resolve =>
        setTimeout(() => resolve(generateHouses(streetId)), 500)
      );

      runInAction(() => {
        this.houses = response;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  searchHouseInfo = async () => {
    if (!this.selectedStreet || !this.selectedHouse) return;

    this.isLoading = true;
    try {
      const response = await new Promise<HouseInfo>(resolve =>
        setTimeout(() => resolve({
          id: this.selectedHouse!.id,
          address: `${this.selectedStreet!.name}, ${this.selectedHouse!.number}`,
          companyInfo: COMPANY_INFO,
          reports: generateReports(this.selectedHouse!.id),
          workPlans: generateWorkPlans(this.selectedHouse!.id)
        }), 1000)
      );

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