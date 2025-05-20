export interface Street {
  id: number;
  houses: House[];
  name: string;
}

export interface House {
  id: number;
  number: string;
  street: number;
}

    