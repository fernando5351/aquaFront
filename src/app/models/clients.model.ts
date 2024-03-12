import { Payment } from "./payment.model";
import { Address } from "./address.model";

export interface Client {
  id: number,
  name: string,
  email: string,
  password?: string,
  dui: string,
  cellphone: string,
  amountId: number[];
  otherCellphone?: number,
  createdAt: Date;
  Adress?: Address[];
  Payment?: Payment[];
}

export interface createClient extends Omit<Client,'id' | 'createdAt'>{};

export interface GetClient {
  statusCode: number,
  message: string,
  data: Client
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
