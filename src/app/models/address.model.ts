export interface Address {
  id: number;
  idClient: number;
  streetName: string;
  houseNumber: string;
  polygonNumber: string;
  createdAt: string;
}

export interface CreateAddress extends Omit<Address, 'id' | 'createdAt'> {}

export interface GetAddress {
  statusCode: number;
  message: string;
  data: Address;
}

export interface UpdateAddress {
  streetName?: string;
  houseNumber?: string;
  polygonNumber?: string;
}

export interface GetAddresses extends Omit<GetAddress, 'data'> {
  data: Address[];
}
