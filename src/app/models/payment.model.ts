import { Address } from "./address.model";
import { Client } from "./clients.model";

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
  Client?: Client;
  Adress?: Address
}

export interface PaymentMonthlyFee {
  id: number;
  from: string;
  untill: string;
  status: string;
  createdAt: string;
}

export interface Pay {
  status: 'paid'| 'mora' | 'pending';
  totalAmount: number;
}

