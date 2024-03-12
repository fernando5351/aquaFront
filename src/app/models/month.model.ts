export interface Month {
  id: number;
  from: Date;
  untill: Date;
  status: string;
  createdAt: Date;
  paymentMonthlyFee: PaymentMonthlyFee[];
}


interface PaymentMonthlyFee {
  id: number;
  invoiceCod: number | null;
  clientId: number;
  adressId: number;
  month: string;
  year: number;
  latePaymentAmount: number;
  totalAmount: number;
  status: string;
  monthlyFeesId: number;
  createdAt: string;
  candledIn: string | null;
  Clients: Client;
}

interface Client {
  id: number;
  name: string;
  email: string;
  password: string | null;
  dui: string;
  cellphone: string;
  otherCellphone: string | null;
  createdAt: string;
  ClientAmounts: ClientAmount[];
}

interface ClientAmount {
  id: number;
  name: string;
  amount: number;
  createdAt: string;
  Amounts: Amount;
}

interface Amount {
  id: number;
  clientId: number;
  amountId: number;
  createdAt: string;
}

export interface CreateMonth {
  from: Date;
  untill: Date;
  status: string;
}

export interface GetMonth {
  statusCode: number;
  message: string;
  data: Month;
}

export interface DeleteMonth {
  statusCode: number;
  message: string;
  data: number;
}

export interface UpdateMonth {
  from?: Date;
  untill?: Date;
  status?: string;
}

export interface GetMonths {
  data: Month[];
}
