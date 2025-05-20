export interface PhoneItem {
    id: number;
    info: string;
    phones: {
        id: number;
        value: string;
        phone: number
    }[];
    is_common: boolean;
}

export interface EmailItem {
    id: number;
    info: string;
    emails: {
        id: number;
        value: string;
        email: number
    }[];
}

export interface AddressItem {
    id: number;
    info: string;
    address: {
        id: number;
        value: string;
        address: number;
    }[];
}

export interface Contacts {
    phones: PhoneItem[];
    emails: EmailItem[];
    addresses: AddressItem[];
}