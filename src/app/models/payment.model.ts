  export interface Payment {
    id: number,
    clientId: number,
    addressId: number,
    month: string,
    latePaymentAmount: number,
    year: number,
    amountPayable: number,
    status: string,
    monthlyFeesId: number,
    createdAt: string,
    totalAmount: 0,
    canceledIn: string
  }
