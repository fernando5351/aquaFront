export interface Month {
  id: number;
  from: Date;
  untill: Date;
  status: string;
  createdAt: Date;
  paymentMonthlyFee: PaymentMonthlyFee[];
}

export interface PaymentMonthlyFee {
  id: number;
  invoiceCod: any;
  clientId: number;
  addressId: number;
  month: string;
  year: number;
  amountPayable: number;
  latePaymentAmount: number;
  totalAmount: number;
  status: string;
  monthlyFeesId: number;
  createdAt: Date;
  canceledIn: any;
  Clients: Client;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  password: any;
  dui: string;
  cellphone: number;
  otherCellphone: any;
  amountId: number;
  createdAt: Date;
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
