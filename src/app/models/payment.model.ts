// export interface Payment {
//   id: number;
//   invoiceCod: string;
//   clientId: number;
//   addressId: number;
//   month: string;
//   year: number;
//   amountPayable: number;
//   latePaymentAmount: number;
//   totalAmount: number;
//   status: string;
//   monthlyFeesId: number;
//   createdAt: string;
//   canceledIn: string | null;
//   paymentMonthlyFee: PaymentMonthlyFee;
//   client: Client;
// }

//   interface PaymentMonthlyFee {
//     id: number;
//     from: string;
//     untill: string;
//     status: string;
//     createdAt: string;
//   }

//   interface Client {
//     id: number;
//     name: string;
//     email: string;
//     password: string | null;
//     dui: string;
//     cellphone: number;
//     otherCellphone: number | null;
//     amountId: number;
//     createdAt: string;
//   }

export interface Payment {
  id: number;
  invoiceCod: string;
  clientId: number;
  addressId: number;
  month: string;
  year: number;
  amountPayable: number;
  latePaymentAmount: number;
  totalAmount: number;
  status: string;
  monthlyFeesId: number;
  createdAt: string;
  canceledIn: string | null;
  paymentMonthlyFee: PaymentMonthlyFee;
  Client: Client;
  Adress: Address
}

 export interface PaymentMonthlyFee {
  id: number;
  from: string;
  untill: string;
  status: string;
  createdAt: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  password: string | null;
  dui: string;
  cellphone: number;
  otherCellphone: number | null;
  amountId: number;
  createdAt: string;
}

export interface Address {
  id: number;
  idClient: number;
  streetName: string;
  houseNumber: string;
  polygonNumber: string;
  createdAt: string;
}

