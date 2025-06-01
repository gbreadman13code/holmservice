import { makeAutoObservable, runInAction } from 'mobx';
import { Street, House, HouseParams, HouseTariffs, HouseContacts } from './types';
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

// const COMPANY_INFO: ICompanyInfo = {
//   name: 'ООО УК "Холмсервис"',
//   address: 'ул. Весны, 26, пом. 150',
//   schedule: 'понедельник-пятница: с 09-00 до 18-00, обед с 13-00 до 14-00; суббота, воскресенье: выходной',
//   phone: '8 (391) 255-55-55',
//   website: 'https://www.holmservice.ru',
//   email: 'info@holmservice.ru',
//   legalAddress: '660098, г. Красноярск, ул. Алексеева, 49, пом. 190',
//   legalPhone: '8 (391) 255-55-56'
// };

// const generateReports = (houseId: number): ReportFile[] => [
//   {
//     id: houseId * 1000 + 1,
//     year: 2024,
//     name: 'Отчет о выполненных работах за 2024 год',
//     url: '/files/report-2024.pdf'
//   },
//   {
//     id: houseId * 1000 + 2,
//     year: 2023,
//     name: 'Отчет о выполненных работах за 2023 год',
//     url: '/files/report-2023.pdf'
//   }
// ];

// const generateWorkPlans = (houseId: number): WorkPlan[] => [
//   {
//     id: houseId * 2000 + 1,
//     year: 2024,
//     name: 'План работ на 2024 год',
//     url: '/files/work-plan-2024.pdf'
//   },
//   {
//     id: houseId * 2000 + 2,
//     year: 2023,
//     name: 'План работ на 2023 год',
//     url: '/files/work-plan-2023.pdf'
//   }
// ];

export class MyHomeStore {
  streets: Street[] = [];
  houses: House[] = [];
  selectedStreetId: number | null = null;
  selectedHouseId: number | null = null;
  houseInfo: {
    params: HouseParams | null;
    tariffs: HouseTariffs[];
    contacts: HouseContacts[];
    dolg: string | null;
  } = {
    params: null,
    tariffs: [],
    contacts: [],
    dolg: null
  };
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
      const response = await api.get<{streets: Street[]}>('houses/get-streets-by-uk/');

      runInAction(() => {
        this.streets = response.data.streets;
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
        const response = await api.get<{houses: House[]}>('houses/get-houses-by-uk/?street_id=' + streetId);

      runInAction(() => {
        this.houses = response.data.houses;
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
      // Генерируем period_id из текущей даты
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() возвращает 0-11
      const periodId = `${year}${month}`;

      // Выполняем все запросы параллельно и ждем их завершения
      const results = await Promise.allSettled([
        api.get<{params: HouseParams[]}>('houses/get-house-params/?house_id=' + this.selectedHouseId),
        api.get<{tariffs: HouseTariffs[]}>('houses/get-house-tariff/?house_id=' + this.selectedHouseId),
        api.get<{contacts: HouseContacts[]}>('houses/get-house-contacts/?house_id=' + this.selectedHouseId),
        api.get<{dolg: string}>('houses/get-house-dolg-sum/?house_id=' + this.selectedHouseId + '&period_id=' + periodId)
      ]);

      runInAction(() => {
        // Обрабатываем результат для params
        if (results[0].status === 'fulfilled') {
          this.houseInfo.params = results[0].value.data.params[0];
        } else {
          console.error('Ошибка загрузки параметров дома:', results[0].reason);
          this.houseInfo.params = null;
        }

        // Обрабатываем результат для tariffs
        if (results[1].status === 'fulfilled') {
          this.houseInfo.tariffs = results[1].value.data.tariffs;
        } else {
          console.error('Ошибка загрузки тарифов:', results[1].reason);
          this.houseInfo.tariffs = [];
        }

        // Обрабатываем результат для contacts
        if (results[2].status === 'fulfilled') {
          this.houseInfo.contacts = results[2].value.data.contacts;
        } else {
          console.error('Ошибка загрузки контактов:', results[2].reason);
          this.houseInfo.contacts = [];
        }

        // Обрабатываем результат для долга
        if (results[3].status === 'fulfilled') {
          this.houseInfo.dolg = results[3].value.data.dolg;
        } else {
          console.error('Ошибка загрузки долга:', results[3].reason);
          this.houseInfo.dolg = null;
        }
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}

export const myHomeStore = new MyHomeStore(); 