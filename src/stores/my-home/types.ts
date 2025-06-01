export interface Street {
  CITY_ID: number;
  CITY_NAME: string;
  FIAS_GUID: string;
  STREET_CODE: string;
  STREET_ID: number;
  STREET_NAME: string;
  STREET_TYPE_ID: number;
  STREET_TYPE_NAME: string;
  STREET_TYPE_SHORT: string;
  USZN_NAME: string;
}

export interface House {
  OLD_HOUSE_CODE: string | null;
  AREA_ID: number;
  HOUSE_ID: number;
  ZIP: string;
  CITY_ID: number;
  AREA_NAME: string;
  SUBAREA_ID: number | null;
  MAIN_ID: number;
  HLETTER: string | null;
  NOTE: string;
  FIAS_GUID: string;
  HBUILD: string | null;
  HNUMBER: string;
  SUBAREA_NAME: string | null;
  STREET_ID: number;
  CITY_NAME: string;
  HOUSE_CODE: string | null;
  STREET_NAME: string;
  MAIN_NAME: string;
}

export interface HouseParams {
  OLD_HOUSE_CODE: string | null,
  AREA_ID: number;
  HOUSE_ID: number;
  ZIP: string;
  CITY_ID: number;
  AREA_NAME: string;
  SUBAREA_ID: number | null;
  MAIN_ID: number;
  HLETTER: string | null;
  NOTE: string;
  HBUILD: string | null;
  HNUMBER: string;
  SUBAREA_NAME: string | null;
  STREET_ID: number;
  CITY_NAME: string;
  HOUSE_CODE: string | null;
  STREET_NAME: string;
  MAIN_NAME: string;
}

export interface HouseTariffs {
  TARIF_PRICE: number;
  MEASURE_UNIT: string;
  TARIF_UNIT: string;
  M3_HEAT_NORM: number | null;
  SERVICE_NAME: string;
  SERVICE_ID: number;
  NORM: number;
}

export interface HouseContacts {
  UK_NAME: string;
  UK_CONTACTS: string;
  EX_INFO: string | null;
  UK_ADDRESS: string;
}

    