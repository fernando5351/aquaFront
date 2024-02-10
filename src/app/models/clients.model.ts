export interface Client {
  id: number,
  name: string,
  email: string,
  password: string,
  dui: string,
  cellphone: string,
  otherCellphone: string,
  createdAt: string
}

export interface Address {
  id: number,
  idClient: number,
  streetName: string,
  houseNumber: string,
  polygonNumber: string,
  createdAt: string
}

export interface Payment {
  id: number,
  clientId: number,
  addressId: number,
  month: string,
  year: number,
  amountPayable: number,
  status: string,
  monthlyFeesId: number,
  createdAt: string,
  canceledIn: string
}

export interface FullClient {
  id: number,
  name: string,
  email: string,
  password: string,
  dui: string,
  cellphone: string,
  otherCellphone: string,
  createdAt: string,
  Adress: Address[],
  Payment: Payment[]
}


export interface createClient extends Omit<Client,'id'>{};

export interface GetClient {
  statusCode: number,
  message: string,
  data: FullClient
}

export interface UpdateClient {
  name: string,
  dui: string,
  cellphone: string,
  otherCellphone: string,
}


export interface GetClients extends Omit<GetClient, 'data'>{
  data: Array<Client>
}
